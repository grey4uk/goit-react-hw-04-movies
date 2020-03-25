import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const API_KEY = "fcd9429450d3aff4de8b05edb62acde5";

let params = {
  api_key: API_KEY,
  language: "en-US",
  page: 1,
  query: ""
};

export default {
  // `https://api.themoviedb.org/3/movie/popular?api_key=${this.state.key}&language=en-US&page=1`
  async getPopular() {
    try {
      const data = await axios.get("movie/popular", { params });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  },

  // https://api.themoviedb.org/3/movie/419704?api_key=fcd9429450d3aff4de8b05edb62acde5&language=en-US
  async getMovieById(id) {
    try {
      const data = await axios.get(`movie/${id}`, { params });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  },

  // `https://api.themoviedb.org/3/search/movie?api_key=${this.state.key}&language=en-US&query=${query}&page=1&include_adult=false`
  async getMovieByQuery(query) {
    params.query = query;
    try {
      const data = await axios.get("search/movie", { params });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getMovieReview(id) {
    try {
      const data = await axios.get(`movie/${id}/reviews`, { params });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getMovieCast(id) {
    try {
      const data = await axios.get(`movie/${id}/credits`, { params });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
};
