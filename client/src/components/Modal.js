import React from "react";
import "./Modal.css";
import { motion } from "framer-motion";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const overlay = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  const modal = {
    hidden: { y: "-50vh", opacity: 0 },
    show: { y: "0", opacity: 1, transition: { delay: 0.5 } }
  };

  return (
    <motion.div
      className="modal-overlay"
      variants={overlay}
      initial="hidden"
      animate={isOpen ? "show" : "hidden"}
      transition={{ duration: 0.5 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        variants={modal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
