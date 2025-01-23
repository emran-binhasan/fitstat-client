import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../../components/DashboardTitle";
import useTheUser from "../../../../hooks/useTheUser";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageSlot = () => {
  const [user,refetch] = useTheUser();
  const slots = user?.slots ? user.slots.map(slot => ({
    slotName: slot.slotName,
    slotTime: slot.slotTime,
    slotDay: slot.slotDay,
    selectedClasses: slot.selectedClasses,
    _id: slot._id
  })) : [];
  
const axiosSecure = useAxiosSecure()
console.log(slots);

const handleRemoveSlot =async (slotNameToRemove) => {
  console.log(slotNameToRemove)
  const res = await axiosSecure.patch(`/user/slot/remove/${user._id}`,{slotNameToRemove});
  console.log(res)
  if(res.data.modifiedCount){
    refetch()
  }
}

  return (
    <div className="flex flex-col justify-center items-center border">
      <Helmet>
        <title>FitStat | Slots</title>
      </Helmet>
      
      <DashboardTitle title='Manage Slots'/>
      <div className="w-4/5 mx-auto p-5">
      
      <div className="flex items-center justify-around p-4">
      <h3>ADDED SLOTS : {slots?.length} </h3>
      </div>
        <table className="w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 w-full">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left  font-semibold text-gray-700 ">
                DAY
              </th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">
                NAME
              </th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700 ">
                DURATION
              </th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">
                CLASSES
              </th>
              <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr
                key={slot._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-2 px-2 md:px-4 text-sm text-gray-700 hidden sm:table-cell">
                  {slot.slotDay}
                </td>

                <td className="py-2 px-2 md:px-4  text-gray-700">
                {slot.slotName}
                </td>
                <td className="py-2 px-2 md:px-4  text-gray-700">
                {slot.slotTime}
                </td>
                <td className="py-2 px-2 md:px-4  text-gray-700">
                 
                {slot.selectedClasses?.map(cls => cls.label).join(', ') || "No Classes"}
                 
                </td>
                <td className="py-2 px-2 space-y-1 space-x-2 ">
                  <button
                    onClick={() => handleRemoveSlot(slot.slotName)}
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

export default ManageSlot;
