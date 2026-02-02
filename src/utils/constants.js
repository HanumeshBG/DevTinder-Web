// export const BASE_URL = "http://localhost:3000";
// export const BASE_URL = "/api"; // Updated for production deployment

export const BASE_URL = location.hostname === "localhost" ? "http://localhost:3000" : "/api";