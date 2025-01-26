import { NavLink } from "react-router-dom";
import { FaMoneyCheck } from "react-icons/fa";
import { MdOutlineUnsubscribe, MdAddChart } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { BiMessageAltDetail } from "react-icons/bi";

const AdminSidebar = () => {
  return (
    <>
      <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/dashboard/balance">
        <FaMoneyCheck /> Balance
      </NavLink>
      <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/dashboard/subscribers">
        <MdOutlineUnsubscribe /> Subscribers
      </NavLink>
      <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/dashboard/all-trainers">
        <IoPeople /> All Trainers
      </NavLink>
      <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/dashboard/applications">
        <BiMessageAltDetail /> Applied Trainers
      </NavLink>
      <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/dashboard/add-class">
        <MdAddChart /> Add Class
      </NavLink>
      <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/dashboard/add-forum">
        <IoPeople /> Add Forum
      </NavLink>
    </>
  );
};

export default AdminSidebar;
