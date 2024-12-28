import axios from 'axios';

const fetcher = async (url: string) => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
        console.error("Error fetching data:", error.response?.data || error);
      throw new Error("Failed to fetch data");
    });
};

export default fetcher;
