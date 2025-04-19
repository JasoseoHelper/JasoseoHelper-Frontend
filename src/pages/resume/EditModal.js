import React from "react";
import "./Modal.css";

const EditModal = ({ isOpen, onClose, onSave, formData, setFormData, mode = "edit" }) => {
    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClickOutside = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box" onClick={handleClickOutside}>
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <h3>{mode === "edit" ? "자소서 수정" : "자소서 추가"}</h3>
                <div>
                    <label>공고명</label>
                    <input name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div>
                    <label>마감일</label>
                    <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
                </div>
                <div className="modal-buttons">
                    <button className="cancel" onClick={onClose}>취소</button>
                    <button className="save" onClick={onSave}>저장</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
