import React from 'react';

interface InputImageProps {
  name?: string;
  id?: string;
  className?: string;
  value?: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  accept?: string;
  placeholder?: string; // teks button
}

export default function InputImage({
  name,
  id,
  className = '',
  value,
  onChange,
  disabled = false,
  accept = "image/*,image/svg+xml",
  placeholder = 'Pilih file'
}: InputImageProps) {
  return (
    <div className={`${className} flex flex-col`}>
      <label
        htmlFor={id}
        className={`cursor-pointer block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
          bg-white text-gray-700 text-center
          hover:bg-gray-100
          focus:outline-none focus:ring-indigo-300 focus:border-indigo-300
          transition-colors duration-300
          ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-400' : ''}`}
      >
        {value ? value.name : placeholder}
      </label>
      <input
        type="file"
        name={name}
        id={id}
        accept={accept}
        disabled={disabled}
        onChange={onChange}
        className="hidden" // sembunyikan input asli
      />
    </div>
  );
}