import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import AuthLayout from "@/layouts/auth-layout"
import InputTextAuth from "@/components/input-text-auth"
import InputPasswordAuth from "@/components/input-password-auth"
import Button from "@/components/button"
import InputError from "@/components/input-error"

export default function Login({ email = '' }) {
  const formik = useFormik({
    initialValues: {
      user_email: email,
      user_password: "",
    },
    validationSchema: Yup.object({
      user_email: Yup.string()
        .required("bagian ini wajib diisi"),
      user_password: Yup.string()
        .required("bagian ini wajib diisi"),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  })
  return (
      <AuthLayout>            
        <p className="text-blue-400 font-bold text-3xl text-center">Hello! <i className="text-blue-900">Welcome</i><i className="text-blue-900 not-italic">.</i></p>
        <p className="text-center text-gray-600 leading-4 mt-2">Silakan masuk menggunakan akun Anda</p>
        <hr className="mt-3 mb-5" />
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <InputTextAuth type="text"
                    icon="user"
                    id="user_email" name="user_email"
                    placeholder="Username atau email"
                    value={formik.values.user_email}
                    onChange={formik.handleChange}
                />
                {formik.errors.user_email && formik.touched.user_email && (
                    <InputError>{formik.errors.user_email}</InputError>
                )}
            </div>
            <div className="mb-3">
                <InputPasswordAuth
                    icon="key"
                    id="user_password" name="user_password"
                    placeholder="Password"
                    value={formik.values.user_password}
                    onChange={formik.handleChange}
                />
                {formik.errors.user_password && formik.touched.user_password && (
                  <InputError>{formik.errors.user_password}</InputError>
                )}
            </div>
            <Button className="py-2 bg-blue-200 hover:bg-blue-300 border-gray-800 w-[100%] mt-3 shadow-sm/20" type="submit">Masuk</Button>
        </form>
        <div className="grid grid-cols-7 my-5">
          <div className="col-span-3 pt-2"><hr /></div>
          <div className="col-span-1 flex justify-center items-center text-gray-500">ATAU</div>
          <div className="col-span-3 pt-2"><hr /></div>
        </div>
        <Button tag="a" link="/register" className="py-2 bg-gray-100 hover:bg-gray-200 border-gray-800 w-[100%] shadow-sm/20">
          <div className="flex items-center">
            <img src="/storage/img/website/icon/google.svg" className="w-[16px] me-2" />
            <p>Masuk menggunakan Google</p>
          </div>
        </Button>
        <div className="mt-6">
          <p className="text-center">Belum memiliki akun? <a href="/register" className="text-blue-500 hover:underline font-bold">Registrasi di sini.</a></p>
        </div>
      </AuthLayout>
  )
} 