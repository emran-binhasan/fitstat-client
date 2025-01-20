import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const getLinkClass = (isActive) =>
  `${
    isActive ? "text-blue-600" : "text-gray-700"
  } hover:text-blue-600 transition-colors block py-2`;

const MenuItem = ({ children, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const Header = () => {
  const { user, logOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const middleLinks = (
    <>
      <MenuItem delay={0.1}>
        <NavLink
          to="/"
          className={({ isActive }) => getLinkClass(isActive)}
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>
      </MenuItem>
      <MenuItem delay={0.2}>
        <NavLink
          to="/classes"
          className={({ isActive }) => getLinkClass(isActive)}
          onClick={() => setIsOpen(false)}
        >
          Classes
        </NavLink>
      </MenuItem>
      <MenuItem delay={0.3}>
        <NavLink
          to="/trainers"
          className={({ isActive }) => getLinkClass(isActive)}
          onClick={() => setIsOpen(false)}
        >
          Trainers
        </NavLink>
      </MenuItem>
      <MenuItem delay={0.4}>
        <NavLink
          to="/community"
          className={({ isActive }) => getLinkClass(isActive)}
          onClick={() => setIsOpen(false)}
        >
          Community
        </NavLink>
      </MenuItem>
      {user && (
        <MenuItem delay={0.5}>
          <NavLink
            to="/dashboard/balance"
            className={({ isActive }) => getLinkClass(isActive)}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>
        </MenuItem>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/50 border-b border-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div>
            <h3 className="text-2xl font-medium text-gray-800">fitStat</h3>
          </div>

          <ul className="hidden md:flex gap-6 items-center">{middleLinks}</ul>

          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center"><img className="border w-10 h-10 rounded-full" src={user?.photoURL} alt="photo" />
               <button
                onClick={logOutUser}
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors"
              >
                LogOut
              </button></div>
             
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 hover:bg-gray-100 rounded transition-colors"
              >
                Login
              </NavLink>
            )}
          </div>

          <div className="md:hidden z-50">
            <motion.button
              onClick={toggleMenu}
              className="text-gray-800"
              initial={{ rotate: 0 }}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="block w-6 h-1 bg-gray-800 mb-1"></span>
              <span className="block w-6 h-1 bg-gray-800 mb-1"></span>
              <span className="block w-6 h-1 bg-gray-800"></span>
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        className="fixed top-0 left-0 z-40 w-full h-full bg-white flex flex-col justify-center items-center md:hidden"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-4">
          {middleLinks}
          <MenuItem delay={0.6}>
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      logOutUser();
                      setIsOpen(false);
                    }}
                    className="text-gray-700 hover:text-blue-600 transition-colors block py-2"
                  >
                    LogOut
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </div>
          </MenuItem>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
