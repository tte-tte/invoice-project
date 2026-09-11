import React from "react";
import {
  FileText,
  Plus,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface Stat {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
}

interface Invoice {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: "Paid" | "Unpaid" | "Overdue";
}

const stats: Stat[] = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    positive: true,
    icon: TrendingUp,
  },
  {
    title: "Total Invoices",
    value: "24",
    change: "+4 this month",
    positive: true,
    icon: FileText,
  },
  {
    title: "Paid Invoices",
    value: "$8,420",
    change: "+8.2%",
    positive: true,
    icon: CheckCircle2,
  },
  {
    title: "Overdue",
    value: "$2,300",
    change: "3 invoices",
    positive: false,
    icon: AlertCircle,
  },
];

const invoices: Invoice[] = [
  {
    id: "INV-2026-096",
    customer: "Acme Corporation",
    date: "Mar 25, 2026",
    amount: "$1,700.00",
    status: "Unpaid",
  },
  {
    id: "INV-2026-095",
    customer: "Globex Ltd",
    date: "Mar 20, 2026",
    amount: "€1,000.00",
    status: "Paid",
  },
  {
    id: "INV-2026-094",
    customer: "Stark Industries",
    date: "Mar 10, 2026",
    amount: "$2,400.00",
    status: "Overdue",
  },
  {
    id: "INV-2026-093",
    customer: "Wayne Enterprises",
    date: "Mar 05, 2026",
    amount: "$3,250.00",
    status: "Paid",
  },
];

