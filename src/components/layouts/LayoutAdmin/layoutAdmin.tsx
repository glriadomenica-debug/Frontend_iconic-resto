import Header from "./headerAdmin";
import Sidebar from "./sidebarAdmin";
import { Outlet } from "react-router-dom";

export default function LayoutAdmin() {
  return (
    <>
      <div className="flex h-screen bg-[#f7f4f2] overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-y-auto p-6 bg-orange-50">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
