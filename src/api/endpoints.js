// Initializing the pageToLoad, previousSearchBarValue variables
export let pageToLoad = { value: 1 },
  previousSearchBarValue = { value: '' };

export const baseUrl = 'http://api.themoviedb.org/3',
  apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0',
  MDB_Endpoints = {
    nowPlaying: '/movie/now_playing',
    movieGenres: '/genre/movie/list',
    searchMovies: '/search/movie',
    movieDetails: (id) => `/movie/${id}`,
    movieTrailer: (id) => `/movie/${id}/videos`,
    movieReviews: (id) => `/movie/${id}/reviews`,
    similarMovies: (id) => `/movie/${id}/similar`,
  },
  /**
   * Builds the query what we need for the request
   * Encodes each key and value, concatenates them into a string and push them to the array
   * Then join each item in the array with a `&` and return the resulting string
   * @param requestParams
   * @returns {string}
   */
  buildQuery = (requestParams = {}) => {
    const query = [];
    for (const key in requestParams) {
      if (requestParams[key]) {
        query.push(
          encodeURIComponent(key) +
            '=' +
            encodeURIComponent(requestParams[key]),
        );
      }
    }
    return query.join('&');
  };
