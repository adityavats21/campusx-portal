const configuredBaseUrl = process.env.REACT_APP_API_URL;

export const API_BASE_URL = configuredBaseUrl
  ? configuredBaseUrl.replace(/\/$/, '')
  : '';

export const apiUrl = (path) => `${API_BASE_URL}${path}`;

