import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./components/layout/AppLayout";

import { InvoiceListPage } from "./pages/InvoiceListPage";
import { CreateInvoicePage } from "./pages/CreateInvoicePage";
import { InvoiceDetailsPage } from "./pages/InvoiceDetailsPage";
import { ClientsPage } from "./pages/ClientsPage";
import Dashboard from "./components/dashboard/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={<Navigate to="/invoices" replace />}
        />

        <Route
          path="/invoices"
          element={<InvoiceListPage />}
        />

        <Route
          path="/invoices/new"
          element={<CreateInvoicePage />}
        />

        <Route
          path="/invoices/:id"
          element={<InvoiceDetailsPage />}
        />

        <Route
          path="/dashboard" 
          element={<Dashboard />} 
        />

        <Route
          path="/clients"
          element={<ClientsPage />}
        />
      </Route>
    </Routes>
  );
}