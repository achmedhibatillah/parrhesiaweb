import { useState } from "react";
import InputText from "./input-text";

export default function InputTextAuth({ name, type, id, placeholder, value, onChange, icon, disabled }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <InputText
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="ps-8"
        disabled={disabled}
      />
      <i className={`absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 fas fa-${icon}`}></i>
    </div>
  );
}
