import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import DashboardTitle from "../../../components/DashboardTitle";
import { Link } from "react-router-dom";

const AppliedTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    axiosSecure
      .get("/users/applications")
      .then((res) => setApplications(res.data));
  }, []);
  return (
    <div className="flex flex-col justify-center items-center border">
        <DashboardTitle title='Applications'/>
      <div className="w-4/5 mx-auto border">
        <div className="flex items-center justify-around p-4">
          <h3>TOTAL USERS : {applications.length} </h3>
        </div>
        <table className="w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 w-full">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left  font-semibold text-gray-700 ">
                NAME
              </th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">
                EMAIL
              </th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700 ">
                INFO
              </th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr
                key={application._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-2 px-2 md:px-4 text-sm text-gray-700 hidden sm:table-cell">
                  {application.name}
                </td>

                <td className="py-2 px-2 md:px-4  text-gray-700">
                  {application.email}
                </td>
                <td className="py-2 px-2 md:px-4  text-gray-700">
                  <Link to={`/dashboard/application/${application._id}`}className="bg-orange-500 px-3 py-1 rounded-md text-white">Details</Link>
                </td>
                <td className="py-2 px-2 space-y-1 ">
                  <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 w-full sm:w-auto">
                    sd
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTrainers;
