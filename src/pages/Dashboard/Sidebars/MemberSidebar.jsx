import { NavLink } from "react-router-dom";
import { FaUser, FaHistory } from "react-icons/fa";
import { MdSaveAs } from "react-icons/md";

const MemberSidebar = () => {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          `px-3 py-2 flex gap-3 items-center ${
            isActive ? "bg-gray-200 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          } rounded-lg`
        }
        to="/dashboard/user-profile"
      >
        <FaUser /> Profile
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-3 py-2 flex gap-3 items-center ${
            isActive ? "bg-gray-200 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          } rounded-lg`
        }
        to="/dashboard/activity"
      >
        <FaHistory /> Activity Log
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-3 py-2 flex gap-3 items-center ${
            isActive ? "bg-gray-200 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          } rounded-lg`
        }
        to="/dashboard/booked"
      >
        <MdSaveAs /> Booked Trainers
      </NavLink>
    </>
  );
};

export default MemberSidebar;
