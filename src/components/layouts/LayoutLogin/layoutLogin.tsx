import HeaderLogin from "./headerLogin";
import { Outlet } from "react-router-dom";

export default function LayoutAdmin() {
  return (
    <div className="flex h-screen bg-[#f7f4f2] overflow-hidden">
      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderLogin />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-orange-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
