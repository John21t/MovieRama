import { calendar, star } from '../assets';
import { roundToOneDecimalPoint } from '../utils';
import { MappedMovie } from '../types';

/**
 * Creates the movie template
 * @param movie
 */
export const movieTemplate = ({
  title,
  overview,
  genres,
  releaseDate,
  posterPath,
  backdropPath,
  voteAvg,
}: MappedMovie) => {
  const url = 'https://image.tmdb.org/t/p/w300/';
  const imageUrl = posterPath ? `${url}${posterPath}` : `${url}${backdropPath}`;
  const yearOfRelease = new Date(releaseDate).getFullYear();

  let movieGenres = '';

  for (const genre of genres) {
    movieGenres += `<span class="genre"> ${genre} </span>`;
  }

  return `<span class="moviePosterContainer">
                  <img alt='moviePoster' class="moviePoster" src='${imageUrl}'>
              </span>
              <span class="movieDetails">
                  <span class="movieHeader">
                      <span class="title"> ${title} </span>
                      <span class="dateWrapper">
                          <img class="dateIcon" alt="dateIcon" src=${calendar}>
                          <span class="date"> ${yearOfRelease} </span>
                      </span>
                  </span>
                      <span class="movieOverview"> ${overview} </span>
                  <span class="movieFooter">
                      <span class="ratingWrapper">
                          <img class="ratingIcon" alt="ratingIcon" src=${star}>
                          <span class="rating"> ${roundToOneDecimalPoint(
                            voteAvg,
                          )} </span>
                      </span>
                      <span class="genres"> ${movieGenres} </span>
                  </span>
              </span>
          `;
};
