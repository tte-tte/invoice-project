import {
  Plus,
  Trash2,
} from "lucide-react";

import {
  getLineTotal,
  formatMoney,
} from "../../utils/invoiceCalculations";

import type {
  Currency,
} from "../../types/invoice";

type Item = {
  id: string;

  description: string;

  quantity: number;

  unitPrice: number;
};

interface Props {
  items: Item[];

  currency: Currency;

  onChange: (
    items: Item[]
  ) => void;
}

export function InvoiceLineItems({
  items,
  currency,
  onChange,
}: Props) {

  const updateItem = (
    id: string,
    patch: Partial<Item>
  ) => {

    onChange(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              ...patch,
            }
          : item
      )
    );

  };


  const removeItem = (
    id: string
  ) => {

    onChange(
      items.filter(
        (item) => item.id !== id
      )
    );

  };


  const addItem = () => {

    onChange([
      ...items,

      {
        id: crypto.randomUUID(),

        description: "",

        quantity: 1,

        unitPrice: 0,
      },
    ]);

  };


  return (
    <section className="line-items-section">

      <div className="items-header">

        <span>
          Item Description
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


      {items.map((item) => (

        <div
          className="item-row"
          key={item.id}
        >

          <input
            value={item.description}
            placeholder="Item Name"
            onChange={(event) =>
              updateItem(
                item.id,
                {
                  description:
                    event.target.value,
                }
              )
            }
          />


          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(event) =>
              updateItem(
                item.id,
                {
                  quantity:
                    Number(
                      event.target.value
                    ),
                }
              )
            }
          />


          <div className="money-input">

            <span>
              {currency === "USD"
                ? "$"
                : currency === "EUR"
                ? "€"
                : "£"}
            </span>

            <input
              type="number"
              min="0"
              step="0.01"
              value={item.unitPrice}
              onChange={(event) =>
                updateItem(
                  item.id,
                  {
                    unitPrice:
                      Number(
                        event.target.value
                      ),
                  }
                )
              }
            />

          </div>


          <strong className="amount-cell">

            {formatMoney(
              getLineTotal(item),
              currency
            )}

          </strong>


          <button
            className="delete-button"
            type="button"
            onClick={() =>
              removeItem(item.id)
            }
            aria-label="Remove line item"
          >
            <Trash2 size={15} />
          </button>

        </div>

      ))}


      <button
        className="add-item"
        type="button"
        onClick={addItem}
      >
        <Plus size={15} />

        Add Line Item
      </button>

    </section>
  );
}