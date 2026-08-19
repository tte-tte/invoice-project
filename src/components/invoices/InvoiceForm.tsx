import {
  ArrowLeft,
  CalendarDays,
  Send,
} from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { InvoiceLineItems } from "./InvoiceLineItems";

import { createInvoice } from "../../services/invoiceService";

import {
  getInvoiceSubtotal,
  formatMoney,
} from "../../utils/invoiceCalculations";

import type {
  Currency,
  InvoiceLineItem,
} from "../../types/invoice";


const initialItems: InvoiceLineItem[] = [

  {
    id: crypto.randomUUID(),

    description:
      "Web Design Services",

    quantity: 1,

    unitPrice: 1500,
  },

  {
    id: crypto.randomUUID(),

    description: "",

    quantity: 1,

    unitPrice: 0,
  },

];


export function InvoiceForm() {

  const navigate =
    useNavigate();


  const [customerName, setCustomerName] =
    useState("");


  const [invoiceDate, setInvoiceDate] =
    useState("2026-03-25");


  const [dueDate, setDueDate] =
    useState("2026-11-08");


  const [currency, setCurrency] =
    useState<Currency>("USD");


  const [poNumber, setPoNumber] =
    useState("");


  const [items, setItems] =
    useState(initialItems);


  const [notes, setNotes] =
    useState("");


  const [terms, setTerms] =
    useState("");


  const [error, setError] =
    useState("");


  const subtotal =
    getInvoiceSubtotal(items);


  const handleSubmit = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();


    if (!customerName.trim()) {

      setError(
        "Customer name is required."
      );

      return;
    }


    if (
      !items.some(
        (item) =>
          item.description.trim()
      )
    ) {

      setError(
        "Add at least one line item with a description."
      );

      return;
    }


    if (dueDate < invoiceDate) {

      setError(
        "Due date cannot be before invoice date."
      );

      return;
    }


    const invoice =
      await createInvoice({

        customerName,

        invoiceDate,

        dueDate,

        currency,

        lineItems:
          items.filter(
            (item) =>
              item.description.trim()
          ),

        notes,

        terms,

      });


    navigate(
      `/invoices/${invoice.id}`
    );

  };


  return (

    <form
      onSubmit={handleSubmit}
    >

      {/* Header */}

      <div className="page-header">

        <div>

          <button
            type="button"
            className="back-link"
            onClick={() =>
              navigate("/invoices")
            }
          >

            <ArrowLeft size={13} />

            Back to Invoices

          </button>


          <h1>
            Create Invoice
          </h1>

        </div>


        <div className="header-actions">

          <button
            type="button"
            className="secondary-button"
          >
            Save Draft
          </button>


          <button
            type="submit"
            className="primary-button"
          >

            <Send size={15} />

            Send Invoice

          </button>

        </div>

      </div>


      {/* Invoice */}

      <div className="invoice-paper">


        {/* Invoice top */}

        <div className="invoice-top">


          <div className="business-side">

            <button
              type="button"
              className="logo-placeholder"
            >

              ▧

              <small>
                Add Logo
              </small>

            </button>


            <div className="business-details">

              <strong>
                Your Business Details
              </strong>

              <span>
                Company Name
              </span>

              <span>
                123 Business Rd
              </span>

              <span>
                City, Country
              </span>

            </div>

          </div>


          <div className="invoice-title">

            <h2>
              INVOICE
            </h2>


            <div className="invoice-number">

              <span>
                #
              </span>

              <strong>
                INV-2026-096
              </strong>

            </div>

          </div>

        </div>


        {/* Invoice metadata */}

        <div className="invoice-meta-grid">


          <label>

            Bill To

            <input
              value={customerName}
              onChange={(event) =>
                setCustomerName(
                  event.target.value
                )
              }
              placeholder="Select Client"
            />

          </label>


          <label>

            Invoice Date

            <div className="input-with-icon">

              <input
                type="date"
                value={invoiceDate}
                onChange={(event) =>
                  setInvoiceDate(
                    event.target.value
                  )
                }
              />

              <CalendarDays size={15} />

            </div>

          </label>


          <label>

            Due Date

            <div className="input-with-icon">

              <input
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(
                    event.target.value
                  )
                }
              />

              <CalendarDays size={15} />

            </div>

          </label>


          <label className="customer-placeholder">

            <span>
              &nbsp;
            </span>

            <div className="disabled-box">
              {invoiceDate}
            </div>

          </label>


          <label>

            PO Number

            <input
              value={poNumber}
              onChange={(event) =>
                setPoNumber(
                  event.target.value
                )
              }
              placeholder="PO-12345"
            />

          </label>


          <label>

            Currency

            <select
              value={currency}
              onChange={(event) =>
                setCurrency(
                  event.target
                    .value as Currency
                )
              }
            >

              <option value="USD">
                USD ($)
              </option>

              <option value="EUR">
                EUR (€)
              </option>

              <option value="GBP">
                GBP (£)
              </option>

            </select>

          </label>

        </div>


        {/* Line items */}

        <InvoiceLineItems
          items={items}
          currency={currency}
          onChange={setItems}
        />


        {/* Validation error */}

        {error && (

          <div className="form-error">
            {error}
          </div>

        )}


        {/* Bottom */}

        <div className="invoice-bottom">


          <div className="notes-column">


            <label>

              Notes

              <textarea
                value={notes}
                onChange={(event) =>
                  setNotes(
                    event.target.value
                  )
                }
                placeholder="Notes - any relevant information not already covered"
              />

            </label>


            <label>

              Terms & Conditions

              <textarea
                value={terms}
                onChange={(event) =>
                  setTerms(
                    event.target.value
                  )
                }
                placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
              />

            </label>


          </div>


          <div className="totals">


            <div>

              <span>
                Subtotal
              </span>

              <strong>
                {formatMoney(
                  subtotal,
                  currency
                )}
              </strong>

            </div>


            <div>

              <span>
                Discount
              </span>

              <input
                value="0"
                readOnly
              />

            </div>


            <div>

              <span>
                Tax
              </span>

              <input
                value="0"
                readOnly
              />

            </div>


            <div className="grand-total">

              <span>
                Total
              </span>

              <strong>
                {formatMoney(
                  subtotal,
                  currency
                )}
              </strong>

            </div>


          </div>

        </div>

      </div>

    </form>

  );
}