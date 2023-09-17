import { Movie } from '../../types';
import { mapMovieData, getMovieGenres } from '../../utils';

const storedGenres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Drama' },
];
const getItemMock = jest.fn(() => JSON.stringify(storedGenres));
const setItemMock = jest.fn();

Object.defineProperty(global, 'sessionStorage', {
  value: {
    getItem: getItemMock,
    setItem: setItemMock,
  },
  writable: true,
});

describe('getMovieGenres function', () => {
  it('should return an array of genre names based on genre ids', () => {
    const genreIds = [1, 2];
    const result = getMovieGenres(genreIds);

    expect(result).toEqual(['Action', 'Drama']);
  });

  it('should handle missing genres gracefully', () => {
    const genreIds = [1, 3];
    const result = getMovieGenres(genreIds);

    expect(result).toEqual(['Action', '']);
  });
});

describe('mapMovieData function', () => {
  it('should map movie data object correctly', () => {
    const movieData = {
      id: 1,
      title: 'Movie Title',
      overview: 'Movie Overview',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2023-09-15',
      vote_average: 8.5,
      genre_ids: [1, 2],
    };

    const result = mapMovieData(movieData as Movie);

    expect(result).toEqual({
      id: 1,
      title: 'Movie Title',
      overview: 'Movie Overview',
      posterPath: '/poster.jpg',
      backdropPath: '/backdrop.jpg',
      releaseDate: '2023-09-15',
      voteAvg: 8.5,
      genres: expect.any(Array),
    });
  });
});
