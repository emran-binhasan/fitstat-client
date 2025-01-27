import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye } from "react-icons/fa";
import DashboardTitle from "../../../../components/DashboardTitle";
import useTheUser from "../../../../hooks/useTheUser";

const Activity = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [user] = useTheUser();
  const { name, email, status, feedback } = user || {};

  return (
    <div className="flex flex-col justify-center items-center border py-10 px-4 sm:px-8">
      <Helmet>
        <title>FitStat | Activity</title>
      </Helmet>
      <DashboardTitle title="My Activities" />

      {user.status ? (
        <div className="w-full sm:w-11/12 md:w-4/5 mx-auto border">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">NAME</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">EMAIL</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm text-gray-700">{name}</td>
                  <td className="py-2 px-4 text-gray-700">{email}</td>
                  <td className={`py-2 px-4 flex items-center gap-2 text-sm font-medium ${
                    status === "rejected" ? "text-red-500" : "text-yellow-500"
                  }`}>
                    {status}
                    {status === "rejected" && (
                      <FaEye onClick={() => setModalIsOpen(true)} className="cursor-pointer" />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <p>You don't have any activities!</p>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-96 space-y-4">
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
