import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api/', // Set your API base URL
});

let isRefreshing = false; // Flag to track token refresh request

// Function to refresh the access token
function refreshToken() {
  return api.post('user/token', null, {
    withCredentials: true,
  });
}

// Add an Axios interceptor
api.interceptors.request.use(
  async (config) => {
    // Check if access token has expired
    if (!isRefreshing) {
      isRefreshing = true;
      // Refresh the access token
      return refreshToken()
        .then(() => {
          isRefreshing = false;
          return config;
        })
        .catch((error) => {
          isRefreshing = false;
          return Promise.reject(error);
        });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;


