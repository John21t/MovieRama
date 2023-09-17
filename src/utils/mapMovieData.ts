import { Genre, Movie } from '../types';

/**
 * Retrieves the movie genres from the session storage,
 * returns an array that includes the names of the matched genres
 * @returns {Array}
 */
export const getMovieGenres = (genreIds: number[]): { name: string }[] => {
  const storedGenres = sessionStorage.getItem('genres');
  const parsedGenres = storedGenres ? JSON.parse(storedGenres) : [];
  return genreIds.map(
    (genreId) =>
      parsedGenres.find((genre: Genre) => genreId === genre.id)?.name ?? '',
  );
};

export const mapMovieData = ({
  id,
  title,
  overview,
  poster_path: posterPath,
  backdrop_path: backdropPath,
  release_date: releaseDate,
  vote_average: voteAvg,
  genre_ids,
}: Movie) => ({
  id,
  title,
  overview,
  posterPath,
  backdropPath,
  releaseDate,
  voteAvg,
  genres: getMovieGenres(genre_ids),
});
