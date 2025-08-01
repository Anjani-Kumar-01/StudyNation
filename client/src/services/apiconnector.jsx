// import axios from "axios";

// // Optionally set a base URL if you often call the same server
// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:4000/api/v1", // Optional but helpful
//   withCredentials: true, // Add this if your API needs cookies (auth tokens, etc.)
// });

// // Properly named and exported function
// const apiConnector = (method,email, url, bodyData = null, headers = null, params = null) => {
//   return axiosInstance({
//     method,
//     email,
//     url,
//     data: bodyData,
//     headers,
//     params,
    
//   });
// };
// src/utils/apiConnector.js
import axios from "axios";

const BASE_URL = ""; // No space before http

export const apiConnector = async (
  method,
  relativeURL,
  bodyData = {},
  headers = {}
) => {
  if (typeof relativeURL !== "string") {
    throw new Error(`Expected string for relativeURL but got: ${typeof relativeURL}`);
  }

  const fullURL = `${BASE_URL}${relativeURL}`;

  const config = {
    method,
    url: fullURL,
    data: bodyData,
    headers,
  };

  return await axios(config);
};

export default apiConnector;
