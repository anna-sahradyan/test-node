import React from "react";
import style from "./modal.module.scss";
import { ModalContent } from "./ModalContent.jsx";

export const Modal = ({ isOpen, onClose, editData, setEditData, handleSaveChanges }) => {
    if (!isOpen) return null;

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <button className={style.closeButton} onClick={onClose}>
                    &times;
                </button>
                <ModalContent
                    setIsModalOpen={onClose}
                    editData={editData}
                    setEditData={setEditData}
                    handleSaveChanges={handleSaveChanges}
                />
            </div>
        </div>
    );
};
