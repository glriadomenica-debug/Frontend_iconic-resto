import { IoSearchOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

export default function HeaderAdmin() {
  return (
    <>
      {/* Header */}
      <div>
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10 flex-1">
              <h1 className="text-4xl justify-between font-bold text-orange-600">
                DineFlow
              </h1>
              <nav>
                <ul className="flex items-center gap-8 text-gray-600 font-medium">
                  <li className="text-orange-500 border-b-2 border-orange-500 pb-1 cursor-pointer">
                    Menu
                  </li>

                  <li className="hover:text-orange-500 cursor-pointer">
                    Orders
                  </li>

                  <li className="hover:text-orange-500 cursor-pointer">
                    Inventory
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-5">
              {/* Search */}
              <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl">
                <IoSearchOutline className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="bg-transparent outline-none ml-2 w-full text-sm"
                />
              </div>
              {/* Profile */}
              <div className="flex items-center gap-3 cursor-pointer">
                <FaUserCircle className="text-4xl text-gray-600" />

                <div>
                  <h2 className="font-semibold text-sm">Nama</h2>
                  <p className="text-xs text-gray-500">Role</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        {/* <main className="flex-1 overflow-y-auto p-6 bg-orange-50">
          <Outlet />
        </main> */}
      </div>
    </>
  );
}
