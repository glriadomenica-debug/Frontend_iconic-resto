import Header from "./headerCashier";
// import Sidebar from "./sidebarCashier";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LayoutAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  //Proteksi halaman (kalau belum login otomatis mengembalikkan ke /login)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#f7f4f2] overflow-hidden">
      {/* Sidebar */}
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-orange-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
