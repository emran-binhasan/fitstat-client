import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import DashboardTitle from "../../../../components/DashboardTitle";

const AppliedTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/applications");
      return res.data;
    },
  });

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 sm:px-8">
      <Helmet>
        <title>FitStat | Applications</title>
      </Helmet>
      <DashboardTitle title="Applications" />
      <div className="w-full sm:w-4/5 md:w-3/4 mx-auto bg-white  border rounded-lg shadow-lg">
      <div className="flex items-center justify-around p-4">
          <h3>TOTAL APPLICATIONS: {applications.length}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 hidden sm:table-cell">#</th>
                <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">NAME</th>
                <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">EMAIL</th>
                <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">INFO</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr
                  key={application._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 px-4 text-sm text-gray-700 hidden sm:table-cell">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">{application.name}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{application.email}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    <Link
                      to={`/dashboard/application/${application._id}`}
                      className="bg-orange-400 px-3 py-1 rounded-md text-white hover:bg-orange-500"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppliedTrainers;
