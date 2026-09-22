import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

type ClientStatus = "active" | "pending" | "inactive";

type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  location: string;
  totalSpent: number;
  lastInvoice: string;
  status: ClientStatus;
};

const clientData: Client[] = [
  {
    id: "1",
    name: "Olivia Turner",
    company: "Acme Corporation",
    email: "olivia@acmecorp.com",
    location: "New York, US",
    totalSpent: 18450,
    lastInvoice: "2026-09-12",
    status: "active",
  },
  {
    id: "2",
    name: "Marcus Hill",
    company: "Globex Ltd",
    email: "marcus@globex.io",
    location: "London, UK",
    totalSpent: 12680,
    lastInvoice: "2026-08-29",
    status: "active",
  },
  {
    id: "3",
    name: "Priya Shah",
    company: "Stark Industries",
    email: "priya@stark.co",
    location: "Austin, US",
    totalSpent: 21400,
    lastInvoice: "2026-08-15",
    status: "pending",
  },
  {
    id: "4",
    name: "Noah Kim",
    company: "Wayne Enterprises",
    email: "noah@waynehq.com",
    location: "Toronto, CA",
    totalSpent: 9800,
    lastInvoice: "2026-07-20",
    status: "inactive",
  },
  {
    id: "5",
    name: "Ava Brooks",
    company: "Northwind Labs",
    email: "ava@northwind.dev",
    location: "Berlin, DE",
    totalSpent: 15420,
    lastInvoice: "2026-09-03",
    status: "active",
  },
  {
    id: "6",
    name: "Liam Foster",
    company: "Umbrella Studio",
    email: "liam@umbrella.studio",
    location: "Paris, FR",
    totalSpent: 6720,
    lastInvoice: "2026-06-27",
    status: "pending",
  },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function ClientsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | ClientStatus>("all");

  const filtered = useMemo(() => {
    return clientData.filter((client) => {
      const matchesQuery =
        client.name.toLowerCase().includes(query.toLowerCase()) ||
        client.company.toLowerCase().includes(query.toLowerCase()) ||
        client.email.toLowerCase().includes(query.toLowerCase());

      const matchesStatus = status === "all" || client.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const totalRevenue = clientData.reduce((sum, client) => sum + client.totalSpent, 0);
  const activeCount = clientData.filter((client) => client.status === "active").length;
  const pendingCount = clientData.filter((client) => client.status === "pending").length;

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Clients</h1>
          <p className="page-subtitle">Manage and track your customer relationships</p>
        </div>

        <button className="primary-button" type="button">
          <Plus size={17} />
          Add Client
        </button>
      </div>

      <div className="summary-grid">
        <div>
          <span>Total Clients</span>
          <strong>{clientData.length}</strong>
        </div>

        <div>
          <span>Active</span>
          <strong>{activeCount}</strong>
        </div>

        <div>
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div>
          <span>Revenue</span>
          <strong>{currency.format(totalRevenue)}</strong>
        </div>
      </div>

      <div className="table-card">
        <div className="filter-bar">
          <div className="filter-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search client or company..."
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as "all" | ClientStatus)}
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="state-box">No clients found.</div>
        ) : (
          <div className="invoice-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Total Spent</th>
                  <th>Last Invoice</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.company}</td>
                    <td>{client.email}</td>
                    <td>{client.location}</td>
                    <td>{currency.format(client.totalSpent)}</td>
                    <td>{client.lastInvoice}</td>
                    <td>
                      <span className={`status-badge ${client.status}`}>
                        {client.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
