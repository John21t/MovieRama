import { getNowPlayingMovies, searchForMovies } from '../api';

const searchButton = document.getElementById('searchForMovies');
const scrollTriggerElement = document.getElementById('scrollTriggerElement');

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
        if (searchButton.value) {
          searchForMovies(searchButton.value);
        } else {
          getNowPlayingMovies();
        }
      }
    });
  }, options);

  observer.observe(scrollTriggerElement);
};
