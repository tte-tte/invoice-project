import { ArrowLeft } from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  InvoiceStatusBadge,
} from "../components/invoices/InvoiceStatusBadge";

import {
  getInvoice,
} from "../services/invoiceService";

import {
  formatMoney,
  getInvoiceSubtotal,
  getLineTotal,
} from "../utils/invoiceCalculations";

import type {
  Invoice,
} from "../types/invoice";


export function InvoiceDetailsPage() {

  const { id } =
    useParams();


  const [invoice, setInvoice] =
    useState<Invoice | null>(
      null
    );


  useEffect(() => {

    if (id) {

      getInvoice(id).then(
        (result) =>
          setInvoice(
            result ?? null
          )
      );

    }

  }, [id]);


  if (!invoice) {

    return (
      <div className="state-box">
        Invoice not found.
      </div>
    );

  }


  const total =
    getInvoiceSubtotal(
      invoice.lineItems
    );


  return (

    <>

      <div className="page-header">

        <div>

          <Link
            to="/invoices"
            className="back-link"
          >

            <ArrowLeft size={13} />

            Back to Invoices

          </Link>


          <h1>
            {invoice.invoiceNumber}
          </h1>

        </div>


        <InvoiceStatusBadge
          status={invoice.status}
        />

      </div>


      <div className="invoice-paper details-paper">


        <div className="invoice-title">

          <h2>
            INVOICE
          </h2>

          <strong>
            {invoice.invoiceNumber}
          </strong>

        </div>


        <div className="detail-grid">


          <div>

            <span>
              Customer
            </span>

            <strong>
              {invoice.customerName}
            </strong>

          </div>


          <div>

            <span>
              Invoice Date
            </span>

            <strong>
              {invoice.issueDate}
            </strong>

          </div>


          <div>

            <span>
              Due Date
            </span>

            <strong>
              {invoice.dueDate}
            </strong>

          </div>


          <div>

            <span>
              Currency
            </span>

            <strong>
              {invoice.currency}
            </strong>

          </div>

        </div>


        <div className="details-items">


          <div className="items-header">

            <span>
              Description
            </span>

            <span>
              Qty
            </span>

            <span>
              Rate
            </span>

            <span>
              Amount
            </span>

            <span />

          </div>


          {invoice.lineItems.map(
            (item) => (

              <div
                className="item-row read-only"
                key={item.id}
              >

                <span>
                  {item.description}
                </span>

                <span>
                  {item.quantity}
                </span>

                <span>
                  {formatMoney(
                    item.unitPrice,
                    invoice.currency
                  )}
                </span>

                <strong>
                  {formatMoney(
                    getLineTotal(item),
                    invoice.currency
                  )}
                </strong>

                <span />

              </div>

            )
          )}

        </div>


        <div className="details-total">

          <span>
            Total
          </span>

          <strong>
            {formatMoney(
              total,
              invoice.currency
            )}
          </strong>

        </div>


      </div>

    </>

  );
}