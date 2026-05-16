import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

interface HeaderCustomerProps {
  cartCount?: number;
}

export default function HeaderCustomer({ cartCount = 0 }: HeaderCustomerProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-10 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-500">
            DineFlow
          </h1>

          <nav className="flex">
            <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 font-medium text-gray-600 text-sm sm:text-base">
              <li>
                <NavLink
                  to="/"
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
                  to="/myorders"
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                      : "hover:text-orange-500 pb-1"
                  }
                >
                  My Orders
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-gray-100 px-4 py-2 rounded-2xl w-[180px] md:w-[260px]">
            <IoSearchOutline className="text-gray-500 text-lg" />

            <input
              type="text"
              placeholder="Search menu..."
              className="bg-transparent outline-none ml-2 w-full text-sm"
            />
          </div>

          <button className="relative bg-orange-500 hover:bg-orange-600 transition text-white p-3 rounded-2xl">
            <IoCartOutline className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
