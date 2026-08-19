import {
  Plus,
  Search,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  InvoiceStatusBadge,
} from "../components/invoices/InvoiceStatusBadge";

import {
  getInvoices,
} from "../services/invoiceService";

import {
  formatMoney,
  getInvoiceSubtotal,
} from "../utils/invoiceCalculations";

import type {
  Invoice,
  InvoiceStatus,
} from "../types/invoice";


export function InvoiceListPage() {

  const [data, setData] =
    useState<Invoice[]>([]);


  const [loading, setLoading] =
    useState(true);


  const [query, setQuery] =
    useState("");


  const [status, setStatus] =
    useState<
      "all" | InvoiceStatus
    >("all");


  const [sort, setSort] =
    useState("date-desc");


  useEffect(() => {

    getInvoices()
      .then(setData)
      .finally(() =>
        setLoading(false)
      );

  }, []);


  const filtered =
    useMemo(() => {

      return [...data]

        .filter((invoice) => {

          const matchesQuery =
            invoice.invoiceNumber
              .toLowerCase()
              .includes(
                query.toLowerCase()
              ) ||

            invoice.customerName
              .toLowerCase()
              .includes(
                query.toLowerCase()
              );


          const matchesStatus =
            status === "all" ||
            invoice.status === status;


          return (
            matchesQuery &&
            matchesStatus
          );

        })


        .sort((a, b) => {

          if (
            sort === "amount-desc"
          ) {

            return (
              getInvoiceSubtotal(
                b.lineItems
              ) -

              getInvoiceSubtotal(
                a.lineItems
              )
            );

          }


          if (
            sort === "amount-asc"
          ) {

            return (
              getInvoiceSubtotal(
                a.lineItems
              ) -

              getInvoiceSubtotal(
                b.lineItems
              )
            );

          }


          return sort === "date-asc"

            ? a.issueDate.localeCompare(
                b.issueDate
              )

            : b.issueDate.localeCompare(
                a.issueDate
              );

        });

    }, [
      data,
      query,
      status,
      sort,
    ]);


  const count = (
    currentStatus: InvoiceStatus
  ) => {

    return data.filter(
      (invoice) =>
        invoice.status ===
        currentStatus
    ).length;

  };


  return (

    <>

      <div className="page-header">

        <div>

          <h1>
            Invoices
          </h1>

          <p className="page-subtitle">
            Manage and track your invoices
          </p>

        </div>


        <Link
          to="/invoices/new"
          className="primary-button"
        >

          <Plus size={15} />

          New Invoice

        </Link>

      </div>


      {/* Summary */}

      <div className="summary-grid">

        <div>

          <span>
            Total Invoices
          </span>

          <strong>
            {data.length}
          </strong>

        </div>


        <div>

          <span>
            Paid
          </span>

          <strong>
            {count("paid")}
          </strong>

        </div>


        <div>

          <span>
            Unpaid
          </span>

          <strong>
            {count("unpaid")}
          </strong>

        </div>


        <div>

          <span>
            Overdue
          </span>

          <strong>
            {count("overdue")}
          </strong>

        </div>

      </div>


      {/* Table */}

      <div className="table-card">


        <div className="filter-bar">


          <div className="filter-search">

            <Search size={15} />

            <input
              value={query}
              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }
              placeholder="Search invoice or customer..."
            />

          </div>


          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as
                  | "all"
                  | InvoiceStatus
              )
            }
          >

            <option value="all">
              All statuses
            </option>

            <option value="paid">
              Paid
            </option>

            <option value="unpaid">
              Unpaid
            </option>

            <option value="overdue">
              Overdue
            </option>

          </select>


          <select
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value
              )
            }
          >

            <option value="date-desc">
              Newest first
            </option>

            <option value="date-asc">
              Oldest first
            </option>

            <option value="amount-desc">
              Highest amount
            </option>

            <option value="amount-asc">
              Lowest amount
            </option>

          </select>


        </div>


        {loading ? (

          <div className="state-box">
            Loading invoices...
          </div>

        ) : filtered.length === 0 ? (

          <div className="state-box">
            No invoices found.
          </div>

        ) : (

          <div className="invoice-table-wrap">

            <table>

              <thead>

                <tr>

                  <th>
                    Invoice
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Issue Date
                  </th>

                  <th>
                    Due Date
                  </th>

                  <th>
                    Total
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {filtered.map(
                  (invoice) => (

                    <tr
                      key={invoice.id}
                    >

                      <td>

                        <Link
                          to={`/invoices/${invoice.id}`}
                          className="invoice-link"
                        >
                          {
                            invoice.invoiceNumber
                          }
                        </Link>

                      </td>


                      <td>
                        {
                          invoice.customerName
                        }
                      </td>


                      <td>
                        {
                          invoice.issueDate
                        }
                      </td>


                      <td>
                        {
                          invoice.dueDate
                        }
                      </td>


                      <td>

                        {formatMoney(
                          getInvoiceSubtotal(
                            invoice.lineItems
                          ),
                          invoice.currency
                        )}

                      </td>


                      <td>

                        <InvoiceStatusBadge
                          status={
                            invoice.status
                          }
                        />

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </>

  );
}