import React, { useState, useEffect } from "react";
import InputPassword from "../input-password";
import InputError from "../input-error";

export default function SpecialRegisterInputPassword({ formik, disabled }) {
  const password = formik.values.user_password;
  const confirmPassword = formik.values.user_password2;

  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false,
  });

  useEffect(() => {
    setChecks({
      length: password.length >= 8 && password.length <= 40,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password), // semua selain huruf dan angka
      match: password === confirmPassword && password.length > 0,
    });
  }, [password, confirmPassword]);  

  return (
    <div className="mb-4">
      <div className="mb-1">
        <p>{`Password`}</p>
        <InputPassword
          placeholder="Masukkan password Anda"
          id="user_password"
          name="user_password"
          value={password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={disabled}
        />
        {formik.errors.user_password && formik.touched.user_password && (
          <InputError>{formik.errors.user_password}</InputError>
        )}
      </div>

      <div className="mb-3">
        <InputPassword
          placeholder="Masukkan konfirmasi password"
          id="user_password2"
          name="user_password2"
          value={confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={disabled}
        />
        {formik.errors.user_password2 && formik.touched.user_password2 && (
          <InputError>{formik.errors.user_password2}</InputError>
        )}
      </div>

      <div className="text-sm mt-2 space-y-1 leading-3.5">
        <p className={checks.length ? "text-green-600" : "text-gray-500"}>
            • Minimal 8 dan maksimal 40 karakter
        </p>
        <p className={checks.uppercase ? "text-green-600" : "text-gray-500"}>
            • Huruf besar
        </p>
        <p className={checks.lowercase ? "text-green-600" : "text-gray-500"}>
            • Huruf kecil
        </p>
        <p className={checks.number ? "text-green-600" : "text-gray-500"}>
            • Angka
        </p>
        <div className={checks.special ? "text-green-600" : "text-gray-500"}>
            • Karakter khusus (!@#$%^&*(),.?":{}|&lt;&gt;)
        </div>
        <p className={checks.match ? "text-green-600" : "text-gray-500"}>
            • Konfirmasi password sesuai
        </p>
      </div>
    </div>
  );
}
