import Header from "./headerCashier";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LayoutCashier() {
  const navigate = useNavigate();

  //Proteksi halaman (kalau belum login otomatis mengembalikkan ke /login)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f4f2] flex overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-orange-50 p-3 sm:p-4 md:p-5 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
