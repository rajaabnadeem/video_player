// components/VideoList.js
import React, { useEffect, useState, useContext } from 'react';
import { getVideos } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import CreateModal from './CreateModal';
import CommentSection from './CommentSection';
import EditModal from './EditModal';
import ReactPlayer from 'react-player/youtube';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../styles/css/VideoList.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoCreated, setVideoCreated] = useState(false);
  const [editVideoId, setEditVideoId] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await getVideos(user?.username);
      setVideos(videos.videos);
    };

    fetchVideos();
  }, [user?.username, videoCreated]);

  const handleVideoCreated = () => {
    setVideoCreated(prev => !prev);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (videoId) => {
    setEditVideoId(videoId);
  };

  const closeEditModal = () => {
    setEditVideoId(null);
  };

  const handleVideoEdited = () => {
    // Fetch the updated list of videos after editing
    const fetchVideos = async () => {
      const videos = await getVideos(user?.username);
      setVideos(videos.videos);
    };

    fetchVideos();
    closeEditModal();
  };

  return (
    <div className='video-list-container'>
      <div className='videos-header'>
        <div className='videos-title'>Your Videos</div>
        <div className='add-video-section'>
          {!isModalOpen &&
            <button 
              className='add-video-btn'
              onClick={openModal}
            >
              Add your video
            </button>
          }
          {isModalOpen && <CreateModal show={isModalOpen} onClose={closeModal} onVideoCreated={handleVideoCreated} />}
        </div>
      </div>

      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="video-carousel"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item"
      >
        {videos.map((video) => (
          <div key={video.id} className="carousel-item">
            <div className="video-options">
              <h2 className="video-title">{video.title}</h2>
              <button className="edit-video-btn" onClick={() => openEditModal(video.id)}>
                Edit
              </button>
              {editVideoId === video.id && (
                <EditModal
                  show={true}
                  onClose={closeEditModal}
                  onVideoEdited={handleVideoEdited}
                  video={video}
                />
              )}
            </div>
            <p className="video-description">{video.description}</p>
            <div className="video-player-wrapper">
              <ReactPlayer 
                className='react-player' 
                url={video.video_url} 
                controls={true}
                width='100%'
                height='100%'
              />
            </div>
            <CommentSection videoId={video.id} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default VideoList;
