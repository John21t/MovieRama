import { getNowPlayingMovies, searchForMovies } from '../api';

const searchInput = document.getElementById(
  'searchForMovies',
) as HTMLInputElement;
const scrollTriggerElement = document.getElementById(
  'scrollTriggerElement',
) as HTMLDivElement;

export const infiniteScroll = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const hasData = !document.getElementById('noResultsFound');
      if (entry.isIntersecting && hasData) {
        // The target element is now visible, so load more content
        if (searchInput.value) {
          searchForMovies(searchInput.value);
        } else {
          getNowPlayingMovies();
        }
      }
    });
  }, options);

  observer.observe(scrollTriggerElement);
};
