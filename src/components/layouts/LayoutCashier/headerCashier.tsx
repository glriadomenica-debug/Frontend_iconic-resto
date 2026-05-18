import { IoSearchOutline, IoMenuOutline } from "react-icons/io5";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface HeaderProps {
  setSidebarOpen: (value: boolean) => void;
}

export default function HeaderCashier({ setSidebarOpen }: HeaderProps) {
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
    <header className="bg-white border-b border-gray-200 px-3 sm:px-5 md:px-8 py-4">
      <div className="flex items-center justify-between gap-3 w-full">
        {/* Left */}
        <div className="flex items-center gap-3 lg:gap-8 min-w-0">
          {/* Menu Mobile */}
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <IoMenuOutline className="text-3xl text-gray-700" />
          </button>

          {/* Logo */}
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-600">
            DineFlow
          </h1>

          {/* Nav Desktop */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-6 text-gray-600 font-medium">
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

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-xl w-[160px] lg:w-[250px]">
            <IoSearchOutline className="text-gray-500" />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none ml-2 w-full text-sm"
            />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
              {initial}
            </div>

            <div className="hidden lg:block">
              <h2 className="font-semibold text-sm">{user?.name}</h2>

              <p className="text-xs text-gray-500 capitalize">
                {user?.role?.name}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-black hover:bg-red-600 text-white px-4 py-2 rounded-xl transition font-medium"
          >
            <LogOut size={18} />

          </button>
        </div>
      </div>
    </header>
  );
}
