import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import Container from "@/templates/container"
import InputText from "@/components/input-text"
import InputOtp from "@/components/input-otp"
import Button from "@/components/button"
import InputError from "@/components/input-error"
import Modal from "@/components/modal"
import Timer from "@/components/timer"
import InputPassword from "@/components/input-password"
import SpecialRegisterInputUsername from "@/components/special/register-input-username"
import SpecialRegisterInputFullname from "@/components/special/register-input-fullname"
import SpecialRegisterInputPassword from "@/components/special/register-input-password"

export default function Login() {
  const [sessionTimer, setSessionTimer] = useState<{ type: string; text: string } | null>(null)

  const [responseEmail, setResponseEmail] = useState<{ type: string; text: string } | null>(null)
  const [loadingEmail, setLoadingEmail] = useState(false)

  const [responseOtp, setResponseOtp] = useState<{ type: string; text: string } | null>(null)
  const [loadingOtp, setLoadingOtp] = useState(false)

  const [responseIdentity, setResponseIdentity] = useState<{ type: string; text: string } | null>(null)
  const [loadingIdentity, setLoadingIdentity] = useState(false)

  const [showSuccess, setShowSuccess] = useState(false);

  const formikEmail = useFormik({
    initialValues: { user_email: "" },
    validationSchema: Yup.object({
      user_email: Yup.string()
        .required("Bagian ini wajib diisi")
        .email("Format email tidak benar"),
    }),
    onSubmit: async (values) => {
      setLoadingEmail(true)
      setResponseEmail(null)
      setSessionTimer(null)

      try {
        const { data } = await axios.post("/register-email", values)
        switch (data.status) {
          case "success":
            setResponseEmail({ type: "success", text: "Berhasil mengirim kode OTP. Silakan cek email Anda." })
            setSessionTimer({ type: "success", text: data.created_at })
            break 
          case "danger":
            setResponseEmail({ type: "danger", text: "Kode OTP sudah terkirim sebelumnya, harap cek kembali dashboard email Anda atau tunggu 5 menit untuk mendapat kode OTP baru" })
            setSessionTimer({ type: "success", text: data.created_at })
            break
          case "error-email":
            setResponseEmail({ type: "error", text: "Email sudah terdaftar" })
            break
          default:
            setResponseEmail({ type: "server", text: "Terjadi error di server" })
        }
      } catch {
        setResponseEmail({ type: "server", text: "Server tidak merespon" })
      } finally {
        setLoadingEmail(false)
      }
    }
  })

  const isDisabledEmail = responseEmail?.type === "success" || responseEmail?.type === "danger"

  const renderMessageEmail = () => {
    if (!responseEmail) return null
    let icon = "fa-circle-info"
    let color = "text-gray-600"

    if (responseEmail.type === "success") {
      icon = "fa-check-circle"
      color = "text-green-600"
    }
    if (responseEmail.type === "danger") {
      icon = "fa-exclamation-triangle"
      color = "text-yellow-600"
    }
    if (responseEmail.type === "error") {
      icon = "fa-times-circle"
      color = "text-red-600"
    }
    if (responseEmail.type === "server") {
      icon = "fa-server"
      color = "text-red-800"
    }

    return (
      <div>
        <div className={`mt-3 text-sm font-medium flex items-center gap-2 ${color}`}>
          <i className={`fas ${icon} ms-2`}></i>
          <span className="leading-4">{responseEmail.text}</span>
        </div>
      </div>
    )
  }

  const renderSession = () => {
    if (!responseEmail) return null
  
    if (responseEmail.type === "success" || responseEmail.type === "danger") {
      return (
        <div className="mt-5">
          <hr />
          <p className="mt-5 text-center">Masa berlaku kode OTP :</p>
          <Timer createdAt={sessionTimer?.text} />
          <hr className="mt-8" />
        </div>
      )
    }
  
    return null
  }  

  const formikOtp = useFormik({
    initialValues: {
      user_otp: ""
    },
    validationSchema: Yup.object({
      user_otp: Yup.string()
        .required("Bagian ini wajib diisi.")
    }),
    onSubmit: async (values) => {
      setLoadingOtp(true);
      setResponseOtp(null);
  
      try {
        const payload = {
          user_otp: values.user_otp,
          user_email: formikEmail.values.user_email,
        };
  
        const { data } = await axios.post("/register-otp", payload);
  
        switch (data.status) {
          case "success":
            setResponseOtp({ type: "success", text: "Kode OTP benar." });
            break;
          case "danger-1":
            setResponseOtp({ type: "danger", text: "Kode OTP salah. Tersisa 1 kali percobaan lagi." });
            break;
          case "danger-2":
            setResponseOtp({ type: "danger", text: "Kode OTP salah. Tersisa 2 kali percobaan lagi." });
            break;
          case "danger-3":
            setResponseOtp({ type: "danger", text: "Kode OTP salah. Tersisa 3 kali percobaan lagi." });
            break;
          case "error-email":
            setResponseOtp({ type: "error", text: "Email tidak teregistrasi di OTP server. Silakan ulang registrasi." });
            break;
          case "error-expired":
            setResponseOtp({ type: "error", text: "Sesi registrasi untuk email ini telah habis. Silakan ulang registrasi." });
            break;
          case "error-trial":
            setResponseOtp({ type: "error", text: "Percobaan telah habis. Silakan ulang registrasi." });
            break;
          case "error-end":
            setResponseOtp({ type: "error", text: "Kode OTP salah. Silakan ulang registrasi." });
            break;
          default:
            setResponseOtp({ type: "server", text: "Terjadi error di server." });
        }
      } catch {
        setResponseOtp({ type: "server", text: "Server tidak merespon." });
      } finally {
        setLoadingOtp(false);
      }
    }
  });
  
  const renderMessageOtp = () => {
    if (!responseOtp) return null;
  
    let icon = "fa-circle-info";
    let color = "text-gray-600";
  
    if (responseOtp.type === "success") {
      icon = "fa-check-circle";
      color = "text-green-600";
    } else if (responseOtp.type === "danger") {
      icon = "fa-exclamation-triangle";
      color = "text-yellow-600";
    } else if (responseOtp.type === "error") {
      icon = "fa-times-circle";
      color = "text-red-600";
    } else if (responseOtp.type === "server") {
      icon = "fa-server";
      color = "text-red-800";
    }
  
    return (
      <div>
        <div className={`mt-3 text-sm font-medium flex items-center gap-2 ${color}`}>
          <i className={`fas ${icon} ms-2`}></i>
          <span className="leading-4">{responseOtp.text}</span>
        </div>
      </div>
    );
  };
  
  const isDisabledOtp = responseOtp?.type === "success"

  const formikIdentity = useFormik({
    initialValues: {
      user_username: "",
      user_fullname: "",
      user_password: "",
      user_password2: ""
    },
    validationSchema: Yup.object({
      user_username: Yup.string()
        .required("Bagian ini wajib diisi.")
        .min(7, "Minimal 7 karakter.")
        .max(21, "Maksimal 21 karakter.")
        .matches(/^[a-zA-Z][a-zA-Z0-9-_.]*$/, "Username harus diawali huruf dan hanya boleh huruf, angka, '-', '_', atau '.'"),
      user_fullname: Yup.string()
        .required("Bagian ini wajib diisi.")
        .max(64, "Maksimal 64 karakter")
        .matches(/^[a-zA-Z][a-zA-Z\s,.-]*$/, "Nama lengkap harus diawali huruf dan hanya boleh huruf, spasi, ',', '.', '-'"),
      user_password: Yup.string()
        .required("Bagian ini wajib diisi.")
        .min(8, "Password minimal 8 karakter")
        .max(40, "Password maksimal 40 karakter")
        .matches(/[A-Z]/, "Password harus mengandung huruf besar")
        .matches(/[a-z]/, "Password harus mengandung huruf kecil")
        .matches(/[0-9]/, "Password harus mengandung angka")
        .matches(/[^a-zA-Z0-9]/, "Password harus mengandung karakter khusus"),
      user_password2: Yup.string()
        .required("Bagian ini wajib diisi.")
        .oneOf([Yup.ref('user_password'), null], "Konfirmasi password harus sama dengan password")
    }),
    onSubmit: async (values) => {
      setLoadingIdentity(true);
      setResponseIdentity(null);
  
      try {
        const payload = {
          user_username: values.user_username,
          user_fullname: values.user_fullname,
          user_password: values.user_password,
          user_email: formikEmail.values.user_email,
        };
  
        const { data } = await axios.post("/register-complete", payload);
  
        setLoadingIdentity(false);
  
        if (data.status === "success") {
          setShowSuccess(true);
  
          setTimeout(() => {
            setShowSuccess(false);
            window.location.href = "/login?email=" + formikEmail.values.user_email;
          }, 5000);
        } else if (data.status === "error") {
          setResponseIdentity({ message: "Registrasi gagal. Periksa input Anda." });
        } else {
          setResponseIdentity({ message: "Terjadi kesalahan. Coba lagi." });
        }
  
      } catch (error) {
        setLoadingIdentity(false);
        setResponseIdentity({ message: "Terjadi kesalahan. Coba lagi." });
      }
    }
})

  const [isOpenModalUndoRegistration, setIsOpenModalUndoRegistration] = useState(false);

  return (
    <div className="py-15">
      <Container>
        
        {isDisabledEmail ?
          <a href="" className="mx-2 text-blue-500 hover:underline text-sm block mb-5" 
            onClick={(e) => {
              e.preventDefault();
              setIsOpenModalUndoRegistration(true);
            }}
          >
            <i className="fas fa-sync-alt text-[11px] mb-1 me-1"></i>
            ulang registrasi
          </a>
          : ""
        }
        <Modal
          isOpen={isOpenModalUndoRegistration}
          onClose={() => setIsOpenModalUndoRegistration(false)}
          title="Konfirmasi"
          footer={
            <>
              <Button onClick={() => setIsOpenModalUndoRegistration(false)} className="bg-gray-200 hover:bg-gray-300">Batal</Button>
              <Button onClick={() => window.location.reload()} className="bg-red-400 hover:bg-red-600 text-white">Yakin</Button>
            </>
          }
        >
          <p>Apakah Anda yakin ingin mengulang registrasi? Jika iya, Anda akan mengirim email kembali dan memasukkan kode OTP baru.</p>
        </Modal>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="mx-2">
            <div className="rounded-lg shadow-md/10 border border-gray-200 p-4 mb-4">
              <div className="mb-4">
                <form onSubmit={formikEmail.handleSubmit}>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="col-span-4">
                      <label htmlFor="user_email">Email</label>
                      <InputText
                        placeholder="Masukkan email Anda"
                        id="user_email"
                        name="user_email"
                        value={formikEmail.values.user_email}
                        onChange={formikEmail.handleChange}
                        onBlur={formikEmail.handleBlur}
                        disabled={loadingEmail || isDisabledEmail}
                      />
                    </div>
                    <div className="flex items-end pb-[1px] ps-1">
                      <Button
                        type="submit"
                        disabled={loadingEmail || isDisabledEmail}
                        className="h-[37px] bg-blue-200 hover:bg-blue-300 border-gray-800 w-[100%] shadow-sm/20"
                      >
                        {loadingEmail ? "Loading..." : "Submit"}
                      </Button>
                    </div>
                  </div>
                  {formikEmail.errors.user_email && formikEmail.touched.user_email && (
                    <InputError>{formikEmail.errors.user_email}</InputError>
                  )}
                </form>
                {(!isDisabledOtp) ?
                  renderMessageEmail() : ''
                }
                {(!isDisabledOtp) ?
                  renderSession() : ''
                }
              </div>
              <div className="mb-4">
                <form onSubmit={formikOtp.handleSubmit}>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="col-span-4">
                      <label htmlFor="user_otp">Kode OTP</label>
                      <InputOtp
                        name="user_otp"
                        id="user_otp"
                        value={formikOtp.values.user_otp}
                        onChange={(val) => formikOtp.setFieldValue('user_otp', val)}
                        disabled={!isDisabledEmail || loadingOtp || isDisabledOtp}
                      />
                    </div>
                    <div className="flex items-end pb-[1px] ps-1">
                      <Button
                        type="submit"
                        disabled={!isDisabledEmail || loadingOtp || isDisabledOtp}
                        className="h-[37px] bg-blue-200 hover:bg-blue-300 border-gray-800 w-[100%] shadow-sm/20"
                      >
                        {loadingOtp ? "Loading..." : "Submit"}
                      </Button>
                    </div>
                  </div>
                  {formikOtp.errors.user_otp && formikOtp.touched.user_otp && (
                    <InputError>{formikOtp.errors.user_otp}</InputError>
                  )}
                </form>
                {renderMessageOtp()}
              </div>
            </div>
            {(isDisabledEmail && isDisabledOtp) ?
              <div className="rounded-lg shadow-md/10 border border-gray-200 p-4 mb-4">
                <h1 className="text-3xl">Identitas</h1>
                <hr className="mt-3 mb-4" />
                <form onSubmit={formikIdentity.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="user_username">Username</label>
                    <SpecialRegisterInputUsername formik={formikIdentity} disabled={loadingIdentity || showSuccess} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="user_fullname">Nama lengkap</label>
                    <SpecialRegisterInputFullname formik={formikIdentity} disabled={loadingIdentity || showSuccess} />
                  </div>
                  <hr className="my-4" />
                  <div className="mb-3">
                    <SpecialRegisterInputPassword formik={formikIdentity} disabled={loadingIdentity || showSuccess} />
                  </div>
                  <Button
                    type="submit"
                    disabled={loadingIdentity || showSuccess}
                    className="h-[37px] bg-blue-200 hover:bg-blue-300 border-gray-800 w-[100%] shadow-sm/20"
                  >
                    {loadingIdentity ? "Loading..." : "Submit"}
                  </Button>
                </form>
                {loadingIdentity && <p>Memproses...</p>}
  
                {showSuccess && (
                  <div>
                    <div className="flex items-center justify-center text-center mt-6 text-green-600 text-2xl">
                      <i className="fas fa-check-circle me-1"></i>
                      Registrasi berhasil
                    </div>
                    <p className="text-center">Server sedang memproses. Tunggu beberapa saat.</p>
                  </div>
                )}
  
                {responseIdentity?.message && (
                  <div className="mt-6 text-red-600">{responseIdentity.message}</div>
                )}
              </div>
              : ''
            }
          </div>
          <div className="mx-2">{/* Kolom kedua kosong */}</div>
        </div>
      </Container>
    </div>
  )
}
