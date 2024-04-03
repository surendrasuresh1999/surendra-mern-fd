import { PlusCircle, Trash2 } from "lucide-react";
import React from "react";
const accounts = [
  { id: "checking", name: "Checking", description: "CIBC ••••6610" },
  { id: "savings", name: "Savings", description: "Bank of America ••••0149" },
  { id: "mastercard", name: "Mastercard", description: "Capital One ••••7877" },
];
const AddressCard = ({ setOpenAddressModal }) => {
  return (
    <div className="pb-20 pt-6 sm:pb-6 space-y-3">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Shipping Address
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose your shipping address from the list of address.
        </p>
        <button
          onClick={() => setOpenAddressModal(true)}
          className="flex mt-3 items-center gap-2 outline-none px-6 py-2 bg-indigo-600 hover:bg-indigo-400 text-white font-medium text-mediumSize rounded-md"
        >
          <PlusCircle />
          Add new address
        </button>
      </div>
      <fieldset>
        <legend className="sr-only">Bank account</legend>
        <div className="divide-y divide-gray-200 bg-white border border-borderColor rounded-md">
          {accounts.map((account, accountIdx) => (
            <div
              key={accountIdx}
              className="relative flex items-start pb-4 pt-3.5 px-4"
            >
              <div className="min-w-0 flex-1 text-sm leading-6 space-y-3">
                <label
                  htmlFor={`account-${account.id}`}
                  className="font-medium text-gray-900"
                >
                  {account.name}
                </label>
                <p
                  id={`account-${account.id}-description`}
                  className="text-gray-500"
                >
                  {account.description}
                </p>
                <button className="px-4 py-2 rounded-md bg-orange-600 text-white font-medium text-lg">
                  Delivery Here
                </button>
              </div>
              <div className="ml-3 flex items-center gap-4">
                <input
                  id={`account-${account.id}`}
                  aria-describedby={`account-${account.id}-description`}
                  name="account"
                  type="radio"
                  defaultChecked={account.id === "checking"}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <button>
                  <Trash2 color="#ee6d6d" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default AddressCard;
