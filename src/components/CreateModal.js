// components/CreateModal.js
import React, { useRef, useState, useContext } from 'react'
import { createVideo } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { X } from 'lucide-react'
import '../styles/css/Modal.css'

const CreateModal = ({ onClose, onVideoCreated }) => {
    const { user } = useContext(AuthContext);
    const modalRef = useRef();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
  
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newVideo = {
            user_id: user?.username,
            description: description,
            title: title,
            video_url: url
        };
        await createVideo(newVideo);
        onVideoCreated();
        onClose();
        navigate('/');
    };

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    return (
        <div className="modal-background" ref={modalRef} onClick={closeModal}>
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">Add your new video!</div>
                    <button className="modal-close" onClick={onClose}><X /></button>
                </div>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Title:</label>
                        <input
                            className="form-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">URL:</label>
                        <input
                            className="form-input"
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description:</label>
                        <textarea
                            className="form-input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button className="btn-submit">Add Video</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateModal;
