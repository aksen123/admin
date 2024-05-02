"use client";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  const [root, setRoot] = useState<Element | null>(null);
  useEffect(() => {
    const root = document.querySelector("#modal");
    root && setRoot(root);
  }, [open]);

  if (!open) return null;
  return (
    root &&
    ReactDOM.createPortal(
      <>
        <div
          onClick={onClose}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
        >
          {children}
        </div>
      </>,
      root as HTMLElement
    )
  );
};

export default Modal;
