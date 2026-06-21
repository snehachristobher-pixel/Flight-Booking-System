import axios from "axios";


const API_KEY = "58628ff010b83e1e8fcbba1eac49ffa1";

export const getFlightStatus = async () => {
  const response = await axios.get(
    `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}`,
  );

  return response.data.data;
};
