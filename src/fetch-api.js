import axios from "axios";

export const fetchImages = async (query, page) => {
  const API_KEY = "5iiQAA4XYvdykgi2449HOahcyh_LcnlWRG79drxp46c";
  axios.defaults.baseURL = "https://api.unsplash.com/search/photos";
  const response = await axios.get(
    `?client_id=${API_KEY}&page=${page}&query=${query.split("/")[1]}`
  );
  return response.data;
};
