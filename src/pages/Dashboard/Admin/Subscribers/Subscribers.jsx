import { useQuery } from "@tanstack/react-query";
import DashboardTitle from "../../../../components/DashboardTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Subscribers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: subscribers = [], refetch } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newsletters");
      return res.data;
    },
  });

  const handleRemoveSubscriber = async(email) =>{
    const res = await axiosSecure.delete(`/newsletters?email=${email}`);
    if(res.data.deletedCount){
      refetch()
       Swal.fire({
                  title: "Deleted!",
                  text: "Subscriber removed succesfully",
                  icon: "success",
                });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center border p-4">
      <Helmet>
        <title>FitStat | Subscribers</title>
      </Helmet>
      
      <DashboardTitle title="Subscribers" />

      <div className="w-full max-w-4xl mx-auto border p-4 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-around p-4">
          <h3>TOTAL SUBSCRIBERS : {subscribers.length} </h3>
        </div>

        {subscribers.length === 0 ? (
          <p className="text-gray-500 text-center">No subscribers yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 shadow rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700 hidden sm:table-cell">#</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, index) => (
                  <tr key={subscriber._id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm text-gray-700 hidden sm:table-cell">{index + 1}</td>
                    <td className="py-2 px-4 text-gray-700">{subscriber.name}</td>
                    <td className="py-2 px-4 text-gray-700">{subscriber.email}</td>
                    <td className="py-2 px-4">
                      <button
                      onClick={()=>handleRemoveSubscriber(subscriber.email)}
                        className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-600 transition"
                        aria-label="Remove Subscriber"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscribers;
