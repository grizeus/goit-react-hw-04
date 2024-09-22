import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/search/photos";
const API_KEY = "7QaC31QWQatTvaiGVBFYsWoswGiVg-edIcET13XO0oA";

axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;
axios.defaults.headers.common["Accept-Version"] = "v1";

export const fetchImages = async (query, page = 1, perPage = 12) => {
  const CONFIG = {
    params: {
      query: query,
      page: page,
      per_page: perPage,
      content_filter: "low",
    }
  };
  const res = await axios.get("/", CONFIG);

  console.log(res);
  return res.data;
};
