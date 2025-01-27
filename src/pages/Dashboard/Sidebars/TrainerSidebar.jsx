import { NavLink } from "react-router-dom";
import { FaMoneyCheck } from "react-icons/fa";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { IoPeople } from "react-icons/io5";

const TrainerSidebar = () => {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          `px-3 py-2 flex gap-3 items-center ${
            isActive ? "bg-gray-200 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          } rounded-lg`
        }
        to="/dashboard/slots"
      >
        <FaMoneyCheck /> Manage Slots
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-3 py-2 flex gap-3 items-center ${
            isActive ? "bg-gray-200 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          } rounded-lg`
        }
        to="/dashboard/add-slot"
      >
        <MdOutlineUnsubscribe /> Add Slots
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-3 py-2 flex gap-3 items-center ${
            isActive ? "bg-gray-200 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          } rounded-lg`
        }
        to="/dashboard/add-forum"
      >
        <IoPeople /> Add Forum
      </NavLink>
    </>
  );
};

export default TrainerSidebar;
