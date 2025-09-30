import axiosInstance from '../services/axiosConfig';
import { useAuthHeaders } from './authHeaders';

const API_URL = '/api/feedback';

export function useApplicationReviewApi() {
  const headers = useAuthHeaders();

  // Get feedback for a specific application
  const getFeedbacks = async (applicationId) => {
    const res = await axiosInstance.get(`${API_URL}/application/${applicationId}`, { headers });
    return res.data;
  };

  // Add new feedback to an application
  const createFeedback = async (applicationId, feedback) => {
    const res = await axiosInstance.post(`${API_URL}/application/${applicationId}`, feedback, { headers });
    return res.data;
  };

  // Update an existing feedback
  const updateFeedback = async (feedbackId, feedback) => {
    const res = await axiosInstance.put(`${API_URL}/${feedbackId}`, feedback, { headers });
    return res.data;
  };

  // Delete feedback
  const deleteFeedback = async (feedbackId) => {
    const res = await axiosInstance.delete(`${API_URL}/${feedbackId}`, { headers });
    return res.data;
  };

  return {
    getFeedbacks,
    createFeedback,
    updateFeedback,
    deleteFeedback
  };
}
