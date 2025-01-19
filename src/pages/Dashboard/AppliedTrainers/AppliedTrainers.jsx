import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import DashboardTitle from "../../../components/DashboardTitle";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const AppliedTrainers = () => {
  const axiosSecure = useAxiosSecure();
  // const [applications, setApplications] = useState([]);
  // useEffect(() => {
  //   axiosSecure
  //     .get("/users/applications")
  //     .then((res) => setApplications(res.data));
  // }, []);

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/applications");
      return res.data;
    },
  });

  const handleAcceptApplication = (id) => {
    console.log("accepted", id);
    Swal.fire({
      title: "Are you sure?",
      text: "Member will be promoted to a trainer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/application/accept/${id}`, {
            status: "approved",
            role: "trainer",
          })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch()
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

  const handleRejectApplication = (id) => {
    console.log("rejected", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/application/reject/${id}`, { status: "rejected" })
          .then((res) => {
            console.log(res.data);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center border">
      <DashboardTitle title="Applications" />
      <div className="w-4/5 mx-auto border">
        <div className="flex items-center justify-around p-4">
          <h3>TOTAL APPPLICATIONS : {applications.length} </h3>
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
                  <Link
                    to={`/dashboard/application/${application._id}`}
                    className="bg-orange-400 px-3 py-1 rounded-md text-white"
                  >
                    Details
                  </Link>
                </td>
                <td className="py-2 px-2 space-y-1 space-x-2 ">
                  <button
                    onClick={() => handleAcceptApplication(application._id)}
                    className="bg-green-500 px-3 py-1 rounded-md text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectApplication(application._id)}
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
    </div>
  );
};

export default AppliedTrainers;
