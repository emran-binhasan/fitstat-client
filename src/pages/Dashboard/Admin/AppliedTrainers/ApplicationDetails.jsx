import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const ApplicationDetails = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedback, setFeedback] = useState("");
  const param = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  console.log(param.id);
  const {data:appDetail,refetch} = useQuery({
    queryKey:['details'],
    queryFn:async() => {
      const res =await  axiosSecure.get(`/users/application/${param.id}`);
      return res.data
    }
  })


  console.log(appDetail);
  const {
    _id,
    name,
    email,
    photoURL,
    role,
    age,
    availableDays,
    hoursPerDay,
    biodata,
    experience,
    skills,
    socialLinks,
    status,
  } = appDetail || {};

  const [error, setError] = useState("");

  const handleAcceptApplication = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Member will be promoted to a trainer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/application/accept/${id}`, {
            status: "approved",
            role: "trainer",
          })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Success",
                text: "Promoted",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleRejectApplication = (application) => {
    setSelectedApplication(application);
    setModalIsOpen(true);
    setError(""); // Clear previous errors
    setFeedback(""); // Reset feedback
    navigate("/dashboard/all-trainers")
  };

  const submitRejection = () => {
    if (!feedback.trim()) {
      setError("Feedback is required!");
      return;
    }

    axiosSecure
      .patch(`/application/reject/${selectedApplication._id}`, {
        status: "rejected",
        feedback,
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Rejected!",
            text: "Application has been rejected.",
            icon: "success",
          });
        }
        setModalIsOpen(false);
        setFeedback("");

      });
  };













  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Helmet>
        <title>FitStat | Application Details</title>
      </Helmet>
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
        <p>
          <span className="font-semibold">Age:</span> {age}
        </p>
        <p>
          <span className="font-semibold">Available Days:</span> {availableDays?.join(", ")}
        </p>
        <p>
          <span className="font-semibold">Available Time:</span> {hoursPerDay} Hours
        </p>
        <p>
          <span className="font-semibold">Experience:</span> {experience} years
        </p>
        <p>
          <span className="font-semibold">Skills:</span> {skills?.join(", ")}
        </p>
        <p>
          <span className="font-semibold">Biodata:</span> {biodata}
        </p>
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
      <div className="flex justify-between">
      <td className="py-2 px-2 space-y-1 space-x-2">
                  <button
                    onClick={() => handleAcceptApplication(_id)}
                    className="bg-green-500 px-3 py-1 rounded-md text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectApplication(appDetail)}
                    className="bg-red-500 px-3 py-1 rounded-md text-white"
                  >
                    Reject
                  </button>
                </td>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-red-500">
                Reject Application
              </h2>
              <p className="text-gray-600 mt-2">
                Are you sure you want to reject this application? This action
                cannot be undone.
              </p>
            </div>
            {selectedApplication && (
              <div className="mt-4">
                <p>
                  <strong>Name:</strong> {selectedApplication.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedApplication.email}
                </p>
              </div>
            )}
            <textarea
              className={`w-full border p-2 mt-4 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Provide rejection feedback..."
              value={feedback}
              onChange={(e) => {
                setFeedback(e.target.value);
                setError(""); // Clear the error on typing
              }}
            ></textarea>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setModalIsOpen(false)}
                className="bg-gray-400 px-4 py-2 rounded-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={submitRejection}
                className="bg-red-500 px-4 py-2 rounded-md text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetails;
