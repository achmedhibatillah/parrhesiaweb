import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "../modal";
import Button from "../button";
import InputImage from "../input-image";
import InputError from "../input-error";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


interface ModalPostUploadImageProps {
  isModalOpen: boolean;
  onClose: () => void;
  insertImage: (url: string) => void;
  userId: string;
  cropMode?: "flex" | "square" | "rectangle"; // prop baru
}

export default function ModalPostUploadImage({
  isModalOpen,
  onClose,
  insertImage,
  userId,
  cropMode = "flex"
}: ModalPostUploadImageProps) {
  const cropperRef = useRef<Cropper>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { image: null as File | null },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .required("Silakan pilih file gambar")
        .test(
          "fileSize",
          "Ukuran maksimal 10 MB",
          value => !value || value.size <= 10240 * 1024
        )
        .test(
          "fileType",
          "Hanya format gambar yang diperbolehkan",
          value => !value || ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        )
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!values.image || !cropperRef.current) return;
    
      try {
        const canvas = cropperRef.current.cropper.getCroppedCanvas();
        if (!canvas) throw new Error("Crop gagal");
    
        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/jpeg")
        );
        if (!blob) throw new Error("Blob kosong");
    
        const formData = new FormData();
        formData.append("image", blob);
        formData.append("user_id", userId);
        formData.append("imageupload_access", "post-draft");
    
        const res = await fetch("/api/storeimage", { method: "POST", body: formData });
        const data = await res.json();
    
        if (res.ok && data.status === "success" && data.data) {
          insertImage(`${window.location.origin}/storage/${data.data.imageupload_path}`);
          resetCrop();
          resetForm();
          onClose();
        } else {
          console.error("Upload failed:", data);
        }
      } catch (err) {
        console.error("Upload error:", err);
      } finally {
        setSubmitting(false);
      }
    }    
  });

  const getAspect = () => {
    switch (cropMode) {
      case "square": return 1;
      case "rectangle": return 3 / 2;
      case "flex": default: return NaN; // cropperjs bebas resize
    }
  };

  const resetCrop = () => {
    setPreviewUrl(null);
    formik.resetForm();
  };

  const handleClose = () => {
    resetCrop();
    onClose();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Upload gambar"
      footer={
        <div className="flex justify-center gap-2 w-full">
          <Button type="button" className="w-30 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded" onClick={resetCrop}>
            Reset crop
          </Button>
          <Button type="button" className="w-30 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => formik.submitForm()} disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Uploading..." : "Upload"}
          </Button>
        </div>
      }
    >
      {!previewUrl && (
        <InputImage id="upload-image" name="image" accept="image/*" value={formik.values.image} onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            formik.setFieldValue("image", file);
            setPreviewUrl(URL.createObjectURL(file));
          }
        }} />
      )}

      {formik.errors.image && formik.touched.image && <InputError>{formik.errors.image}</InputError>}

      {previewUrl && (
        <div className="relative w-full h-64 bg-gray-200">
          <Cropper
            src={previewUrl}
            style={{ height: "100%", width: "100%" }}
            initialAspectRatio={getAspect()}
            aspectRatio={getAspect()}
            guides={true}
            cropBoxResizable={true}
            cropBoxMovable={true}
            zoomable={true}
            viewMode={1}
            ref={cropperRef}
          />
        </div>
      )}
    </Modal>
  );
}
