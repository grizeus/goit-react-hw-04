import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/search/photos";
const API_KEY = "7QaC31QWQatTvaiGVBFYsWoswGiVg-edIcET13XO0oA";

axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;
axios.defaults.headers.common["Accept-Version"] = "v1";

const CONFIG = {
  params: {
    per_page: 15,
    content_filter: "low",
  },
};

export const fetchImages = async (query, page = 1) => {
  // spreading config and add missing params
  const res = await axios.get("/", { ...CONFIG, params: { page, query } });

  return res.data.results;
};