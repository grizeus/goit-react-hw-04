import axios from "axios";

axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

export const fetchWithTopic = async (topic) => {
  const res = await axios.get(`/search?query=${topic}`);
  return res.data.hits;
};
