/**
 * Retrieves the movie genres from the session storage,
 * returns an array that includes the names of the matched genres
 * @returns {Array}
 */
const getMovieGenres = (genreIds = []) => {
  const storedGenres = sessionStorage.getItem('genres'),
    parsedGenres = JSON.parse(storedGenres);

  return genreIds.map(
    (genreId) =>
      parsedGenres?.find?.((storedGenre) => genreId === storedGenre.id).name ??
      '',
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
}) => ({
  id,
  title,
  overview,
  posterPath,
  backdropPath,
  releaseDate,
  voteAvg,
  genres: getMovieGenres(genre_ids),
});
