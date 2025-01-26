import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../../components/DashboardTitle";
import useTheUser from "../../../../hooks/useTheUser";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageSlot = () => {
  const [user,refetch] = useTheUser();
  const slots = user?.slots ? user.slots.map(slot => ({
    slotName: slot.slotName,
    slotTime: slot.slotTime,
    slotDay: slot.slotDay,
    selectedClasses: slot?.selectedClasses,
    _id: slot._id
  })) : [];
  
const axiosSecure = useAxiosSecure()
console.log(slots);

const handleRemoveSlot = async (slotNameToRemove) => {
  try {
    console.log(slotNameToRemove);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      const response = await axiosSecure.patch(`/user/slot/remove/${user._id}`, { slotNameToRemove });
      console.log(response);

      if (response.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Removed!",
          text: "Successfully removed the slot.",
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to remove the slot.",
          icon: "error"
        });
      }
    }
  } catch (error) {
    console.error("Error removing slot:", error);
    Swal.fire({
      title: "Error!",
      text: "Something went wrong. Please try again later.",
      icon: "error"
    });
  }
};


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
                CLASS
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
                 
                {slot?.selectedClasses?.label || "No Classes"}

                 
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
