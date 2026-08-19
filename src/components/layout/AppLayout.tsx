import { Outlet } from "react-router-dom";

import { Sidebar } from "./SideBar";
import { Topbar } from "./TopBar";

export function AppLayout() {
  return (
    <div className="app-shell">

      <Sidebar />

      <div className="main-area">

        <Topbar />

        <main className="page-area">
          <Outlet />
        </main>

      </div>

    </div>
  );
}