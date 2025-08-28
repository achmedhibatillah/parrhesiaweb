import React, { useState, useRef } from 'react';

export default function InputOTP({
  length = 6,
  name = '',
  id = '',
  value = '',
  onChange,
  disabled = false,
}) {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, ''); // hanya angka

    const newValues = [...values];
    newValues[idx] = val;
    setValues(newValues);

    // auto next focus kalau ada isi
    if (val && idx < length - 1) {
      inputsRef.current[idx + 1].focus();
    }

    if (onChange) {
      onChange(newValues.join(''));
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (values[idx]) {
        // hapus isi kotak sekarang
        const newValues = [...values];
        newValues[idx] = '';
        setValues(newValues);
        if (onChange) {
          onChange(newValues.join(''));
        }
      } else if (idx > 0) {
        // kalau kosong, pindah ke kotak sebelumnya
        inputsRef.current[idx - 1].focus();
      }
    }
  };

  return (
    <div className="grid grid-cols-6">
      {values.map((val, idx) => (
        <input
          key={idx}
          ref={(el) => (inputsRef.current[idx] = el)}
          type="text"
          maxLength="1"
          value={val}
          disabled={disabled}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className={`col w-[95%] h-10 text-center text-lg
            border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-indigo-300 focus:border-indigo-300
            transition-colors duration-200
            ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-400' : ''}
          `}
        />
      ))}
      {/* hidden input untuk gabung value OTP */}
      <input type="hidden" name={name} value={values.join('')} />
    </div>
  );
}
