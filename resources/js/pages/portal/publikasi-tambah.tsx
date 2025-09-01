import { useState, useMemo } from "react";
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Descendant } from "slate";
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"

import PortalLayout from "@/layouts/portal-layout";
import InputDropdown from "@/components/input-dropdown";
import InputTextBottomBorder from "@/components/input-text-border-bottom";
import InputError from "@/components/input-error";
import Button from "@/components/button";
import InputTextExtra from "@/components/input-text-extra";

export default function PortalIndex({ userdata, pagenow, postcategory }) {

    const [requestForm, setRequestForm] = useState<{ type: string; text: string } | null>(null)
    const [loadingForm, setLoadingForm] = useState(false)
    const [successForm, setSuccessForm] = useState(false)

    const options = postcategory.map(cat => ({
        value: cat.postcategory_id,
        label: cat.postcategory_name
    }));

    const formik = useFormik({
        initialValues: {
            category_id: "",
            post_title: "",
        },
        validationSchema: Yup.object({
            category_id: Yup.string()
                .required("Bagian ini wajib diisi"),
            post_title: Yup.string()
                .required("Bagian ini wajib diisi")
                .min(10, "Minimal 10 karakter")
                .max(120, "Maksimal 120 karakter"),
        }),
        onSubmit: async (values) => {
            setLoadingForm(true)
            setRequestForm(null)
            try {
                const { data } = await axios.post("/login", values)
                switch (data.status) {
                    case "success":
                        setRequestForm({ type: "success", text: "Autentikasi berhasil." })
                        setTimeout(() => {
                            window.location.href = "/portal"
                        }, 5000);
                        break;
                    case "error":
                        setRequestForm({ type: "error", text: "Autentikasi gagal." })
                        break;
                    default:
                        setRequestForm({ type: "server", text: "Terjadi error di server." })
                }
            } catch {
                setRequestForm({ type: "server", text: "Server tidak merespon." })
            } finally {
                setLoadingForm(false)
            }
        }
    })

    return (
        <PortalLayout userdata={userdata} pagenow={pagenow}>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <div>Kategori publikasi:</div>
                    <div className="w-1/2">
                        <InputDropdown
                            id="category_id"
                            name="category_id"
                            placeholder="Pilih kategori..."
                            options={options}
                            value={options.find(o => o.value === formik.values.category_id) || null}
                            onChange={(selected) => {
                                formik.setFieldValue('category_id', selected.value);
                            }}
                        />
                        {formik.errors.category_id && formik.touched.category_id && (
                            <InputError>{formik.errors.category_id}</InputError>
                        )}
                    </div>
                </div>

                <div className="mb-3">
                    <InputTextBottomBorder
                        id="post_title"
                        name="post_title"
                        placeholder="Judul Publikasi"
                        value={formik.values.post_title}
                        onChange={formik.handleChange}
                        disabled={loadingForm || successForm}
                        className="text-2xl"
                    />
                </div>

                <div className="mb-3">
                    <InputTextExtra height={430} userdata={userdata}/>
                </div>

                <div className="">
                    <Button disabled={loadingForm} className="py-2 w-30 bg-red-800 hover:bg-red-900 text-white border-gray-800 mt-3 shadow-sm/20" type="submit"> {loadingForm ? 'Loading...' : 'Submit'}</Button>
                </div>
            </form>
        </PortalLayout>
    )
}
