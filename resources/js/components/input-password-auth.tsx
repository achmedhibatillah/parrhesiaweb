import { useState } from "react";
import InputText from "./input-text";

export default function InputPasswordAuth({ name, id, placeholder, value, onChange, icon }) {
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
        className="ps-8 pe-10"
      />
      <i className={`absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 fas fa-${icon}`}></i>
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer w-[25px]"
      >
        {showPassword ? (
          <i className="fas fa-eye-slash text-[12px]"></i>
        ) : (
          <i className="fas fa-eye text-[12px]"></i>
        )}
      </button>
    </div>
  );
}
