import React, { useState, useEffect, useContext } from 'react';
import { getVideoComments, addComment } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { faker } from '@faker-js/faker';
import '../styles/css/CommentSection.css';

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getVideoComments(videoId);
      let combinedComments = [];

      if (fetchedComments.comments.length === 0) {
        // Generate fake comments if there are no real comments
        const storedFakeComments = localStorage.getItem(`fakeComments-${videoId}`);
        let fakeComments = storedFakeComments ? JSON.parse(storedFakeComments) : generateFakeComments();
        combinedComments = fakeComments;
        localStorage.setItem(`fakeComments-${videoId}`, JSON.stringify(fakeComments));
      } else {
        combinedComments = fetchedComments.comments;
        const storedFakeComments = localStorage.getItem(`fakeComments-${videoId}`);
        if (storedFakeComments) {
          combinedComments = combinedComments.concat(JSON.parse(storedFakeComments));
        }
      }

      setComments(combinedComments);
    };

    fetchComments();
  }, [videoId]);

  const generateFakeComments = () => {
    const fakeComments = [];
    const numberOfFakeComments = Math.floor(Math.random() * 3) + 1; // Random between 2 to 4 comments

    for (let i = 0; i < numberOfFakeComments; i++) {
      const fakeComment = {
        id: `faker-${faker.datatype.uuid()}`,
        content: faker.lorem.sentence(),
        user_id: faker.internet.userName(),
      };
      fakeComments.push(fakeComment);
    }

    return fakeComments;
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      video_id: videoId,
      user_id: user?.username,
      content: newComment,
    };
    await addComment(commentData);
    setNewComment('');
    // Fetch comments again after adding a new comment
    const fetchedComments = await getVideoComments(videoId);
    let combinedComments = fetchedComments.comments;
    const storedFakeComments = localStorage.getItem(`fakeComments-${videoId}`);
    if (storedFakeComments) {
      combinedComments = combinedComments.concat(JSON.parse(storedFakeComments));
    }
    setComments(combinedComments);
  };

  return (
    <div className="comment-section">
      <h2 className="comment-section-title">Comments</h2>
      <div className="comment-list-container">
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <span className="comment-user">{comment.user_id}: </span>
              <span className="comment-content">{comment.content}</span>
            </li>
          ))}
        </ul>
      </div>
      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          className="comment-input"
        />
        <button type="submit" className="add-comment-btn">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
