import axios from "axios";

const API_URL = "https://flight-booking-system-rcgo.onrender.com/api";

export const getFlights = async () => {
  const response = await axios.get(`${API_URL}/flights`);

  return response.data;
};
export const reduceSeatCount = async (flightId) => {
  const response = await axios.put(`${API_URL}/flights/${flightId}/seats`);

  return response.data;
};
