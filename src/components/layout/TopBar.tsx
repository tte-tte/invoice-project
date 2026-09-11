import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";
import { AdminName } from "../../data/invoices";

export function Topbar() {
  return (
    <header className="topbar">

      <div className="search-box">

        <Search size={15} />

        <input
          placeholder="Search invoices, clients, or transactions..."
        />

      </div>


      <div className="topbar-actions">

        <button
          className="icon-button"
          aria-label="Notifications"
        >
          <Bell size={17} />
        </button>


        <div className="profile">

          <div className="avatar">
            {AdminName.split(" ").map((name) => name[0])}
          </div>

          <div>

            <strong>
              {AdminName}
            </strong>

            <span>
              Admin
            </span>

          </div>

          <ChevronDown size={14} />

        </div>

      </div>

    </header>
  );
}