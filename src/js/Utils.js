import { moviesTemplate } from "./Templates.js";

// Initializing the pageToLoad, previousSearchBarValue variables
let pageToLoad = 1,
    previousSearchBarValue = '';

export const baseUrl = 'http://api.themoviedb.org/3',
    apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0',
    MDB_Endpoints = {
        nowPlaying: '/movie/now_playing',
        movieGenres: '/genre/movie/list',
        searchMovies: '/search/movie',
        movieDetails: (id) => `/movie/${ id }`,
        movieTrailer: (id) => `/movie/${ id }/videos`,
        movieReviews: (id) => `/movie/${ id }/reviews`,
        similarMovies: (id) => `/movie/${ id }/similar`
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
            if (requestParams.hasOwnProperty(key)) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(requestParams[key]));
            }
        }
        return query.join('&');
    };

/**
 * Creates the url for the call,
 * fetches the now playing movies
 * and then calls the moviesTemplate function.
 */
export const nowPlayingMovies = () => {

    const query = buildQuery({ api_key: apiKey, page: pageToLoad }),
        url = `${ baseUrl }${ MDB_Endpoints.nowPlaying }?${ query }`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            pageToLoad = data.page + 1;

            const nowPlayingMovies = data.results.map(movie => {
                return {
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    posterPath: movie.poster_path,
                    backdropPath: movie.backdrop_path,
                    releaseDate: movie.release_date,
                    voteAvg: movie.vote_average,
                    genres: getMovieGenres(movie.genre_ids)
                };
            });
            moviesTemplate(nowPlayingMovies);
        })
        .catch(error => {
            console.log(error);
        });
};

/**
 * Retrieves the movie genres from the session storage,
 * returns an array that includes the names of the matched genres
 * @returns {Array}
 */
const getMovieGenres = (genreIds = []) => {
    return genreIds.map(genreId => {
        const storedGenres = sessionStorage.getItem('genres'),
            parsedGenres = JSON.parse(storedGenres),
            genreToReturn = parsedGenres && parsedGenres.find(storedGenre => genreId === storedGenre.id).name;

        return genreToReturn || '';
    });
};

/**
 * Creates the url for the call,
 * fetches the movies genres,
 * stores them to the sessionStorage.
 */
export const storeMovieGenres = () => {
    const query = buildQuery({ api_key: apiKey }),
        url = `${ baseUrl }${ MDB_Endpoints.movieGenres }?${ query }`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            sessionStorage.setItem('genres', JSON.stringify(data.genres));
        })
        .catch(error => {
            console.log(error)
        });
};

/**
 * Implements the search bar functionality
 * Fetches the movies based on the search value,
 * then calls the moviesTemplate function.
 *
 * Resets page count for every new search - clears the previous movies
 * If search value is empty - calls nowPlayingMovies function
 * @param value
 */
export const searchForMovies = (value) => {

    const moviesList = document.getElementById('movies'),
        loader = document.getElementById('loader');

    // Show loader
    loader.classList.add("showLoader");

    if (value) {
        // Reset page count and clear movies
        if (value !== previousSearchBarValue) {
            moviesList.innerHTML = '';
            previousSearchBarValue = value;
            pageToLoad = 1;
        } else pageToLoad++;

        const reqQuery = buildQuery({ api_key: apiKey, query: value, page: pageToLoad }),
            url = `${ baseUrl }${ MDB_Endpoints.searchMovies }?${ reqQuery }`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const moviesRetrieved = data.results.map(movie => {
                    return {
                        id: movie.id,
                        title: movie.title,
                        overview: movie.overview,
                        posterPath: movie.poster_path,
                        backdropPath: movie.backdrop_path,
                        releaseDate: movie.release_date,
                        voteAvg: movie.vote_average,
                        genres: getMovieGenres(movie.genre_ids)
                    };
                });
                moviesTemplate(moviesRetrieved);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                loader.classList.remove("showLoader");
            });
    } else {
        moviesList.innerHTML = '';
        nowPlayingMovies();
        loader.classList.remove("showLoader");
    }
};

/**
 * Creates the url for the call,
 * fetches the movie details.
 * @param movieId
 */
export const movieDetails = (movieId) => {
    const reqQuery = buildQuery({api_key: apiKey}),
        url = `${baseUrl}${MDB_Endpoints.movieDetails(movieId)}?${reqQuery}`;

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            return {
                id: data.id,
                title: data.title,
                overview: data.overview,
                voteAvg: data.vote_average,
                voteCount: data.vote_count
            };
        })
        .catch(error => {
            console.log(error);
        });
};

/**
 * Creates the url for the call,
 * fetches the movie trailer.
 * @param movieId
 */
export const movieTrailer = (movieId) => {
    const reqQuery = buildQuery({ api_key: apiKey }),
        url = `${ baseUrl }${ MDB_Endpoints.movieTrailer(movieId) }?${ reqQuery }`;

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            return data.results.map(video => {
                return {
                    id: video.id,
                    key: video.key,
                    site: video.site
                };
            }).slice(0,1);
        })
        .catch(error => {
            console.log(error);
        });
};

/**
 * Creates the url for the call,
 * fetches the movie reviews.
 * @param movieId
 */
export const movieReviews = (movieId) => {
    const reqQuery = buildQuery({ api_key: apiKey }),
        url = `${ baseUrl }${ MDB_Endpoints.movieReviews(movieId) }?${ reqQuery }`;

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            return data.results.map(review => {
                return {
                    id: review.id,
                    author: review.author,
                    content: review.content
                };
            });
        })
        .catch(error => {
            console.log(error);
        });
};

/**
 * Creates the url for the call,
 * fetches the similar movies.
 * @param movieId
 */
export const similarMovies = (movieId) => {
    const reqQuery = buildQuery({ api_key: apiKey }),
        url = `${ baseUrl }${ MDB_Endpoints.similarMovies(movieId) }?${ reqQuery }`;

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            return data.results.map(movie => {
                return {
                    id: movie.id,
                    title: movie.title,
                    posterPath: movie.poster_path,
                    backdropPath: movie.backdrop_path
                };
            });
        })
        .catch(error => {
            console.log(error);
        });
};


