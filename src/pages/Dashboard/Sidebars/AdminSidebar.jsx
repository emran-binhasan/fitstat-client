import { NavLink } from "react-router-dom";
import { FaMoneyCheck } from "react-icons/fa";
import { MdOutlineUnsubscribe, MdAddChart } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { BiMessageAltDetail } from "react-icons/bi";

const AdminSidebar = () => {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          `px-3 py-2 flex gap-3 items-center ${
            isActive ? "bg-gray-200 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          } rounded-lg`
        }
        to="/dashboard/balance"
      >
        <FaMoneyCheck /> Balance
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-3 py-2 flex gap-3 items-center ${
            isActive ? "bg-gray-200 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          } rounded-lg`
        }
        to="/dashboard/subscribers"
      >
        <MdOutlineUnsubscribe /> Subscribers
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-3 py-2 flex gap-3 items-center ${
            isActive ? "bg-gray-200 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          } rounded-lg`
        }
        to="/dashboard/all-trainers"
      >
        <IoPeople /> All Trainers
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-3 py-2 flex gap-3 items-center ${
            isActive ? "bg-gray-200 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          } rounded-lg`
        }
        to="/dashboard/applications"
      >
        <BiMessageAltDetail /> Applied Trainers
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-3 py-2 flex gap-3 items-center ${
            isActive ? "bg-gray-200 text-orange-600" : "text-gray-700 hover:bg-gray-100"
          } rounded-lg`
        }
        to="/dashboard/add-class"
      >
        <MdAddChart /> Add Class
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

export default AdminSidebar;
