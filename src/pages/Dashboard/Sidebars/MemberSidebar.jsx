import { NavLink } from "react-router-dom";
import { FaUser, FaHistory } from "react-icons/fa";
import { MdSaveAs } from "react-icons/md";

const MemberSidebar = () => {
  return (
    <>
      <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/dashboard/user-profile">
        <FaUser /> Profile
      </NavLink>
      <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/dashboard/activity">
        <FaHistory /> Activity Log
      </NavLink>
      <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/dashboard/booked">
        <MdSaveAs /> Booked Trainers
      </NavLink>
    </>
  );
};

export default MemberSidebar;
