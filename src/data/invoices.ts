import type { Invoice } from "../types/invoice";

export const invoices: Invoice[] = [
  {
    id: "1",

    invoiceNumber: "INV-2026-096",

    customerName: "Acme Corporation",

    issueDate: "2026-03-25",

    dueDate: "2026-11-08",

    currency: "USD",

    status: "unpaid",

    lineItems: [
      {
        id: "1-1",
        description: "Web Design Services",
        quantity: 1,
        unitPrice: 1500,
      },

      {
        id: "1-2",
        description: "Hosting",
        quantity: 1,
        unitPrice: 200,
      },
    ],

    notes: "Any relevant information not already covered.",

    terms:
      "Late fees, payment methods, delivery schedule.",
  },

  {
    id: "2",

    invoiceNumber: "INV-2026-095",

    customerName: "Globex Ltd",

    issueDate: "2026-03-20",

    dueDate: "2026-04-20",

    currency: "EUR",

    status: "paid",

    lineItems: [
      {
        id: "2-1",
        description: "Consulting Services",
        quantity: 4,
        unitPrice: 250,
      },
    ],
  },

  {
    id: "3",

    invoiceNumber: "INV-2026-094",

    customerName: "Stark Industries",

    issueDate: "2026-03-10",

    dueDate: "2026-04-10",

    currency: "USD",

    status: "overdue",

    lineItems: [
      {
        id: "3-1",
        description: "Software Development",
        quantity: 3,
        unitPrice: 800,
      },
    ],
  },
];