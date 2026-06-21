import axios from "axios";

const API_URL = "https://flight-booking-system-rcgo.onrender.com/api";

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/dashboard`);

  return response.data;
};
