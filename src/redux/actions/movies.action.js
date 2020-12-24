import { MOVIE_API_URL } from '../../services/movies.service';

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
