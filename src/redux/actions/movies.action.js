import { MOVIE_API_URL, SEARCH_API_URL, MOVIE_DETAILS_URL, MOVIE_CREDITS_URL, MOVIE_IMAGES_URL, MOVIE_VIDEOS_URL, MOVIE_REVIEWS_URL } from '../../services/movies.service';

export const getMovieData = async (type, pageNumber) => {
  const response = await getMoviesRequest(type, pageNumber);
  return response;
};

export const loadMoreMovies = async (type, pageNumber) => {
  const response = await getMoviesRequest(type, pageNumber);
  return response;
};

export const setResponsePageNumber = (page, totalPages) => {
  const payload = { page, totalPages };
  return payload;
};

export const searchMovieQuery = (query) => {
  return query;
};

export const searchMovieResult = async (query) => {
  if (query) {
    const movies = await SEARCH_API_URL(query);
    const { results } = movies.data;
    return results;
  } else {
    return [];
  }
};

export const setMovieType = (type) => {
  return type;
};

export const clearMovieDetails = (result) => {
  return result;
};

export const movieDetails = async (id) => {
  const details = await MOVIE_DETAILS_URL(id);
  const credits = await MOVIE_CREDITS_URL(id);
  const images = await MOVIE_IMAGES_URL(id);
  const videos = await MOVIE_VIDEOS_URL(id);
  const reviews = await MOVIE_REVIEWS_URL(id);

  const res = await Promise.all([details, credits, images, videos, reviews])
    .then((values) => Promise.all(values.map((value) => value.data)))
    .then((response) => response);

  return res;
};

const getMoviesRequest = async (type, pageNumber) => {
  const response = await MOVIE_API_URL(type, pageNumber);
  const { results, page, total_pages } = response.data;
  const payload = {
    page,
    totalPages: total_pages
  };
  return { results, payload };
};
