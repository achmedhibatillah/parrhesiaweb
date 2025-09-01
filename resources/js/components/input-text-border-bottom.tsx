import React, { useState } from 'react';

export default function InputFloatingLabel({
    type = 'text',
    name,
    id,
    placeholder,
    value,
    onChange,
    disabled = false,
    onKeyDown,
    onBlur,
    className
}) {
    const [isFocused, setIsFocused] = useState(false);

    const shrinkLabel = isFocused || (value && value.length > 0);

    return (
        <div className="relative w-full">
            <input
                type={type}
                name={name}
                id={id}
                autoComplete="off"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onBlur={(e) => { setIsFocused(false); onBlur && onBlur(e); }}
                onFocus={() => setIsFocused(true)}
                disabled={disabled}
                className={`${className} block w-full px-0 pt-3 pb-1.5 border-b border-gray-300
                    focus:outline-none focus:border-indigo-500
                    transition-colors duration-200
                    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            <label
                htmlFor={id}
                className={`absolute left-0 text-gray-400 pointer-events-none
                    transition-all duration-200
                    ${shrinkLabel ? '-top-1 text-xs text-indigo-500' : 'top-5 text-gray-400 text-base'}`}
            >
                {placeholder}
            </label>
        </div>
    );
}
