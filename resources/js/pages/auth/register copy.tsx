import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import Container from "@/templates/container"
import InputText from "@/components/input-text"
import Button from "@/components/button"
import InputError from "@/components/input-error"

export default function Login() {
  const formik = useFormik({
    initialValues: {
      user_email: "",
      user_password: "",
    },
    validationSchema: Yup.object({
      user_email: Yup.string()
        .required("bagian ini wajib diisi")
        .email("format email tidak benar"),
      user_password: Yup.string()
        .required("bagian ini wajib diisi"),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  const sendEmail = false
  const otpValid = false

  return (
    <div className="py-15">
      <Container>
        {sendEmail ? (
          <div>
            
          </div>
        ) : (
          <div>

          </div>
        )}
        
        <div className="grid grid-cols-2">
          <div className="mx-2">
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-5">
                  <div className="col-span-4">
                    <label htmlFor="user_email">Email</label>
                    <InputText placeholder="Masukkan email Anda" 
                      id="user_email"
                      name="user_email" 
                      value={formik.values.user_email}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="flex items-end pb-[1px] ps-1">
                    <Button type="submit" className="h-[37px] bg-blue-200 hover:bg-blue-300 border-gray-800 w-[100%] shadow-sm/20">Submit</Button>
                  </div>
                </div>
                {formik.errors.user_email && formik.touched.user_email && (
                  <InputError>{formik.errors.user_email}</InputError>
                )}
              </form>
          </div>
          <div className="mx-2">
            lorem
          </div>
        </div>
      </Container>
    </div>
  )
} 