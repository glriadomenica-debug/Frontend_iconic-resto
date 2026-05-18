import Header from "./headerCashier";
import { Outlet } from "react-router-dom";

export default function LayoutCashier() {
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
