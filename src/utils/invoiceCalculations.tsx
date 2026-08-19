import type { InvoiceLineItem } from "../types/invoice";

export function getLineTotal(
  item: Pick<
    InvoiceLineItem,
    "quantity" | "unitPrice"
  >
) {
  return (
    Number(item.quantity || 0) *
    Number(item.unitPrice || 0)
  );
}

export function getInvoiceSubtotal(
  items: InvoiceLineItem[]
) {
  return items.reduce(
    (sum, item) => sum + getLineTotal(item),
    0
  );
}

export function formatMoney(
  amount: number,
  currency: string
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,

    minimumFractionDigits: 2,
  }).format(amount);
}