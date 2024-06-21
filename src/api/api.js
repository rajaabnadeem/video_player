import axios from 'axios';

const API_URL = 'https://take-home-assessment-423502.uc.r.appspot.com/api';

// Fetch all videos
export const getVideos = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/videos?user_id=${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

// Create a new video
export const createVideo = async (video) => {
  try {
    const response = await axios.post(`${API_URL}/videos`, video);
    return response.data;
  } catch (error) {
    console.error("Error creating video:", error);
    throw error;
  }
};

// Edit an existing video
export const editVideo = async (video) => {
  try {
    const response = await axios.put(`${API_URL}/videos`, video)
    return response.data
  } catch (error) {
    console.error('Error editing video', error)
    throw error
  }
}

// Fetch comments for a specific video
export const getVideoComments = async (videoId) => {
  try {
    const response = await axios.get(`${API_URL}/videos/comments?video_id=${videoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for video with ID ${videoId}:`, error);
    throw error;
  }
};

// Add a comment to a video
export const addComment = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/videos/comments`, data);
    return response.data;
  } catch (error) {
    console.error(`Error adding comment to video with ID:`, error);
    throw error;
  }
};
