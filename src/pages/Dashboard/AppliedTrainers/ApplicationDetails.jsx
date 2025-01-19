import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApplicationDetails = () => {
    const param = useParams();
    const axiosSecure = useAxiosSecure();
    console.log(param.id)
    const [appDetail, setAppDetail] = useState([]);
    useEffect(()=>{
        axiosSecure.get(`/users/application/${param.id}`)
        .then(res => setAppDetail(res.data))
    },[]);
    const {
        name,
        email,
        photoURL,
        role,
        age,
        availableDays,
        availableTimes,
        biodata,
        experience,
        skills,
        socialLinks,
        status,
      } = appDetail;
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-center space-x-4">
          <img
            src={photoURL}
            alt={name}
            className="w-24 h-24 rounded-full border border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-gray-600">{email}</p>
            <span
              className={`px-3 py-1 text-sm rounded-full text-white ${
                status === "pending" ? "bg-yellow-500" : "bg-green-500"
              }`}
            >
              {status}
            </span>
          </div>
        </div>
  
        <div className="mt-6 space-y-4">
          <p><strong>Role:</strong> {role}</p>
          <p><strong>Age:</strong> {age}</p>
          <p><strong>Available Days:</strong> {availableDays?.join(", ")}</p>
          <p><strong>Available Time:</strong> {availableTimes}</p>
          <p><strong>Experience:</strong> {experience} years</p>
          <p><strong>Skills:</strong> {skills?.join(", ")}</p>
          <p><strong>Biodata:</strong> {biodata}</p>
        </div>
  
        {socialLinks?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Social Links</h3>
            <ul className="list-disc ml-5">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
};

export default ApplicationDetails;