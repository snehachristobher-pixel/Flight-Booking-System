import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getBookings = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createBooking = async (bookingData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${API_URL}/bookings`, bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createFinalBooking = async (bookingData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${API_URL}/bookings/final`, bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteBooking = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
