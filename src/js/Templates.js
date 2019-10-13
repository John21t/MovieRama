import { movieDetails, movieReviews, movieTrailer, similarMovies } from './Utils.js';
import { modal } from './UI-Handlers.js';

const moviesList = document.getElementById('movies'),
    selectedMovie = document.getElementById('selectedMovie');

/**
 * Appends the movie templates to the movie list
 * If movies doesn't exist,
 * returns the No Results Found template
 * @param movies
 */
export const moviesTemplate = (movies = []) => {
    if (!movies || !movies.length) return noResultsFoundTemplate();

    for (const movie of movies) {
        const movieToShow = document.createElement('span');

        movieToShow.addEventListener('click', getMovieDetails(movie.id));
        movieToShow.setAttribute("data-toggle", "modal");
        movieToShow.setAttribute("data-target", "#movieDetailsModal");
        movieToShow.classList.add("movie");
        movieToShow.innerHTML = movieTemplate(movie);

        moviesList.appendChild(movieToShow);
    }
};

/**
 * Creates the movie template
 * @param movie
 */
const movieTemplate = (movie = {}) => {
    const url = 'https://image.tmdb.org/t/p/w300/',
        imageUrl = movie.posterPath ? `${ url }${ movie.posterPath }` : `${ url }${ movie.backdropPath }`,
        yearOfRelease = new Date(movie.releaseDate).getFullYear();

    let movieGenres = '';

    for (const genre of movie.genres) {
        movieGenres += `<span class="genre"> ${ genre } </span>`;
    }

    return `<span class="moviePosterContainer">
                <img alt='moviePoster' class="moviePoster" src='${ imageUrl }'>
            </span>
            <span class="movieDetails">
                <span class="movieHeader">
                    <span class="title"> ${ movie.title } </span>
                    <span class="dateWrapper">
                        <img class="dateIcon" alt="dateIcon" src="../../public/svg/calendar-alt-regular.svg">
                        <span class="date"> ${ yearOfRelease } </span>
                    </span>
                </span>
                    <span class="movieOverview"> ${ movie.overview } </span>
                <span class="movieFooter">
                    <span class="ratingWrapper">
                        <img class="ratingIcon" alt="ratingIcon" src="../../public/svg/star-solid.svg">
                        <span class="rating"> ${ movie.voteAvg } </span>
                    </span>
                    <span class="genres"> ${ movieGenres } </span>
                </span>
            </span>
        `;

};

/**
 * Creates the No Results Found template
 */
const noResultsFoundTemplate = () => {
    const noResults = document.createElement('span');

    noResults.classList.add("noResults");
    noResults.innerHTML = `<span class="text">
                No Results Found
            </span>
        `;

    moviesList.appendChild(noResults);
};

/**
 * Gets all the required movie data we want to show to the user,
 * then calls createModalContent and appends the result
 * @param id
 */
const getMovieDetails = (id) => {
    return () => {
        Promise.all([movieDetails(id), movieTrailer(id), movieReviews(id), similarMovies(id)])
            .then(data => {
                selectedMovie.innerHTML = createModalContent(data);
                modal.classList.add("showModal");
            })
            .catch(error => console.log(error));
    };
};

/**
 * Creates the content of the modal
 * @param movieData
 */
const createModalContent = (movieData) => {
    const { title, overview, voteAvg, voteCount } = movieData[0],
        trailerKey = movieData[1].length && movieData[1][0].site === "YouTube" ? movieData[1][0].key : '',
        trailer = trailerKey ?
            `<iframe width="600" height="400"
                src="https://www.youtube.com/embed/${ trailerKey }">
            </iframe>`
            :
            '<span>There is no trailer available</span>',
        reviews = movieData[2].map(review => {
            return `<span class="review" id="${ review.id }">
                      <span class="author">${ review.author }</span>
                      <span class="content">${ review.content }</span>
                    </span>`;
        }),
        similarMovies = movieData[3].map(movie => {
            const url = 'https://image.tmdb.org/t/p/w300/',
                imageUrl = movie.posterPath ? `${ url }${ movie.posterPath }` : `${ url }${ movie.backdropPath }`;
            return `<span class="similarMovie">
                      <img alt='moviePoster' class="moviePoster" src='${ imageUrl }'>
                      <span class="content">${ movie.title }</span> 
                    </span>`;
        });

    return `<div class="modalContentContainer">
                <span class="movieDetails">
                    <span class="movieHeader">
                        <span class="title"> ${ title } </span>
                        <span class="ratingWrapper">
                        <span class="ratingStar">
                            <img class="ratingIconStar" alt="ratingIcon" src="../../public/svg/star-solid.svg">
                            <span class="rating"> ${ voteAvg } </span>
                        </span>
                        <span class="ratingCount">
                            <img class="ratingIconCount" alt="ratingIcon" src="../../public/svg/user-solid.svg">
                            <span class="ratingCount"> ${ voteCount } </span>
                        </span>
                        </span>
                    </span>
                    <span class="movieBody">
                         <span class="movieTrailer"> ${ trailer } </span>
                         <span class="movieOverview">
                            <span class="title"> Overview </span>
                            <span class="text"> ${ overview } </span>
                         </span>
                    </span>
                    <span class="movieFooter">
                        <span class="reviewsWrapper">
                            <span class="title"> Reviews </span>
                            <span class="reviews">${ reviews.join('') }</span>
                        </span>
                         <span class="similarMoviesWrapper">
                            <span class="title"> You might also like: </span>
                            <span class="similarMovies"> ${ similarMovies.join('') } </span>
                        </span>
                    </span>
                </span>
            </div>
        `;
};
