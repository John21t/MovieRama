export type Movies = Movie[];
export type Movie = {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

export type MappedMovies = MappedMovie[];
export type MappedMovie = {
  posterPath: string;
  adult: boolean;
  overview: string;
  releaseDate: string;
  genres: number[];
  id: number;
  originalTitle: string;
  originalLanguage: string;
  title: string;
  backdropPath: string;
  popularity: number;
  voteCount: number;
  video: boolean;
  voteAvg: number;
};

export type Genre = { id: number; name: string };

export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  voteAvg: number;
  voteCount: number;
};

export type MovieTrailers = MovieTrailer[];
export type MovieTrailer = {
  video?: string;
  key: string;
  site: string;
};

export type MovieReviews = MovieReview[];
export type MovieReview = {
  id: string;
  author: string;
  content: string;
};

export type SimilarMovies = SimilarMovie[];
export type SimilarMovie = {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
};

export type MovieApiResponse = [
  MovieDetails | void,
  MovieTrailers,
  MovieReviews,
  SimilarMovies,
];
