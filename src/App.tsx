import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./components/layout/AppLayout";

import { InvoiceListPage } from "./pages/InvoiceListPage";
import { CreateInvoicePage } from "./pages/CreateInvoicePage";
import { InvoiceDetailsPage } from "./pages/InvoiceDetailsPage";

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
      </Route>
    </Routes>
  );
}