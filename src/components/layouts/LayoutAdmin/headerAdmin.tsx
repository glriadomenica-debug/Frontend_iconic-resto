import { IoSearchOutline, IoMenuOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  setSidebarOpen: (value: boolean) => void;
}

export default function HeaderAdmin({ setSidebarOpen }: HeaderProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const initial = user?.name?.charAt(0).toUpperCase();
  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-5 md:px-8 py-4">
      <div className="flex items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-3 md:gap-8 flex-1">
          {/* Menu Mobile */}
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <IoMenuOutline className="text-3xl text-gray-700" />
          </button>

          {/* Logo */}
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-600">
            DineFlow
          </h1>

          {/* Nav Desktop */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600 font-medium">
              <li>
                <NavLink
                  to="/admin/menu"
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
                  to="/admin/orders"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                      : "hover:text-orange-500 pb-1"
                  }
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search */}
          <div className="hidden sm:flex items-center bg-gray-100 px-3 py-2 rounded-xl w-[180px] md:w-[250px]">
            <IoSearchOutline className="text-gray-500" />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none ml-2 w-full text-sm"
            />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
              {initial}
            </div>

            <div className="hidden sm:block">
              <h2 className="font-semibold text-sm">{user?.name}</h2>

              <p className="text-xs text-gray-500 capitalize">
                {user?.role?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
