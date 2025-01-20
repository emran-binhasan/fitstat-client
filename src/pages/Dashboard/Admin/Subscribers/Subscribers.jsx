
import { useQuery } from "@tanstack/react-query";
import DashboardTitle from "../../../../components/DashboardTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
const Subscribers = () => {
    const axiosSecure = useAxiosSecure();
    const {data:subscribers=[], refetch} = useQuery({
        queryKey:['subscribers'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/newsletters');
            return res.data
        }
    })
    return (
        <div className="flex flex-col justify-center items-center border">
      <DashboardTitle title="subscribers" />
      <div className="w-4/5 mx-auto border">
        <div className="flex items-center justify-around p-4">
          <h3>TOTAL SUBSCRIBERS : {subscribers.length} </h3>
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
             
              <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber,index) => (
              <tr
                key={subscriber._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-2 px-2 md:px-4 text-sm text-gray-700 hidden sm:table-cell">
                  <span className="font-medium">{index+1} .</span> {subscriber.name}
                </td>

                <td className="py-2 px-2 md:px-4  text-gray-700">
                  {subscriber.email}
                </td>
               
                <td className="py-2 px-2 space-y-1 space-x-2 ">
                  <button
                  
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

export default Subscribers;