import { searchDelay } from '../../utils';
import { searchForMovies } from '../../api';

jest.mock('../../api', () => ({
  searchForMovies: jest.fn(),
}));
jest.useFakeTimers();

describe('searchDelay function', () => {
  it('should call searchForMovies after a delay', () => {
    const event = new Event('input');
    Object.defineProperty(event, 'target', {
      writable: false,
      value: {
        value: 'example-query',
      },
    });

    searchDelay(event);

    jest.advanceTimersByTime(500);
    expect(searchForMovies).toHaveBeenCalledWith('example-query');
  });

  it('should clear the previous timer when called again', () => {
    const event1 = new Event('input');
    Object.defineProperty(event1, 'target', {
      writable: false,
      value: {
        value: 'first-query',
      },
    });

    const event2 = new Event('input');
    Object.defineProperty(event2, 'target', {
      writable: false,
      value: {
        value: 'second-query',
      },
    });

    searchDelay(event1);

    jest.advanceTimersByTime(100);

    searchDelay(event2);

    // Ensure the previous timer is cleared
    // Manually invoke the setTimeout callback to simulate timer expiry
    jest.runOnlyPendingTimers();
    expect(searchForMovies).toHaveBeenCalledWith('second-query');
  });
});
