import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router";
import { useAuth } from "../store";
import avatar from "../assets/avatar.png";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  return (
    <div className="md:hidden">
      <Menu onClick={() => setIsOpen(true)} className="cursor-pointer" />
      <div
        className={`drawer fixed top-0 left-0 z-50 ${
          isOpen ? "drawer-open" : ""
        }`}
      >
        <input
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="drawer-side">
          <label
            className="drawwer-overlay"
            onChange={() => setIsOpen(false)}
          ></label>
          <div className="menu w-90 h-screen bg-base-200 shadow text-base-centent p-4">
            <div>
              <img src={logo} alt="logo" />
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                <X />
              </button>
            </div>
            <div>
              {user ? (
                <div className="mt-10 flex flex-col gap-8 items-center">
                  <NavLink
                    to="/new-task"
                    className={({ isActive }) =>
                      isActive ? "text-[#974FD0] font-bold text-xl" : "text-xl"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    New Task
                  </NavLink>
                  <NavLink
                    to="/all-task"
                    className={({ isActive }) =>
                      isActive ? "text-[#974FD0] font-bold text-xl" : "text-xl"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    All Tasks
                  </NavLink>
                  <img src={avatar} alt="avatar" />
                  <span
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="cursor-pointer text-xl"
                  >
                    Logout
                  </span>
                </div>
              ) : (
                <div className="mt-10 flex flex-col gap-4">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "text-[#974FD0] font-bold text-xl" : "text-xl"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? "text-[#974FD0] font-bold text-xl" : "text-xl"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
