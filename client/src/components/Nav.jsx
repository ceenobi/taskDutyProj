import { NavLink } from "react-router";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.png";
import { useAuth } from "../store";

export default function Nav() {
  const { user, handleLogout } = useAuth();
  return (
    <div className="sticky w-full top-0 bg-white">
      <div className="flex justify-between items-center">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <div className="hidden md:block">
          {user ? (
            <div className="flex gap-4 items-center">
              <NavLink
                to="/new-task"
                className={({ isActive }) =>
                  isActive ? "text-[#974FD0] font-bold" : ""
                }
              >
                New Task
              </NavLink>
              <NavLink
                to="/all-task"
                className={({ isActive }) =>
                  isActive ? "text-[#974FD0] font-bold" : ""
                }
              >
                All Tasks
              </NavLink>
              <img src={avatar} alt="avatar" />
              <span onClick={handleLogout} className="cursor-pointer">
                Logout
              </span>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-[#974FD0] font-bold" : ""
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-[#974FD0] font-bold" : ""
                }
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
