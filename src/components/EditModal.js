// components/EditModal.js
import React, { useRef, useState } from 'react';
import { editVideo } from '../api/api';
import { X } from 'lucide-react';
import '../styles/css/Modal.css';

const EditModal = ({ show, onClose, onVideoEdited, video }) => {
    const modalRef = useRef();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            // Clear state and close modal
            setTitle('');
            setDescription('');
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const editedVideo = {
            video_id: video.id,
            description: description,
            title: title,
        };
        await editVideo(editedVideo);
        onVideoEdited();
        setTitle('');
        setDescription('');
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-background" ref={modalRef} onClick={closeModal}>
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">Edit your video</div>
                    <button className="modal-close" onClick={onClose}><X /></button>
                </div>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">New Title:</label>
                        <input
                            className="form-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">New Description:</label>
                        <textarea
                            className="form-input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button className="btn-submit">Edit Video</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
