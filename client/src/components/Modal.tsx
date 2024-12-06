import React, { ReactNode } from "react";
import "../styles/Modal.css"; 

interface ModalProps {
  onClose: () => void; 
  children: ReactNode; 
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;


