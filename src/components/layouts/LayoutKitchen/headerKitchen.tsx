import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

export default function HeaderKitchen() {
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
        <div className="flex items-center justify-between px-2 ">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <h1 className="text-2xl font-bold text-orange-600">DineFlow</h1>
            <nav>
              <ul className="flex items-center gap-4 text-sm sm:text-base text-gray-600 font-medium flex-wrap">
                <li>
                  <NavLink
                    to="/kitchen/live-order"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                        : "hover:text-orange-500 pb-1"
                    }
                  >
                    Live Order
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* profile*/}
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

            {/* logout */}
            <button
              onClick={handleLogout}
              className=" rounded-xl text-black hover:text-red-900 flex items-center justify-center transition"
            >
              <AiOutlineLogout className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
