import React from "react";

export default function InputCheckboxOne({
  className = "",
  name,
  id,
  checked = false,
  onChange,
  disabled = false,
  label = "",
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange({
        target: {
          name: e.target.name,
          value: e.target.checked,
        },
      });
    }
  };

  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 cursor-pointer select-none 
        ${disabled ? "cursor-not-allowed text-gray-400" : ""}`}
    >
      <span className="relative inline-flex items-center">
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={`${className} h-4 w-4 rounded-full border border-gray-300 
            appearance-none mb-0.5
            checked:bg-green-500 checked:border-green-500 
            focus:outline-none focus:ring-2 focus:ring-green-300
            transition-colors duration-200 cursor-pointer
            ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        />
        {checked && (
          <svg
            className="w-3 h-3 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
