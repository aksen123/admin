"use client";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  const root = document.querySelector("#modal");

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
