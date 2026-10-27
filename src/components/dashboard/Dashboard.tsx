import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Plus,
  TrendingUp,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";

import { getInvoices } from "../../services/invoiceService";
import type {
  Invoice,
  InvoiceStatus,
} from "../../types/invoice";
import {
  formatMoney,
  getInvoiceSubtotal,
} from "../../utils/invoiceCalculations";

interface Stat {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: typeof TrendingUp;
}

interface StatusBadgeProps {
  status: InvoiceStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles: Record<InvoiceStatus, string> = {
    paid: "status-badge paid",
    unpaid: "status-badge unpaid",
    overdue: "status-badge overdue",
  };

  return <span className={styles[status]}>{status}</span>;
};

const Dashboard = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    getInvoices().then(setInvoices);
  }, []);

  const summary = useMemo(() => {
    const totalRevenue = invoices.reduce(
      (sum, invoice) => sum + getInvoiceSubtotal(invoice.lineItems),
      0
    );

    const paidInvoices = invoices.filter((invoice) => invoice.status === "paid");
    const overdueInvoices = invoices.filter(
      (invoice) => invoice.status === "overdue"
    );

    const paidRevenue = paidInvoices.reduce(
      (sum, invoice) => sum + getInvoiceSubtotal(invoice.lineItems),
      0
    );

    const overdueBalance = overdueInvoices.reduce(
      (sum, invoice) => sum + getInvoiceSubtotal(invoice.lineItems),
      0
    );

    return {
      totalRevenue,
      totalInvoices: invoices.length,
      paidInvoices: paidInvoices.length,
      overdueInvoices: overdueInvoices.length,
      paidRevenue,
      overdueBalance,
    };
  }, [invoices]);

  const stats: Stat[] = [
    {
      title: "Total Revenue",
      value: formatMoney(summary.totalRevenue, "USD"),
      change: "+12.5%",
      positive: true,
      icon: TrendingUp,
    },
    {
      title: "Total Invoices",
      value: String(summary.totalInvoices),
      change: "+3 this month",
      positive: true,
      icon: FileText,
    },
    {
      title: "Paid Invoices",
      value: formatMoney(summary.paidRevenue, "USD"),
      change: "+8.2%",
      positive: true,
      icon: CheckCircle2,
    },
    {
      title: "Overdue",
      value: formatMoney(summary.overdueBalance, "USD"),
      change: `${summary.overdueInvoices} invoices`,
      positive: false,
      icon: AlertCircle,
    },
  ];

  const chartData = [24, 38, 30, 46, 40, 56, 52];
  const chartPoints = chartData
    .map((value, index) => {
      const x = 12 + index * 92;
      const y = 150 - value;
      return `${x},${y}`;
    })
    .join(" ");

  const recentInvoices = invoices.slice(0, 4);

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <div className="page-header dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p className="page-subtitle">
              Here&apos;s what&apos;s happening with your business today.
            </p>
          </div>

          <Link to="/invoices/new" className="primary-button">
            <Plus size={17} />
            New Invoice
          </Link>
        </div>

        <div className="summary-grid dashboard-metrics">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.title} className="dashboard-stat-card">
                <div className="stat-header">
                  <div>
                    <span>{stat.title}</span>
                    <strong>{stat.value}</strong>
                  </div>

                  <div className="stat-icon">
                    <Icon size={18} />
                  </div>
                </div>

                <p className={stat.positive ? "stat-trend positive" : "stat-trend negative"}>
                  {stat.change}
                </p>
              </div>
            );
          })}
        </div>

        <div className="dashboard-grid">
          <div className="panel chart-panel">
            <div className="panel-header">
              <div>
                <h3>Revenue Overview</h3>
                <p>Monthly revenue performance</p>
              </div>

              <select aria-label="Revenue period">
                <option>Last 6 months</option>
                <option>This year</option>
                <option>Last year</option>
              </select>
            </div>

            <div className="chart-wrap">
              <div className="chart-grid" />

              <svg viewBox="0 0 700 180" preserveAspectRatio="none" className="chart-svg" aria-label="Revenue chart">
                <defs>
                  <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <polyline
                  points={chartPoints}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <polygon
                  points={`12,150 ${chartPoints} 690,150`}
                  fill="url(#revenueGradient)"
                />

                {chartData.map((value, index) => {
                  const x = 12 + index * 92;
                  const y = 150 - value;

                  return (
                    <circle key={`${value}-${index}`} cx={x} cy={y} r="4" fill="white" stroke="#10b981" strokeWidth="2" />
                  );
                })}
              </svg>

              <div className="chart-labels">
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

          <div className="panel status-panel">
            <h3>Invoice Status</h3>
            <p>Current invoice breakdown</p>

            <div className="donut-wrap">
              <div className="donut">
                <svg viewBox="0 0 100 100" className="donut-svg" aria-label="Invoice status donut chart">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#edf2f7" strokeWidth="13" />
                  <circle cx="50" cy="49" r="38" fill="none" stroke="#10b981" strokeWidth="13" strokeDasharray="150 239" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#fbbf24" strokeWidth="13" strokeDasharray="50 239" strokeDashoffset="-150" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f87171" strokeWidth="13" strokeDasharray="35 239" strokeDashoffset="-200" strokeLinecap="round" />
                </svg>

                <div className="donut-center">
                  <strong>{summary.totalInvoices}</strong>
                  <span>Invoices</span>
                </div>
              </div>
            </div>

            <div className="legend">
              <div className="legend-row">
                <div className="legend-label">
                  <span className="legend-dot paid" />
                  Paid
                </div>
                <strong>{summary.paidInvoices}</strong>
              </div>

              <div className="legend-row">
                <div className="legend-label">
                  <span className="legend-dot unpaid" />
                  Unpaid
                </div>
                <strong>{summary.totalInvoices - summary.paidInvoices - summary.overdueInvoices}</strong>
              </div>

              <div className="legend-row">
                <div className="legend-label">
                  <span className="legend-dot overdue" />
                  Overdue
                </div>
                <strong>{summary.overdueInvoices}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="table-card dashboard-table">
          <div className="table-header">
            <div>
              <h3>Recent Invoices</h3>
              <p>Your latest invoice activity</p>
            </div>

            <Link to="/invoices" className="text-link">
              View all →
            </Link>
          </div>

          <div className="invoice-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Issue Date</th>
                  <th className="text-right">Amount</th>
                  <th className="text-right">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>
                      <span className="invoice-link">{invoice.invoiceNumber}</span>
                    </td>
                    <td>{invoice.customerName}</td>
                    <td>{new Date(invoice.issueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="text-right">{formatMoney(getInvoiceSubtotal(invoice.lineItems), invoice.currency)}</td>
                    <td className="text-right">
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