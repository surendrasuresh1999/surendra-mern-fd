import React, { Fragment } from "react";
import { categoryOptions } from "../StaticData";
import { Listbox, Transition as Headless } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const CategoryDropDown = ({ category, setCategory, showLastOption }) => {
  return (
    <div className="w-56 grow sm:grow-0">
      <Listbox
        value={category}
        onChange={(e) => {
          if (e === undefined) {
            setCategory(null);
          } else {
            setCategory(e);
          }
        }}
      >
        <div className="relative ">
          <Listbox.Button className="relative w-full sm:min-w-48 cursor-default rounded-md bg-indigo-50 border border-indigo-400 py-2.5 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-indigo-600 font-600 tracking-wide">
              {category === null ? "Choose category" : <>{category.label}</>}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Headless
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-64 z-50 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {categoryOptions.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none px-3 py-2 ${
                      active ? "bg-orange-200 text-orange-600" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.label}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
              {showLastOption ? (
                <Listbox.Option className="py-1.5 hover:bg-orange-200 hover:text-orange-600">
                  <span className="relative cursor-default select-none px-3 py-2">
                    Clear category
                  </span>
                </Listbox.Option>
              ) : null}
            </Listbox.Options>
          </Headless>
        </div>
      </Listbox>
    </div>
  );
};

export default CategoryDropDown;
