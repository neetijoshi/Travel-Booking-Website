"use client";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { DateRangePicker } from "react-date-range";

const formatPrice = (amount, currency) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const BookModal = ({ handleHideModal }) => {
  const [dateRange, setDateRange] = useState([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 1))
  ]);

  const selectionRange = {
    startDate: dateRange[0],
    endDate: dateRange[1],
    key: "selection",
  };

  const calcNights = () => {
    const startDate = dateRange[0];
    const endDate = dateRange[1];

    if (startDate && endDate) {
      const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 1;
    }
    return 1;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 backdrop-blur-md bg-black/40">
      <div className="bg-white w-[90%] md:w-[50%] lg:w-[35%] max-h-[98vh] rounded-lg shadow-xl p-5 flex flex-col gap-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
          <h3 className="font-semibold text-lg">Book your hotel</h3>
          <AiOutlineClose size={22} className="cursor-pointer" onClick={handleHideModal} />
        </div>

        {/* Hotel Name & Price */}
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Arabian Paradise</h2>
          <span className="text-gray-800 text-lg">{formatPrice(5500, "INR")}</span>
        </div>

        {/* Date Picker (Larger, No Scaling) */}
        <div className="flex justify-center">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            onChange={({ selection }) => setDateRange([selection.startDate, selection.endDate])}
          />
        </div>

        {/* Price & Submit Button Side by Side */}
        <div className="flex items-center justify-between border-t border-gray-300 pt-4">
          <div className="text-gray-700 text-lg font-semibold">
            {formatPrice(5500, "INR")} × {calcNights()} nights
            <div className="text-gray-900 text-xl font-bold">
              Total: {formatPrice(5500 * calcNights(), "INR")}
            </div>
          </div>

          <button className="rounded-lg py-3 px-6 text-lg text-white bg-blue-500 transition-all hover:bg-blue-600">
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookModal;

