import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../../components/DashboardTitle";
import useTheUser from "../../../../hooks/useTheUser";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import Slot from "./Slot";

const ManageSlot = () => {
  const [user,refetch] = useTheUser();
  const slots = user?.slots ? user.slots.map(slot => ({
    slotName: slot.slotName,
    slotTime: slot.slotTime,
    slotDay: slot.slotDay,
    selectedClasses: slot?.selectedClasses,
    _id: slot._id
  })) : [];


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
             <Slot key={slot._id} slot={slot}/>
            ))}
          </tbody>
        </table>
      </div>
      </div>

  );
};

export default ManageSlot;
