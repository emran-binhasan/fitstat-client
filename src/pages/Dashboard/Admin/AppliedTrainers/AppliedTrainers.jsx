import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import DashboardTitle from "../../../../components/DashboardTitle";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const AppliedTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/applications");
      return res.data;
    },
  });

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
    <div className="flex flex-col justify-center items-center border">
      <DashboardTitle title="Applications" />
      <div className="w-4/5 mx-auto border">
        <div className="flex items-center justify-around p-4">
          <h3>TOTAL APPLICATIONS : {applications.length} </h3>
        </div>
        <table className="w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 w-full">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">NAME</th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">EMAIL</th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">INFO</th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-2 md:px-4 text-sm text-gray-700 hidden sm:table-cell">
                  {application.name}
                </td>
                <td className="py-2 px-2 md:px-4 text-gray-700">{application.email}</td>
                <td className="py-2 px-2 md:px-4 text-gray-700">
                  <Link
                    to={`/dashboard/application/${application._id}`}
                    className="bg-orange-400 px-3 py-1 rounded-md text-white"
                  >
                    Details
                  </Link>
                </td>
                <td className="py-2 px-2 space-y-1 space-x-2">
                  <button
                    onClick={() => handleAcceptApplication(application._id)}
                    className="bg-green-500 px-3 py-1 rounded-md text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectApplication(application)}
                    className="bg-red-500 px-3 py-1 rounded-md text-white"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AppliedTrainers;
