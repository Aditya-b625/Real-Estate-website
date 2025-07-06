// utils/auth.js
export const isAuthenticated = () => {
    return Boolean(sessionStorage.getItem('token'));
  };
  