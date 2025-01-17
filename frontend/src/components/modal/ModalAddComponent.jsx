
import { useState } from "react";
import style from './create.module.scss';

export const ModalAddComponent = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ title: "", body: "" });
    const [error, setError] = useState(""); // Для отображения ошибки

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.body.trim()) {
            setError("Please fill out all fields");
            return;
        }

        setError(""); // Сбросить ошибку, если поля корректны
        try {
            await onSubmit(formData);
            setFormData({ title: "", body: "" });
            onClose(); // Закрыть окно только если запрос успешен
        } catch (err) {
            console.error('Error submitting form:', err);
            setError("Failed to submit, please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <h3 className={style.title}>Create post</h3>
                <div className={style.formContent}>
                    <button className={style.closeButton} onClick={onClose}>
                        &times;
                    </button>
                    <form onSubmit={handleSubmit}>
                        <input
                            className={style.inputField}
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Title"
                        />
                        <label htmlFor="body">Content</label>
                        <textarea
                            className={style.textField}
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            required
                            placeholder="Body"
                        />
                        {error && <div className={style.error}>{error}</div>}
                        <div className={style.modalActions}>
                            <button type="button" onClick={onClose} className={style.btn}>Cancel</button>
                            <button type="submit" className={style.btn}>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
