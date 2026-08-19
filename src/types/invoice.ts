export type InvoiceStatus =
  | "paid"
  | "unpaid"
  | "overdue";

export type Currency =
  | "USD"
  | "EUR"
  | "GBP";

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;

  customerName: string;

  issueDate: string;
  dueDate: string;

  currency: Currency;

  status: InvoiceStatus;

  lineItems: InvoiceLineItem[];

  notes?: string;
  terms?: string;
}

export interface CreateInvoiceFormValues {
  customerName: string;

  invoiceDate: string;
  dueDate: string;

  currency: Currency;

  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;

  notes?: string;
  terms?: string;
}