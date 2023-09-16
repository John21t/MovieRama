/**
 * Creates the No Results Found template
 */
export const noResultsFoundTemplate = () => {
  const moviesList = document.getElementById('movies');
  const noResults = document.createElement('span');

  noResults.classList.add('noResults');
  noResults.id = 'noResultsFound';
  noResults.innerHTML = `<span class="text">
                  No Results Found
              </span>
          `;

  moviesList.appendChild(noResults);
};
