import { star, user } from '../assets';
import { MovieApiResponse } from '../types';
import { roundToOneDecimalPoint } from '../utils';

/**
 * Creates the content of the modal
 * @param movieData
 */
export const modalContent = (movieData: MovieApiResponse) => {
  const { title, overview, voteAvg, voteCount } = movieData[0] ?? {};

  const trailerKey =
    movieData[1].length && movieData[1]?.[0].site === 'YouTube'
      ? movieData[1]?.[0].key
      : '';

  const trailer = trailerKey
    ? `<iframe width="600" height="400"
                  src="https://www.youtube.com/embed/${trailerKey}">
              </iframe>`
    : '<span>There is no trailer available</span>';

  const reviews = movieData[2].map(({ id, author, content }) => {
    return `<span class="review" id="${id}">
                        <span class="author">${author}</span>
                        <span class="content">${content}</span>
                      </span>`;
  });

  const url = 'https://image.tmdb.org/t/p/w300/';
  const similarMovies = movieData[3].map(
    ({ title, posterPath, backdropPath }) => {
      const imageUrl = posterPath
        ? `${url}${posterPath}`
        : `${url}${backdropPath}`;
      return `<span class="similarMovie">
                        <img alt='moviePoster' class="moviePoster" src='${imageUrl}'>
                        <span class="content">${title}</span> 
                      </span>`;
    },
  );

  return `<div class="modalContentContainer">
                  <span class="movieDetails">
                      <span class="movieHeader">
                          <span class="title"> ${title} </span>
                          <span class="ratingWrapper">
                          <span class="ratingStar">
                              <img class="ratingIconStar" alt="ratingIcon" src=${star}>
                              <span class="rating"> ${roundToOneDecimalPoint(
                                Number(voteAvg),
                              )} </span>
                          </span>
                          <span class="ratingCount">
                              <img class="ratingIconCount" alt="ratingIcon" src=${user}>
                              <span class="ratingCount"> ${voteCount} </span>
                          </span>
                          </span>
                      </span>
                      <span class="movieBody">
                           <span class="movieTrailer"> ${trailer} </span>
                           <span class="movieOverview">
                              <span class="title"> Overview </span>
                              <span class="text"> ${overview} </span>
                           </span>
                      </span>
                      <span class="movieFooter">
                          <span class="reviewsWrapper">
                              <span class="title"> Reviews </span>
                              <span class="reviews">${reviews.join('')}</span>
                          </span>
                           <span class="similarMoviesWrapper">
                              <span class="title"> You might also like: </span>
                              <span class="similarMovies"> ${similarMovies.join(
                                '',
                              )} </span>
                          </span>
                      </span>
                  </span>
              </div>
          `;
};