interface StatusBadgeProps {
  status: Invoice["status"];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<Invoice["status"], string> = {
    Paid: "bg-emerald-50 text-emerald-600",
    Unpaid: "bg-amber-50 text-amber-600",
    Overdue: "bg-red-50 text-red-500",
  };

  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const Dashboard: React.FC = () => {
  return (
      <main className="ml-[175px]">


        {/* ================= CONTENT ================= */}
        <section className="p-7 max-w-[1400px] mx-auto">

          {/* Heading */}
          <div className="flex items-center justify-between mb-7">

            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Dashboard
              </h1>

              <p className="text-xs text-slate-400 mt-1">
                Here's what's happening with your business today.
              </p>
            </div>

            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-md text-xs font-medium transition">
              <Plus size={16} />
              New Invoice
            </button>

          </div>


          {/* ================= STAT CARDS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

            {stats.map((stat) => {

              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="bg-white border border-slate-200 rounded-lg p-5"
                >

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-xs text-slate-400">
                        {stat.title}
                      </p>

                      <h2 className="text-2xl font-semibold mt-2 text-slate-900">
                        {stat.value}
                      </h2>
                    </div>

                    <div className="w-9 h-9 rounded-md bg-emerald-50 text-emerald-500 flex items-center justify-center">
                      <Icon size={18} />
                    </div>

                  </div>

                  <p
                    className={`text-[11px] mt-3 ${
                      stat.positive
                        ? "text-emerald-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </p>

                </div>
              );
            })}

          </div>


          {/* ================= CHART SECTION ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-5">

              <div className="flex justify-between items-center mb-6">

                <div>
                  <h3 className="text-sm font-semibold">
                    Revenue Overview
                  </h3>

                  <p className="text-[11px] text-slate-400 mt-1">
                    Monthly revenue performance
                  </p>
                </div>

                <select className="text-xs border border-slate-200 rounded px-2 py-1.5 outline-none">
                  <option>Last 6 months</option>
                  <option>This year</option>
                  <option>Last year</option>
                </select>

              </div>


              {/* Chart */}
              <div className="h-[230px] relative">

                {/* Grid */}
                <div className="absolute inset-0 flex flex-col justify-between">

                  {[0, 1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="border-t border-dashed border-slate-100"
                    />
                  ))}

                </div>


                {/* SVG */}
                <svg
                  viewBox="0 0 700 220"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >

                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#10b981"
                        stopOpacity=".18"
                      />

                      <stop
                        offset="100%"
                        stopColor="#10b981"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>


                  {/* Area */}
                  <path
                    d="
                      M0 170
                      L115 140
                      L230 150
                      L345 90
                      L460 115
                      L575 55
                      L700 75
                      L700 220
                      L0 220
                      Z
                    "
                    fill="url(#revenueGradient)"
                  />


                  {/* Line */}
                  <path
                    d="
                      M0 170
                      L115 140
                      L230 150
                      L345 90
                      L460 115
                      L575 55
                      L700 75
                    "
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />


                  {/* Points */}
                  {[
                    [0, 170],
                    [115, 140],
                    [230, 150],
                    [345, 90],
                    [460, 115],
                    [575, 55],
                    [700, 75],
                  ].map(([x, y], index) => (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="white"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                  ))}

                </svg>


                {/* Months */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400">
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                </div>

              </div>
            </div>


            {/* Invoice Status */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">

              <h3 className="text-sm font-semibold">
                Invoice Status
              </h3>

              <p className="text-[11px] text-slate-400 mt-1">
                Current invoice breakdown
              </p>


              {/* Donut */}
              <div className="flex justify-center my-7">

                <div className="relative w-36 h-36">

                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full -rotate-90"
                  >

                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="13"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="13"
                      strokeDasharray="145 239"
                      strokeLinecap="round"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="13"
                      strokeDasharray="45 239"
                      strokeDashoffset="-150"
                      strokeLinecap="round"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="13"
                      strokeDasharray="30 239"
                      strokeDashoffset="-200"
                      strokeLinecap="round"
                    />

                  </svg>


                  <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <span className="text-xl font-semibold">
                      24
                    </span>

                    <span className="text-[10px] text-slate-400">
                      Invoices
                    </span>

                  </div>

                </div>

              </div>


              {/* Legend */}
              <div className="space-y-3">

                <div className="flex justify-between text-xs">

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Paid
                  </div>

                  <span className="font-medium">
                    15
                  </span>

                </div>


                <div className="flex justify-between text-xs">

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Unpaid
                  </div>

                  <span className="font-medium">
                    6
                  </span>

                </div>


                <div className="flex justify-between text-xs">

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    Overdue
                  </div>

                  <span className="font-medium">
                    3
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* ================= RECENT INVOICES ================= */}
          <div className="bg-white border border-slate-200 rounded-lg">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

              <div>
                <h3 className="text-sm font-semibold">
                  Recent Invoices
                </h3>

                <p className="text-[11px] text-slate-400 mt-1">
                  Your latest invoice activity
                </p>
              </div>

              <button className="text-xs text-emerald-500 hover:text-emerald-600">
                View all →
              </button>

            </div>


            {/* Table */}
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-slate-100">

                    <th className="text-left px-5 py-3 text-[9px] uppercase tracking-wide text-slate-400 font-semibold">
                      Invoice
                    </th>

                    <th className="text-left px-5 py-3 text-[9px] uppercase tracking-wide text-slate-400 font-semibold">
                      Customer
                    </th>

                    <th className="text-left px-5 py-3 text-[9px] uppercase tracking-wide text-slate-400 font-semibold">
                      Issue Date
                    </th>

                    <th className="text-right px-5 py-3 text-[9px] uppercase tracking-wide text-slate-400 font-semibold">
                      Amount
                    </th>

                    <th className="text-right px-5 py-3 text-[9px] uppercase tracking-wide text-slate-400 font-semibold">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {invoices.map((invoice) => (

                    <tr
                      key={invoice.id}
                      className="border-b last:border-0 border-slate-100 hover:bg-slate-50 transition"
                    >

                      <td className="px-5 py-4">

                        <span className="text-xs font-medium text-emerald-600">
                          {invoice.id}
                        </span>

                      </td>


                      <td className="px-5 py-4 text-xs text-slate-600">
                        {invoice.customer}
                      </td>


                      <td className="px-5 py-4 text-xs text-slate-500">
                        {invoice.date}
                      </td>


                      <td className="px-5 py-4 text-xs font-medium text-right">
                        {invoice.amount}
                      </td>


                      <td className="px-5 py-4 text-right">
                        <StatusBadge status={invoice.status} />
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </main>
  );
};

export default Dashboard;