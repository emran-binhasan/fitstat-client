import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useTheUser from "../../../../hooks/useTheUser";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { FaEye } from "react-icons/fa";

const Slot = ({ slot }) => {
  const axiosSecure = useAxiosSecure();
  const [user, refetch] = useTheUser();
  const { user: authUser } = useAuth();

  // Fetch slots for the user
  const slots = user?.slots
    ? user.slots.map((slot) => ({
        slotName: slot.slotName,
        slotTime: slot.slotTime,
        slotDay: slot.slotDay,
        selectedClasses: slot?.selectedClasses,
        _id: slot._id,
      }))
    : [];

  // Fetch booked slot data based on classId
 
    // Handle opening the modal when the eye icon is clicked
    const handleShowModal = async() => {
          const res = await axiosSecure.get('/booked-slot', { params: { classId: slot?.selectedClasses?.value } });
          const booked = res.data;
        
      if (booked) {
        Swal.fire({
          title: "Slot Booked!",
          text: `This slot is booked by ${booked[0].userName}.`,
          icon: "info",
          confirmButtonText: "Okay",
        });
      }
    };
  
  // Remove a selected slot
  const handleRemoveSlot = async (slotNameToRemove) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axiosSecure.patch(`/user/slot/remove/${user._id}`, { slotNameToRemove });

        if (response.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Removed!",
            text: "Successfully removed the slot.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to remove the slot.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    }
  };



  // Render the component
  return (
    <tr key={slot._id} className="border-t border-gray-200 hover:bg-gray-50">
      <td className="py-2 px-2 md:px-4 text-sm text-gray-700 hidden sm:table-cell">{slot.slotDay}</td>
      <td className="py-2 px-2 md:px-4 text-gray-700">{slot.slotName}</td>
      <td className="py-2 px-2 md:px-4 text-gray-700">{slot.slotTime}</td>
      <td className="py-2 px-2 md:px-4 text-gray-700">{slot?.selectedClasses?.label || "No Classes"}</td>
      <td className="py-2 flex gap-1 items-center px-2 space-y-1 space-x-2">
       
          <FaEye onClick={handleShowModal} className="cursor-pointer text-blue-500" />
 
        <button onClick={() => handleRemoveSlot(slot.slotName)} className="bg-red-500 px-3 py-1 rounded-md text-white">
          Remove
        </button>
      </td>
    </tr>
  );
};

export default Slot;
