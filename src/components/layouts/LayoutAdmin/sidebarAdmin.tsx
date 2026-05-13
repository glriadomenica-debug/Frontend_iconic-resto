import {
  IoGridOutline,
  IoFastFoodOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function sidebarAdmin() {
  return (
    <>
      {/* Sidebar */}
      <aside className=" bg-gray-900 text-white flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="px-4 py-5">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-3 rounded-xl">
                <IoFastFoodOutline className="text-xl text-white" />
              </div>

              <div>
                <h1 className="font-bold text-2xl">Iconic Self Order</h1>
                <p className="text-sm text-gray-400">Role yang login</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="mt-8 px-4">
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "hover:bg-orange-600 text-white"
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
                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "hover:bg-orange-600 text-white"
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
                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "hover:bg-orange-600 text-white"
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
                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "hover:bg-orange-600 text-white"
                    }`
                  }
                >
                  <FaMoneyBillWave className="text-xl" />
                  Transactions
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/staff"
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "hover:bg-orange-600 text-white"
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
        <div className="p-4 border-t border-white">
          <button className="w-full flex items-center gap-3 hover:bg-gray-700 transition px-4 py-3 rounded-xl">
            <IoLogOutOutline className="text-xl" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
