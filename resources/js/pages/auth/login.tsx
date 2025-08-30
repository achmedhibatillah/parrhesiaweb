import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import AuthLayout from "@/layouts/auth-layout"
import InputTextAuth from "@/components/input-text-auth"
import InputPasswordAuth from "@/components/input-password-auth"
import Button from "@/components/button"
import InputError from "@/components/input-error"
import InputCheckboxOne from "@/components/input-checkbox-one"

export default function Login({ email = '' }) {
  const [responseLogin, setResponseLogin] = useState<{ type: string; text: string } | null>(null)
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      user_email: email,
      user_pass: "",
      login_keepsession: false
    },
    validationSchema: Yup.object({
      user_email: Yup.string()
        .required("bagian ini wajib diisi"),
      user_pass: Yup.string()
        .required("bagian ini wajib diisi"),
      login_keepsession: Yup.boolean()
    }),
    onSubmit: async (values) => {
      setLoadingLogin(true)
      setResponseLogin(null)

      try {
        const { data } = await axios.post("/login", values)
        switch (data.status) {
          case "success":
            setResponseLogin({ type: "success", text: "Autentikasi berhasil." })
            setShowSuccess(true)
            setTimeout(() => {
              window.location.href = "/portal"
            }, 5000);
            break 
          case "error":
            setResponseLogin({ type: "error", text: "Autentikasi gagal." })
            break
          default:
            setResponseLogin({ type: "server", text: "Terjadi error di server." })
        }
      } catch {
        setResponseLogin({ type: "server", text: "Server tidak merespon." })
      } finally {
        setLoadingLogin(false)
      }
    }
  })

  const renderMessageLogin = () => {
    if (responseLogin?.type === "success") {
      return (
        <div className="text-green-500 text-center">
          <div>
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="leading-2">
            <p className="text-lg">{responseLogin?.text}</p>
            <p>Tunggu beberapa saat.</p>
          </div>
        </div>
      )
    }
  }

  return (
      <AuthLayout>            
        <p className="text-blue-400 font-bold text-3xl text-center">Hello! <i className="text-blue-900">Welcome</i><i className="text-blue-900 not-italic">.</i></p>
        <p className="text-center text-gray-600 leading-4 mt-2 mb-4">Silakan masuk menggunakan akun Anda</p>
        {renderMessageLogin()}
        <hr className="mt-7 mb-5" />
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <InputTextAuth type="text"
                    icon="user"
                    id="user_email" name="user_email"
                    placeholder="Username atau email"
                    value={formik.values.user_email}
                    onChange={formik.handleChange}
                    disabled={loadingLogin || showSuccess}
                />
                {formik.errors.user_email && formik.touched.user_email && (
                    <InputError>{formik.errors.user_email}</InputError>
                )}
            </div>
            <div className="mb-3">
                <InputPasswordAuth
                    icon="key"
                    id="user_pass" name="user_pass"
                    placeholder="Password"
                    value={formik.values.user_pass}
                    onChange={formik.handleChange}
                    disabled={loadingLogin || showSuccess}
                />
                {formik.errors.user_pass && formik.touched.user_pass && (
                  <InputError>{formik.errors.user_pass}</InputError>
                )}
            </div>
            <div className="mb-3">
              <InputCheckboxOne
                id="login_keepsession"
                name="login_keepsession"
                checked={formik.values.login_keepsession} 
                onChange={formik.handleChange}
                disabled={loadingLogin || showSuccess}
                label="Pertahankan sesi login"
              />
            </div>
            <Button disabled={loadingLogin || showSuccess}  className="py-2 bg-blue-200 hover:bg-blue-300 border-gray-800 w-[100%] mt-3 shadow-sm/20" type="submit">
                {(loadingLogin || showSuccess) ? 'Loading...' : 'Submit'}
            </Button>
        </form>
        <div className="grid grid-cols-7 my-5">
          <div className="col-span-3 pt-2"><hr /></div>
          <div className="col-span-1 flex justify-center items-center text-gray-500">ATAU</div>
          <div className="col-span-3 pt-2"><hr /></div>
        </div>
        <Button disabled={loadingLogin || showSuccess} tag="a" link="/register" className="py-2 bg-gray-100 hover:bg-gray-200 border-gray-800 w-[100%] shadow-sm/20">
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