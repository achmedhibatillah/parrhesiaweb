import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  const [show, setShow] = useState(false);
  const [animateClass, setAnimateClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setAnimateClass("animate-pop-in");
    } else if (show) {
      setAnimateClass("animate-pop-out");
      const timer = setTimeout(() => setShow(false), 300); // durasi keluar
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div
        className={`relative bg-white rounded-lg shadow-lg max-w-md w-full mx-3 p-6 z-10 transform ${animateClass}`}
      >
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        )}
        <div className="mb-4">{children}</div>
        {footer && <div className="flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
