import type {
  InvoiceStatus,
} from "../../types/invoice";

interface Props {
  status: InvoiceStatus;
}

export function InvoiceStatusBadge({
  status,
}: Props) {
  const label =
    status.charAt(0).toUpperCase() +
    status.slice(1);

  return (
    <span
      className={`status-badge ${status}`}
    >
      {label}
    </span>
  );
}