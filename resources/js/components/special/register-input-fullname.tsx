// SpecialRegisterInputFullname.jsx
import React from "react";

import InputText from "../input-text";
import InputError from "../input-error";

export default function SpecialRegisterInputFullname({ formik, disabled }) {
  const fullname = formik.values.user_fullname;

  return (
    <div>
      <InputText
        placeholder="Masukkan nama lengkap Anda"
        id="user_fullname"
        name="user_fullname"
        value={fullname}
        onChange={(e) => {
          let value = e.target.value;

          value = value.replace(/[^a-zA-Z\s,.-]/g, "");

          if (value.length > 0 && !/^[a-zA-Z]/.test(value[0])) {
            value = value.slice(1);
          }

          if (value.length > 64) {
            value = value.slice(0, 64);
          }

          formik.setFieldValue("user_fullname", value);
        }}
        onKeyDown={(e) => {
          if (!/^[a-zA-Z\s,.-]$/.test(e.key) && e.key.length === 1) {
            e.preventDefault();
          }

          if (formik.values.user_fullname.length === 0 && !/^[a-zA-Z]$/.test(e.key)) {
            e.preventDefault();
          }
        }}
        onBlur={formik.handleBlur}
        disabled={disabled}
      />

      {formik.errors.user_fullname && formik.touched.user_fullname && (
        <InputError>{formik.errors.user_fullname}</InputError>
      )}
    </div>
  );
}
