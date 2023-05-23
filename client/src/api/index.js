import axios from 'axios';
import jwt_decode from 'jwt-decode';
import cookies from 'js-cookie';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api/', // Set your API base URL
});

let isRefreshing = false; // Flag to track token refresh request

function isTokenExpired(accessToken) {
  if (!accessToken) {
    return true;
  }

  const decodedToken = jwt_decode(accessToken);
  const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
  const currentTime = Date.now();
  return expirationTime < currentTime;
}

// Add an Axios interceptor
api.interceptors.request.use(
  async (config) => {
    const accessToken = cookies.get('clientAccessToken');
    // Check if access token has expired
    if (isTokenExpired(accessToken)) {
      // Access token has expired
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Make a request to refresh the token
          await api.post('user/token', null, {
            withCredentials: true,
          });
          isRefreshing = false;
        } catch (error) {
          isRefreshing = false;
          throw error;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
