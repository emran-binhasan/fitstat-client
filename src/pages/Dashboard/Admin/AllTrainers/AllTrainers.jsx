import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import DashboardTitle from "../../../../components/DashboardTitle";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllTrainers = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data: trainers = [], refetch } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trainers");
      return res.data;
    },
  });

  const handleRemoveTrainer = (id) => {
    console.log(id);
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
          .patch(`/trainer/${id}`, { role: "member", status: "" })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Removed!",
                text: "Sucessfully removed the trainer",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center border">
      <Helmet>
        <title>FitStat | All Trainer</title>
      </Helmet>
      <DashboardTitle title="Trainers" />
      <div className="w-4/5 mx-auto border">
        <div className="flex items-center justify-around p-4">
          <h3>TOTAL TRAINERS : {trainers.length} </h3>
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
            {trainers.map((trainer) => (
              <tr
                key={trainer._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-2 px-2 md:px-4 text-sm text-gray-700 hidden sm:table-cell">
                  {trainer.name}
                </td>

                <td className="py-2 px-2 md:px-4  text-gray-700">
                  {trainer.email}
                </td>
                <td className="py-2 px-2 md:px-4  text-gray-700">
                  <Link
                    to={`/trainer/${trainer._id}`}
                    className="bg-orange-400 px-3 py-1 rounded-md text-white"
                  >
                    Details
                  </Link>
                </td>
                <td className="py-2 px-2 space-y-1 space-x-2 ">
                  <button
                    onClick={() => handleRemoveTrainer(trainer._id)}
                    className="bg-red-500 px-3 py-1 rounded-md text-white"
                  >
                    Remove
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

export default AllTrainers;
