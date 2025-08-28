import { useState } from "react";
import InputText from "./input-text";

export default function InputPassword({ name, id, placeholder, value, onChange, disabled }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <InputText
        type={showPassword ? "text" : "password"}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pe-10"
        disabled={disabled}
      />

      {/* Toggle Eye Button */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer w-[25px]"
      >
        {showPassword ? (
          <i className="fas fa-eye-slash"></i>
        ) : (
          <i className="fas fa-eye"></i>
        )}
      </button>
    </div>
  );
}
