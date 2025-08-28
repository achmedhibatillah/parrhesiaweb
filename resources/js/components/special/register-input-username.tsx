// SpecialRegisterInputUsername.jsx
import { useState, useEffect } from "react";
import axios from "axios";

import InputText from "../input-text";
import InputError from "../input-error";

export default function SpecialRegisterInputUsername({ formik, disabled }) {
  const [usernameStatus, setUsernameStatus] = useState(null);

  const username = formik.values.user_username;

  useEffect(() => {
    if (username.length === 0) {
      setUsernameStatus(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axios.post("/register-check-username", { username });
        setUsernameStatus(res.data.status);
      } catch (err) {
        setUsernameStatus(null);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [username]);

  return (
    <div className="mb-3">
      <InputText
        placeholder="Masukkan username Anda"
        id="user_username"
        name="user_username"
        value={username}
        onChange={(e) => {
          let value = e.target.value;

          // hapus karakter ilegal
          value = value.replace(/[^a-zA-Z0-9-_.]/g, "");

          // huruf harus pertama
          if (value.length > 0 && !/^[a-zA-Z]/.test(value[0])) value = value.slice(1);

          // max 21 karakter
          if (value.length > 21) value = value.slice(0, 21);

          formik.setFieldValue("user_username", value);
        }}
        onKeyDown={(e) => {
          if (e.key === " ") e.preventDefault();
          if (!/^[a-zA-Z0-9-_.]$/.test(e.key) && e.key.length === 1) e.preventDefault();
          if (formik.values.user_username.length === 0 && !/^[a-zA-Z]$/.test(e.key)) e.preventDefault();
        }}
        onBlur={formik.handleBlur}
        className="bg-amber-100"
        disabled={disabled}
      />

      <div className="text-sm text-gray-500 mt-1">
        {username.length} / 21 karakter
      </div>

      {usernameStatus === "available" && (
        <div className="text-green-600 text-sm mt-1">Username tersedia <i className="fas fa-check-circle"></i></div>
      )}
      {usernameStatus === "not-available" && (
        <div className="text-red-500 text-sm mt-1">Username tersedia <i className="fas fa-exclamation-circle"></i></div>
      )}

      {formik.errors.user_username && formik.touched.user_username && (
        <InputError>{formik.errors.user_username}</InputError>
      )}
    </div>
  );
}
