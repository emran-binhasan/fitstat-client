import { Helmet } from "react-helmet-async";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePlayLesson } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { HiUserGroup } from "react-icons/hi";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import AdminSidebar from "../pages/Dashboard/Sidebars/AdminSidebar";
import TrainerSidebar from "../pages/Dashboard/Sidebars/TrainerSidebar";
import MemberSidebar from "../pages/Dashboard/Sidebars/MemberSidebar";
import useTheUser from "../hooks/useTheUser";
import { useState } from "react";
import Loading from "../pages/Others/Loading";
const Dashboard = () => {
  const [user,,isLoading] = useTheUser();
  const [isOpen, setIsOpen] = useState(false); // Sidebar Toggle
  if(isLoading){
    return <Loading/>
  }
  const handleSidebarClose = () => {
    setIsOpen(false); // Close sidebar when link is clicked
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <Helmet>
        <title>FitStat | Dashboard</title>
      </Helmet>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r p-6 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-1/5 md:p-6`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-800 whitespace-nowrap">
            FitStat
          </h3>
          {/* Close Button (Only on Mobile) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-2xl text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col space-y-6 mt-6">
          {user.role === "admin" && <AdminSidebar />}
          {user.role === "trainer" && <TrainerSidebar />}
          {user.role === "member" && <MemberSidebar />}

          {/* Divider */}
          <div className="border-b-2 w-full"></div>

          {/* Common Routes */}
          <NavLink
            className="px-3 py-2 flex gap-3 items-center text-gray-700 hover:bg-gray-100 rounded-lg"
            to="/"
            onClick={handleSidebarClose} // Close sidebar on click
          >
            <IoHomeOutline className="text-xl" /> Home
          </NavLink>
          <NavLink
            className="px-3 py-2 flex gap-3 items-center text-gray-700 hover:bg-gray-100 rounded-lg"
            to="/classes"
            onClick={handleSidebarClose} // Close sidebar on click
          >
            <MdOutlinePlayLesson className="text-xl" /> Classes
          </NavLink>
          <NavLink
            className="px-3 py-2 flex gap-3 items-center text-gray-700 hover:bg-gray-100 rounded-lg"
            to="/trainers"
            onClick={handleSidebarClose} // Close sidebar on click
          >
            <GrUserManager className="text-xl" /> Trainers
          </NavLink>
          <NavLink
            className="px-3 py-2 flex gap-3 items-center text-gray-700 hover:bg-gray-100 rounded-lg"
            to="/community"
            onClick={handleSidebarClose} // Close sidebar on click
          >
            <HiUserGroup className="text-xl" /> Community
          </NavLink>
        </ul>
      </div>

      {/* Mobile Menu Button (Hidden when sidebar is open) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-3 bg-gray-800 text-white fixed top-4 left-4 z-50 rounded-lg shadow-lg"
        >
          <FaBars className="text-xl" />
        </button>
      )}

      {/* Main Content */}
      <div className="flex-1 w-full md:w-4/5 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
