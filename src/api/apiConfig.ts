import axios from "axios";

const TMDB_API_KEY = "2ec633044608fc6d4acfc7b3552d37fa";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Buat instance axios
export const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});
