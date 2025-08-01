import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdArrowDropdownCircle } from "react-icons/io";

import logo from "../data/Logo-Full-Light.png";
import { NavbarLinks } from "../data/navbar-links";
import ProfileDropDown from "../auth/ProfileDropdown";
import  apiconnector from "../../services/apiconnector";
import { categories } from "../../services/apis";

const Navbar = () => {
  const { token} = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { TotalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSublinks = async () => {
    setLoading(true);
    try {
      const response = await apiconnector("GET", categories.CATEGORIES_API);
      setSubLinks(response?.data?.data || []);
    } catch (error) {
      console.error("Could not fetch sublinks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  return (
    <div className="flex h-14 items-center justify-center border-b border-gray-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={42} loading="lazy" />
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex gap-6 text-gray-400 font-semibold">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative group flex items-center gap-1 cursor-pointer">
                    <p>{link.title}</p>
                    <IoMdArrowDropdownCircle className="mt-2" />
                    <div className="invisible absolute left-1/2 top-full z-10 flex flex-col rounded-md bg-gray-200 p-4 text-gray-950 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        subLinks
                          .filter(
                            (subLink) =>
                              Array.isArray(subLink.courses) &&
                              subLink.courses.length > 0
                          )
                          .map((subLink, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            >
                              <p>{subLink.name}</p>
                            </Link> 
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`${
                        location.pathname === link.path
                          ? "text-amber-200"
                          : "text-gray-500"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side (Cart / Auth Buttons / Profile) */}
        <div className="flex gap-x-4 items-center">
          {user && user.accountType !== "instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
              {TotalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
                  {TotalItems}
                </span>
              )}
            </Link>
          )}
          {!token ? (
            <>
              <Link to="/login">
                <button className="border border-gray-700 bg-gray-800 py-1.5 px-2 text-gray-100 rounded-md">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-gray-700 bg-gray-800 py-1.5 px-2 text-gray-100 rounded-md">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
             <ProfileDropDown />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

