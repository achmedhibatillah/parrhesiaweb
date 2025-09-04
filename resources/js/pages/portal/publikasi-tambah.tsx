import { useEffect, useState } from "react";
import slugify from "slugify";
import { Descendant } from "slate";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import debounce from "lodash.debounce";

import PortalLayout from "@/layouts/portal-layout";
import InputDropdown from "@/components/input-dropdown";
import InputText from "@/components/input-text";
import InputTextBottomBorder from "@/components/input-text-border-bottom";
import InputSuccess from "@/components/input-success";
import InputError from "@/components/input-error";
import Button from "@/components/button";
import InputTextExtra from "@/components/input-text-extra";
import PpCircle from "@/components/pp-circle";
import UserSearchDropdown from "@/components/user-search";

export default function PortalIndex({ userdata, pagenow, postcategory, postdata }) {
  const [requestForm, setRequestForm] = useState<{ type: string; text: string } | null>(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [successForm, setSuccessForm] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [successDraft, setSuccessDraft] = useState(false);

  const options = postcategory.map((cat) => ({
    value: cat.postcategory_id,
    label: cat.postcategory_name,
  }));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      post_id: postdata?.post_id || "",
      postcategory_id: postdata?.postcategory_id || "",
      post_title: postdata?.post_title || "",
      post_slug: postdata?.post_slug || "",
      post_description: postdata?.post_description || "",
      post_content: postdata?.post_content
        ? JSON.parse(postdata.post_content)
        : [{ type: "paragraph", children: [{ text: "" }] }],
    },

    validationSchema: Yup.object({
      postcategory_id: Yup.string().required("Bagian ini wajib diisi"),
      post_title: Yup.string()
        .required("Bagian ini wajib diisi")
        .min(10, "Minimal 10 karakter")
        .max(120, "Maksimal 120 karakter"),
      post_slug: Yup.string()
        .required("Bagian ini wajib diisi")
        .min(10, "Minimal 10 karakter")
        .max(150, "Maksimal 150 karakter"),
    }),
    onSubmit: async (values) => {
      setLoadingForm(true);
      setSuccessForm(false);
      setRequestForm(null);
      try {
        await axios.post("/publikasi/save", values);
        setSuccessForm(true);
      } catch {
        setRequestForm({ type: "server", text: "Server tidak merespon." });
      } finally {
        setLoadingForm(false);
      }
    },
  });

  // autosave draft
  useEffect(() => {
    const autosave = debounce(async (values) => {
      try {
        setLoadingDraft(true);
        const { data } = await axios.post("/publikasi/save-draft", values);

        if (data.post_id && data.post_id !== formik.values.post_id) {
          formik.setFieldValue("post_id", data.post_id, false);
        }

        setSuccessDraft(true);
        setTimeout(() => setSuccessDraft(false), 2000);
      } catch (err) {
        console.error("Gagal simpan draft", err);
      } finally {
        setLoadingDraft(false);
      }
    }, 1000);

    autosave(formik.values);
    return autosave.cancel;
  }, [formik.values]);

  // auto slug dari title
  useEffect(() => {
    const title = formik.values.post_title || "";
    const slug = slugify(title, { lower: true, strict: true });
    formik.setFieldValue("post_slug", slug);
  }, [formik.values.post_title]);

  // contributors
  const [contributors, setContributors] = useState([]);
  const [loadingContrib, setLoadingContrib] = useState(true);

  const fetchContributors = async () => {
    try {
      setLoadingContrib(true);
      const { data } = await axios.post("/publikasi/contributor/get", {
        post_id: postdata?.post_id,
      });
      setContributors(data);
    } catch (err) {
      console.error("Gagal fetch contributor", err);
    } finally {
      setLoadingContrib(false);
    }
  };

  useEffect(() => {
    if (postdata?.post_id) {
      fetchContributors();
    }
  }, [postdata?.post_id]);

  const initiator = contributors.filter((item) => item.relation_isinitiator === 1);
  const others = contributors.filter((item) => item.relation_isinitiator === 0);

  const [contributorScc, setContributorScc] = useState(false);
  const [contributorErr, setContributorErr] = useState(false);
  const [contributorDgr, setContributorDgr] = useState(false);
  const handleAddContributor = async (selected) => {
    try {
      const { data } = await axios.post("/publikasi/contributor/add", {
        user_id: selected.value,
        post_id: postdata?.post_id,
      });

      if (data.status === "success") {
        setContributorScc(true);
        setTimeout(() => setContributorScc(false), 2000);
        fetchContributors();
      } else if (data.status === "danger") {
        setContributorDgr(true);
        setTimeout(() => setContributorDgr(false), 2000);
        fetchContributors();
      }
    } catch (err) {
      setContributorErr(true);
      setTimeout(() => setContributorErr(false), 2000);
    }
  };

  const [contributorRmvScc, setContributorRmvScc] = useState(false);
  const [contributorRmvErr, setContributorRmvErr] = useState(false);
  const handleRmvContributor = async (user_id) => {
    try {
      const { data } = await axios.post("/publikasi/contributor/rmv", {
        user_id: user_id,
        post_id: postdata?.post_id,
      });

      if (data.status === "success") {
        setContributorRmvScc(true);
        setTimeout(() => setContributorRmvScc(false), 2000);
        fetchContributors();
      }
    } catch (err) {
      setContributorRmvErr(true);
      setTimeout(() => setContributorErr(false), 2000);
    }
  };

  return (
    <PortalLayout userdata={userdata} pagenow={pagenow}>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4 grid grid-cols-2">
          <div>
            <div>Kategori publikasi:</div>
            <div>
              <InputDropdown
                id="postcategory_id"
                name="postcategory_id"
                placeholder="Pilih kategori..."
                options={options}
                value={options.find((o) => o.value === formik.values.postcategory_id) || null}
                onChange={(selected) => {
                  formik.setFieldValue("postcategory_id", selected.value);
                }}
                disabled={loadingForm || successForm}
              />
              {formik.errors.postcategory_id && formik.touched.postcategory_id && (
                <InputError>{formik.errors.postcategory_id}</InputError>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            {loadingDraft && (
              <span className="text-blue-600">
                <i className="fas fa-spinner me-1"></i>Menyimpan draft...
              </span>
            )}
            {successDraft && (
              <span className="text-green-600">
                <i className="fas fa-check-circle me-1"></i>Draft tersimpan
              </span>
            )}
            {loadingForm && (
              <span className="text-blue-800">
                <i className="fas fa-spinner me-1"></i>Menyimpan final...
              </span>
            )}
            {successForm && (
              <span className="text-green-800">
                <i className="fas fa-check-circle me-1"></i>Berhasil submit
              </span>
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
          {formik.errors.post_title && formik.touched.post_title && (
            <InputError>{formik.errors.post_title}</InputError>
          )}
        </div>

        <div className="mb-3">
          <div className="w-1/2">
            <div className="relative">
              <InputText
                id="post_slug"
                name="post_slug"
                placeholder=""
                value={formik.values.post_slug}
                onChange={formik.handleChange}
                disabled={loadingForm || successForm}
                className="text-xs text-gray-500 h-6 ps-9"
                isSlug={true}
              />
              <div className="absolute text-[10px] translate-y-[-130%] left-2 text-gray-400">
                Slug :
              </div>
            </div>
          </div>
          {formik.errors.post_slug && formik.touched.post_slug && (
            <InputError>{formik.errors.post_slug}</InputError>
          )}
        </div>

        <div className="mb-3">
          <InputText
            id="post_description"
            name="post_description"
            placeholder="Headline publikasi. Maks 300 karakter."
            value={formik.values.post_description}
            onChange={formik.handleChange}
            disabled={loadingForm || successForm}
            entered={true}
            className="text-xs"
          />
          {formik.errors.post_description && formik.touched.post_description && (
            <InputError>{formik.errors.post_description}</InputError>
          )}
        </div>

        <div className="mb-3">
          <InputTextExtra
            height={430}
            userdata={userdata}
            name="post_content"
            inputValue={formik.values.post_content}
            onChange={(value: Descendant[]) => formik.setFieldValue("post_content", value)}
            disabled={loadingForm || successForm}
          />
        </div>

        {/* contributors */}
        <div className="mb-3">
          <div className="mb-1">
            {initiator.length > 0 &&
              initiator.map((item) => (
                <div key={item.user_id}>
                  <p className="text-gray-400 text-xs">Kontributor inisiator :</p>
                  <div className="flex items-center gap-1">
                    <PpCircle pp={item.userdt_pp} size="sm" />
                    <div className="leading-4.5 text-xs">
                      <p className="text-amber-900 -mb-1.5">{item.user_username}</p>
                      <p className="text-gray-500 m-0">{item.user_fullname}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div>
            <p className="text-gray-400 text-xs">Kontributor lainnya :</p>
            {contributorRmvScc && <InputSuccess>Berhasil menghapus kontributor</InputSuccess>}
            {contributorRmvErr && <InputError>Terjadi error server</InputError>}
            {loadingContrib ? (
                <p className="text-gray-400 text-xs">Memuat kontributor...</p>
            ) : others.length > 0 ? (
            others.map(item => (
                <div key={item.user_id}>
                    <div className="flex gap-2">
                        <div className="flex items-center">
                            <div className="rounded-full w-4 h-4 text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer flex justify-center items-center" onClick={() => handleRmvContributor(item.user_id)}>-</div>
                        </div>
                        <div className="flex items-center gap-1">
                            <PpCircle pp={item.userdt_pp} size="sm" />
                            <div className="leading-4.5 text-xs">
                            <p className="text-amber-900 -mb-1.5">{item.user_username}</p>
                            <p className="text-gray-500 m-0">{item.user_fullname}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            ) : (
                <p>-</p>
            )}
          </div>
        </div>

        <div className="mt-3">
          <UserSearchDropdown
            onSelect={handleAddContributor}
            placeholder="Tambah kontributor..."
            className="text-xs"
            disabled={loadingForm || successForm}
          />
          {contributorScc && <InputSuccess>Berhasil menambah kontributor</InputSuccess>}
          {contributorDgr && <InputError>Kontributor sudah ditambah sebelumnya</InputError>}
          {contributorErr && <InputError>Terjadi error server</InputError>}
        </div>

        <div>
          <Button
            disabled={loadingForm}
            className="py-2 w-30 bg-red-800 hover:bg-red-900 text-white border-gray-800 mt-3 shadow-sm/20"
            type="submit"
          >
            {loadingForm ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </PortalLayout>
  );
}
