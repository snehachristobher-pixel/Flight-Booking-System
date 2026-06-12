import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);

  return response.data;
};
