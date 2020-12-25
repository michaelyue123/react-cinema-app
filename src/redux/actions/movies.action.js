import { MOVIE_API_URL, SEARCH_API_URL } from '../../services/movies.service';

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
  console.log(query);
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

const getMoviesRequest = async (type, pageNumber) => {
  const response = await MOVIE_API_URL(type, pageNumber);
  const { results, page, total_pages } = response.data;
  const payload = {
    page,
    totalPages: total_pages
  };
  return { results, payload };
};
