export const API_URL = "https://safehomeanara.id";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/api/auth/login`,
    REGISTER: `${API_URL}/api/auth/register`,
    ME: `${API_URL}/api/auth/me`,
  },
  POSTS: {
    GET_USER_POSTS: (userId: number) => `${API_URL}/api/posts/user/${userId}`,
    GET_ALL: `${API_URL}/api/posts`,
    CREATE: `${API_URL}/api/posts`,
  },
  REPLIES: {
    GET_USER_REPLIES: (userId: number) =>
      `${API_URL}/api/replies/user/${userId}`,
    CREATE: `${API_URL}/api/replies`,
  },
  USER: {
    UPDATE_PROFILE: `${API_URL}/api/user/profile`,
  },
};
