"use client";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  if (!open) return null;

  useEffect(() => {
    ref.current = document.querySelector("#modal");
  }, []);

  return (
    ref.current &&
    ReactDOM.createPortal(
      <>
        <div
          onClick={onClose}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
        >
          {children}
        </div>
      </>,
      ref.current
    )
  );
};

export default Modal;
