const BASE_API = "http://localhost:3000";

const ENDPOINTS = {
  LOGIN: `${BASE_API}/auth/login`,
} as const;

export default ENDPOINTS;
