import React, { useState, useRef, useEffect } from 'react';

export default function InputDropdown({
    options = [],
    className = '',
    name,
    id,
    placeholder = '',
    value,
    onChange,
    disabled = false,
    onSearchChange,
    renderOption // opsional: kalau mau custom styling per option
}) {
    const [search, setSearch] = useState(value?.label || '');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setSearch(value?.label || '');
    }, [value]);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (selected) => {
        setSearch(selected.label);
        onChange?.(selected); // kirim object lengkap
        setIsOpen(false);
    }    

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div className="relative">
                <input
                    type="text"
                    name={name}
                    id={id}
                    autoComplete="off"
                    placeholder={placeholder}
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value);
                        setIsOpen(true);

                        if (e.target.value === '') {
                            onChange?.({ value: '' });
                        }

                        onSearchChange?.(e.target.value); // trigger search change
                    }}
                    disabled={disabled}
                    className={`block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm
                        focus:outline-none focus:ring-indigo-300 focus:border-indigo-300
                        transition-colors duration-200
                        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                />

                {/* Panah FontAwesome */}
                <i
                    className={`fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2
                        transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
            </div>

            {isOpen && filteredOptions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.map(opt => (
                        <li
                            key={opt.value}
                            onClick={() => handleSelect(opt)}
                            className="cursor-pointer hover:bg-indigo-100 px-3 py-2"
                        >
                            {renderOption ? renderOption(opt) : opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
