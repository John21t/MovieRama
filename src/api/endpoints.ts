/* eslint-disable prefer-const */
// Initializing the pageToLoad, previousSearchBarValue variables
export let pageToLoad = { value: 1 },
  previousSearchBarValue = { value: '' };

export const baseUrl = 'http://api.themoviedb.org/3',
  apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0',
  MDB_Endpoints = {
    nowPlaying: '/movie/now_playing',
    movieGenres: '/genre/movie/list',
    searchMovies: '/search/movie',
    movieDetails: (id: number) => `/movie/${id}`,
    movieTrailer: (id: number) => `/movie/${id}/videos`,
    movieReviews: (id: number) => `/movie/${id}/reviews`,
    similarMovies: (id: number) => `/movie/${id}/similar`,
  },
  /**
   * Builds the query what we need for the request
   * Encodes each key and value, concatenates them into a string and push them to the array
   * Then join each item in the array with a `&` and return the resulting string
   * @param requestParams
   * @returns {string}
   */
  buildQuery = (requestParams: {
    api_key: string;
    page?: number;
    query?: string;
  }) => {
    const queryParams = Object.entries(requestParams)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => Boolean(value))
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      );

    return queryParams.join('&');
  };
