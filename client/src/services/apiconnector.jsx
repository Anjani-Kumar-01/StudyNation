import axios from "axios";

// Optionally set a base URL if you often call the same server
export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1", // Optional but helpful
  withCredentials: true, // Add this if your API needs cookies (auth tokens, etc.)
});

// Properly named and exported function
const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });
};
export default apiConnector;
