import React, { useEffect, useRef } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const CustomDialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.bottom &&
      rect.left <= e.clientX &&
      e.clientX <= rect.right;

    if (!isInDialog) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={`fixed inset-0 z-50 m-auto max-h-[90vh] w-full max-w-lg rounded-lg border bg-white p-6 shadow-lg backdrop:bg-black/50 ${className}`}
      onClick={handleBackdropClick}
    >
      <div className="flex flex-col gap-4" onClick={handleContentClick}>
        {title && (
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              aria-label="Close dialog"
              className="rounded-full p-1 hover:bg-gray-100"
              onClick={onClose}
            >
              <svg
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
            </button>
          </div>
        )}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </dialog>
  );
};

export default CustomDialog;
