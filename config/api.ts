export const API_URL = "https://safehomeanara.id";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    ME: `${API_URL}/auth/me`,
  },
  POSTS: {
    GET_USER_POSTS: (userId: number) => `${API_URL}/posts/user/${userId}`,
    GET_ALL: `${API_URL}/posts`,
    CREATE: `${API_URL}/posts`,
  },
  REPLIES: {
    GET_USER_REPLIES: (userId: number) => `${API_URL}/replies/user/${userId}`,
    CREATE: `${API_URL}/replies`,
  },
  USER: {
    UPDATE_PROFILE: `${API_URL}/api/user/profile`,
  },
};
