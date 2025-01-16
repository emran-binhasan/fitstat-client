import { BiMessageAltDetail } from "react-icons/bi";
import { FaMoneyCheck } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { HiUserGroup } from "react-icons/hi";
import { IoHomeOutline, IoPeople } from "react-icons/io5";
import { MdAddChart, MdOutlinePlayLesson, MdOutlineUnsubscribe } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const isAdmin = 'true';
  const isTrainer = 'false';
  return (
    <div className="h-screen  flex justify-between ">
      <div className="w-1/6 border  space-y-4">
      <h3 className="text-2xl  text-center ">fitStat</h3>
      <ul className="flex flex-col  px-4 text-lg space-y-4">
        {isAdmin && 
        <>
        <NavLink className=' px-2 py-1.5 flex gap-2 items-center' to="/dashboard/balance"><FaMoneyCheck /> Balance</NavLink>
        <NavLink className=' px-2 py-1.5 flex gap-2 items-center' to="/dashboard/subscribers"><MdOutlineUnsubscribe /> Subscribers</NavLink>
        <NavLink className=' px-2 py-1.5 flex gap-2 items-center' to="/dashboard/all-trainers"><IoPeople /> All Trainers</NavLink>
        <NavLink className=' px-2 py-1.5 flex gap-2 items-center' to="/dashboard/applied-trainers"><BiMessageAltDetail /> Applied Trainers</NavLink>
        <NavLink className=' px-2 py-1.5 flex gap-2 items-center' to="/new-class"><MdAddChart /> Add Class</NavLink>
        </>}
        {isTrainer && 
        <>

        </>}
        <NavLink className='px-2 py-1.5 flex gap-2 items-center' to="/"><IoHomeOutline className="text-xl"/> Home</NavLink>
        <NavLink className='px-2 py-1.5 flex gap-2 items-center' to="/classes"><MdOutlinePlayLesson className="text-xl"/>Classes</NavLink>
        <NavLink className='px-2 py-1.5 flex gap-2 items-center ' to="/trainers"><GrUserManager className="text-xl"/>Trainers</NavLink>
        <NavLink className='px-2 py-1.5 flex gap-2 items-center' to="/community"><HiUserGroup className="text-xl"/>Community</NavLink>
      </ul>
     
      </div>
      <div className="flex-1 border">
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
