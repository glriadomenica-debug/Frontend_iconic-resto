import { useState } from "react";
import Header from "./headerAdmin";
import Sidebar from "./sidebarAdmin";
import { Outlet } from "react-router-dom";

export default function LayoutAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f7f4f2] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
