import {
  IoGridOutline,
  IoFastFoodOutline,
  IoLogOutOutline,
  IoCloseOutline,
} from "react-icons/io5";

import { FaUser, FaMoneyBillWave } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export default function SidebarAdmin({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };
  return (
    <>
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-[260px]
          bg-gray-900 text-white
          flex flex-col justify-between
          transform transition-transform duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div>
          {/* Logo */}
          <div className="px-4 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-3 rounded-xl">
                <IoFastFoodOutline className="text-xl text-white" />
              </div>

              <div>
                <h1 className="font-bold text-lg md:text-xl">
                  Iconic Self Order
                </h1>

                <p className="text-xs md:text-sm text-gray-400 capitalize">
                  {user?.role?.name}
                </p>
              </div>
            </div>

            {/* Close Mobile */}
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <IoCloseOutline className="text-2xl" />
            </button>
          </div>

          {/* Menu */}
          <nav className="mt-2 px-4">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive ? "bg-orange-500" : "hover:bg-orange-600"
                    }`
                  }
                >
                  <IoGridOutline className="text-xl" />
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive ? "bg-orange-500" : "hover:bg-orange-600"
                    }`
                  }
                >
                  <FiLayers className="text-xl" />
                  Categories
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive ? "bg-orange-500" : "hover:bg-orange-600"
                    }`
                  }
                >
                  <MdOutlineRestaurantMenu className="text-xl" />
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/transactions"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive ? "bg-orange-500" : "hover:bg-orange-600"
                    }`
                  }
                >
                  <FaMoneyBillWave className="text-xl" />
                  Transactions
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin/liveOrder"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive ? "bg-orange-500" : "hover:bg-orange-600"
                    }`
                  }
                >
                  <CgNotes className="text-xl" />
                  Live Order
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/staff"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive ? "bg-orange-500" : "hover:bg-orange-600"
                    }`
                  }
                >
                  <FaUser className="text-xl" />
                  Staff
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 hover:bg-gray-700 transition px-4 py-3 rounded-xl"
          >
            <IoLogOutOutline className="text-xl" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
