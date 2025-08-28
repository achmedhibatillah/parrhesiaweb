import React from 'react';

export default function InputText({
    type = 'text',
    className = '',
    name,
    id,
    placeholder,
    value,
    onChange,
    disabled = false,
    onKeyDown,
    onBlur
}) {
    const inputType = type || 'text';

    return (
        <input
            type={inputType}
            name={name}
            id={id}
            autoComplete="off"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled} // apply disabled
            className={`${className} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-indigo-300 focus:border-indigo-300
                transition-colors duration-200
                ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
    );
}
