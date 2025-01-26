import { Helmet } from "react-helmet-async";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePlayLesson } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { HiUserGroup } from "react-icons/hi";
import { NavLink, Outlet } from "react-router-dom";

import AdminSidebar from "../pages/Dashboard/Sidebars/AdminSidebar";
import TrainerSidebar from "../pages/Dashboard/Sidebars/TrainerSidebar";
import MemberSidebar from "../pages/Dashboard/Sidebars/MemberSidebar";
import { useQuery } from '@tanstack/react-query';
import useTheUser from "../hooks/useTheUser";
import { useEffect, useState } from "react";



const Dashboard = () => {
 const [user] = useTheUser();



  return (
    <div className="h-screen flex justify-between">
      <Helmet>
        <title>FitStat | Dashboard</title>
      </Helmet>
      <div className="w-1/6 border py-4 space-y-4 fixed">
        <h3 className="text-2xl text-center font-medium">FitStat</h3>
        <ul className="flex flex-col dashboard-ul px-4 space-y-4">
          {user.role === "admin" && <AdminSidebar />}
          {user.role === "trainer" && <TrainerSidebar />}
          {user.role === "member" && <MemberSidebar />}

          {/* Divider */}
          <div className="border-b-2 w-[254px] mt-2 mb-3 -ml-4"></div>

          {/* Common Routes */}
          <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/">
            <IoHomeOutline className="text-xl" /> Home
          </NavLink>
          <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/classes">
            <MdOutlinePlayLesson className="text-xl" /> Classes
          </NavLink>
          <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/trainers">
            <GrUserManager className="text-xl" /> Trainers
          </NavLink>
          <NavLink className="px-2 py-1.5 flex gap-2 items-center" to="/community">
            <HiUserGroup className="text-xl" /> Community
          </NavLink>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 border w-5/6 ml-[17%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
