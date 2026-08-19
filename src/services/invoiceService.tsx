import { invoices } from "../data/invoices";

import type {
  CreateInvoiceFormValues,
  Invoice,
} from "../types/invoice";

let invoiceStore = [...invoices];

export async function getInvoices(): Promise<Invoice[]> {
  await new Promise((resolve) =>
    setTimeout(resolve, 350)
  );

  return invoiceStore;
}

export async function getInvoice(
  id: string
): Promise<Invoice | undefined> {
  await new Promise((resolve) =>
    setTimeout(resolve, 250)
  );

  return invoiceStore.find(
    (invoice) => invoice.id === id
  );
}

export async function createInvoice(
  values: CreateInvoiceFormValues
): Promise<Invoice> {
  const invoice: Invoice = {
    id: crypto.randomUUID(),

    invoiceNumber: `INV-${new Date().getFullYear()}-${String(
      invoiceStore.length + 97
    ).padStart(3, "0")}`,

    customerName: values.customerName,

    issueDate: values.invoiceDate,

    dueDate: values.dueDate,

    currency: values.currency,

    status: "unpaid",

    lineItems: values.lineItems.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    })),

    notes: values.notes,

    terms: values.terms,
  };

  invoiceStore = [
    invoice,
    ...invoiceStore,
  ];

  return invoice;
}