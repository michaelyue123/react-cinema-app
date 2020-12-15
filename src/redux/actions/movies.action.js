import { MOVIE_API_URL } from '../../services/movies.service';

export const getMovieData = async (type, pageNumber) => {
  const response = getMoviesRequest(type, pageNumber);
  return response;
};

export const loadMoreMovies = async (type, pageNumber) => {
  const response = getMoviesRequest(type, pageNumber);
  return response;
};

export const setResponsePageNumber = async (page, totalPages) => {
  const payload = { page, totalPages };
  return payload;
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
