import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useTheUser from "../../../../hooks/useTheUser";
import DashboardTitle from "../../../../components/DashboardTitle";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Activity = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [user] = useTheUser();
  console.log(user);
  const { name, email, status, feedback } = user || {};
  return (
    <div className="flex flex-col justify-center items-center border">
      <Helmet>
        <title>FitStat | Activity</title>
      </Helmet>
      <DashboardTitle title="My Activities" />
      {user.status ? (
        <>
          <div className="w-4/5 mx-auto border">
            <table className="w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-100 w-full">
                <tr>
                  <th className="py-3 px-2 md:px-4 text-left  font-semibold text-gray-700 ">
                    NAME
                  </th>
                  <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">
                    EMAIL
                  </th>

                  <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-2 px-2 md:px-4 text-sm text-gray-700 hidden sm:table-cell">
                    <span className="font-medium"></span> {name}
                  </td>

                  <td className="py-2 px-2 md:px-4  text-gray-700">{email}</td>

                  <td
                    className={`py-2 px-2 flex items-center gap-2 space-y-1 space-x-2 uppercase ${
                      status === "rejected" ? "text-red-500" : "text-yellow-500"
                    }`}
                  >
                    {status}{" "}
                    {status === "rejected" && (
                      <FaEye onClick={() => setModalIsOpen(true)} />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex justify-center h-[60vh] items-center">
          <p>You don't have any activities !</p>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-sm space-y-4">
            <p className="text-gray-800 text-lg">Feedback: {feedback}</p>
            <button
              onClick={() => setModalIsOpen(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-all duration-200 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
