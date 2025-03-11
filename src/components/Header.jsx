import { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import useAuth from "../hooks/useAuth";

import logo from "../assets/images/logo.png";
import logo2 from "../assets/images/logo-dark.png"
import usePublicUser from "../hooks/usePublicUser";

const Header = () => {
  const { user: authUser, logOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [user] = usePublicUser();
  const [redirectPath, setRedirectPath] = useState("/dashboard");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Refs for GSAP animations
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const hamburgerRef = useRef(null);

  // Function to generate link classes based on active state, scroll position, AND page
  const getLinkClass = (isActive) =>
    `${
      isActive ? "text-orange-600" : 
      (isScrolled ? "text-gray-700" : 
        (isHome ? "text-white" : "text-gray-700"))
    } hover:text-orange-600 transition-colors block py-2`;

  useEffect(() => {
    if (user?.role === "admin") setRedirectPath("/dashboard/balance");
    else if (user?.role === "trainer") setRedirectPath("/dashboard/slots");
    else if (user?.role === "member")
      setRedirectPath("/dashboard/user-profile");
  }, [user?.role]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animations
  useEffect(() => {
    if (isOpen) {
      // Animate menu opening
      gsap.to(menuRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      // Animate menu items with staggered delay
      gsap.to(menuItemsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.1,
        delay: 0.2,
      });

      // Animate hamburger rotation
      gsap.to(hamburgerRef.current, {
        rotation: 90,
        duration: 0.3,
      });
    } else {
      // Animate menu closing
      gsap.to(menuRef.current, {
        opacity: 0,
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });

      // Reset hamburger rotation
      gsap.to(hamburgerRef.current, {
        rotation: 0,
        duration: 0.3,
      });
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Reset menu item refs when items change
  const setMenuItemRef = (el, index) => {
    menuItemsRef.current[index] = el;
  };

  // Initialize menu items with opacity and scale for animation
  useEffect(() => {
    gsap.set(menuItemsRef.current, { opacity: 0, scale: 0.7 });
  }, []);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/classes", label: "Classes" },
    { path: "/trainers", label: "Trainers" },
    { path: "/community", label: "Community" },
    ...(authUser ? [{ path: redirectPath, label: "Dashboard" }] : []),
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-black ${
        isScrolled ? "bg-white/70 backdrop-blur-lg" : isHome ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div>
            <h3
              className={`text-2xl flex items-center gap-1 font-medium ${
                isScrolled ? "text-gray-800" : isHome ? "text-white" : "text-gray-800"
              }`}
            >
              <img src={isScrolled?logo2:isHome?logo:logo2} className="w-10" alt="logo" />
              fitStat
            </h3>
          </div>

          {/* Desktop navigation */}
          <ul className="hidden md:flex gap-6 lg:text-lg items-center">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => getLinkClass(isActive)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop login/logout */}
          <div className="hidden md:block">
            {authUser && authUser?.email ? (
              <div className="flex items-center">
                <img
                  className="border w-10 h-10 mx-2 rounded-full"
                  src={authUser?.photoURL}
                  alt="photo"
                />
                <button
                  onClick={logOutUser}
                  className={`px-4 py-2 hover:bg-gray-100 rounded transition-colors ${
                    isScrolled ? "text-gray-800" : isHome ? "text-white" : "text-gray-800"
                  }`}
                >
                  LogOut
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={`px-4 py-2 lg:text-lg hover:bg-orange-500 rounded transition-colors ${
                  isScrolled ? "text-gray-800" : isHome ? "text-white" : "text-gray-800"
                }`}
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Hamburger menu button */}
          <div className="md:hidden z-50">
           <button
  ref={hamburgerRef}
  onClick={toggleMenu}
  className="w-8 h-8 flex items-center justify-center transition-all"
>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
  >
    <path
      d={isOpen ? "M6 6L18 18M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"}
      stroke={isScrolled ? "#1f2937" : "#1f2937"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>

          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 z-40 w-full h-screen overflow-hidden bg-white/90 backdrop-blur-md flex flex-col justify-center items-center md:hidden opacity-0 translate-x-full"
      >
        <div className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <div key={index} ref={(el) => setMenuItemRef(el, index)}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-gray-700 ${
                    isActive ? "text-orange-600" : ""
                  } hover:text-orange-600 transition-colors block py-2`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            </div>
          ))}

          <div ref={(el) => setMenuItemRef(el, menuItems.length)}>
            <div className="pt-4 border-t border-gray-200">
              {authUser ? (
                <button
                  onClick={() => {
                    logOutUser();
                    setIsOpen(false);
                  }}
                  className="text-gray-700 hover:text-orange-600 transition-colors block py-2"
                >
                  LogOut
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="text-gray-700 hover:text-orange-600 transition-colors block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;