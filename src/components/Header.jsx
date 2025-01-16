import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const {user} = useAuth();
  console.log(user)
  const middleLinks = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/classes">Classes</NavLink>
      <NavLink to="/trainers">Trainers</NavLink>
      <NavLink to="/community">Community</NavLink>
      {user?<NavLink to="/dashboard">Dashboard</NavLink>:''}
        

    </>
  );
  return (
    <header className="bg-gray-300/40 fixed z-50 w-full">
      <div className="flex p-4 mx-8 justify-between items-center ">
        <div>
          <h3 className="text-2xl medium text-gray-800">fitStat</h3>
        </div>
        <ul className="flex gap-4 items-center ">{middleLinks}
        </ul>
        <div>
        <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
