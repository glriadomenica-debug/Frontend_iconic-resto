import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

export default function HeaderCashier() {
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

  const initial = user?.name?.charAt(0).toUpperCase();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-3 sm:px-5 md:px-6 py-3">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <h1 className="text-2xl font-bold text-orange-600">DineFlow</h1>
            <nav>
              <ul className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm sm:text-base text-gray-600 font-medium">
                <li>
                  <NavLink
                    to="/cashier/menu"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                        : "hover:text-orange-500 pb-1"
                    }
                  >
                    Menu
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cashier/orders"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                        : "hover:text-orange-500 pb-1"
                    }
                  >
                    Orders
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/cashier/payment-verification"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                        : "hover:text-orange-500 pb-1"
                    }
                  >
                    Payment
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* SEARCH */}
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl w-full sm:w-[220px] lg:w-[260px]">
              <IoSearchOutline className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none ml-2 w-full text-sm"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  {initial}
                </div>
                <div>
                  <h2 className="font-semibold text-sm">{user?.name}</h2>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role?.name}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className=" rounded-xl hover:bg-red-600 text-black flex items-center justify-center transition"
              >
                <AiOutlineLogout />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
