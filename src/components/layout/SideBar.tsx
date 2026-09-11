import {
  BarChart3,
  FileText,
  Grid2X2,
  Landmark,
  Settings,
  Users,
  ArrowLeftRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    icon: Grid2X2,
    to: "dashboard",
  },

  {
    label: "Invoices",
    icon: FileText,
    to: "/invoices",
  },

  {
    label: "Clients",
    icon: Users,
    to: "/invoices",
  },
];

const financeItems = [
  {
    label: "Wallet",
    icon: Landmark,
  },

  {
    label: "Transactions",
    icon: ArrowLeftRight,
  },

  {
    label: "Reports",
    icon: BarChart3,
  },
];

export function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="brand">

        <div className="brand-mark">
          ↗
        </div>

        <span>
          InvoicePro
        </span>

      </div>


      {/* Overview */}

      <div className="sidebar-section">

        <div className="sidebar-heading">
          Overview
        </div>

        {navItems.map(
          ({ label, icon: Icon, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive && label === "Invoices" 
                    ? "active"
                    : ""
                }`
              }
            >
              <Icon size={16} />

              {label}
            </NavLink>
          )
        )}

      </div>


      {/* Finance */}

      <div className="sidebar-section">

        <div className="sidebar-heading">
          Finance
        </div>

        {financeItems.map(
          ({ label, icon: Icon }) => (
            <div
              key={label}
              className="sidebar-link"
            >
              <Icon size={16} />

              {label}
            </div>
          )
        )}

      </div>


      {/* Settings */}

      <div className="sidebar-section">

        <div className="sidebar-heading">
          Settings
        </div>

        <div className="sidebar-link">

          <Settings size={16} />

          Preferences

        </div>

      </div>


      {/* Upgrade */}

      <div className="upgrade-card">

        <strong>
          Upgrade to Pro
        </strong>

        <p>
          Get unlimited invoices and
          premium support.
        </p>

        <button>
          Upgrade Now
        </button>

      </div>

    </aside>
  );
}