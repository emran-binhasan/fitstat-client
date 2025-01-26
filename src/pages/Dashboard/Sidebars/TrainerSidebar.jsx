import { NavLink } from "react-router-dom";
import { FaMoneyCheck } from "react-icons/fa";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { IoPeople } from "react-icons/io5";

const TrainerSidebar = () => {
  return (
    <>
      <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/dashboard/slots">
        <FaMoneyCheck /> Manage Slots
      </NavLink>
      <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/dashboard/add-slot">
        <MdOutlineUnsubscribe /> Add Slots
      </NavLink>
      <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/dashboard/add-forum">
        <IoPeople /> Add Forum
      </NavLink>
    </>
  );
};

export default TrainerSidebar;
