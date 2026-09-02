import React, { useEffect } from "react";
import "./Modal.css";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "medium"
}) {

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className={`modal-container modal-${size}`}
      >

        <div className="modal-header">

          <h2>{title}</h2>

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>

        </div>

        <div className="modal-body">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;