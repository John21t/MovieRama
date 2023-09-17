import { buildQuery } from '../../api';

describe('buildQuery function', () => {
  it('should correctly build a query string from request parameters', () => {
    const requestParams = {
      api_key: 'value1',
      query: 'value2',
      page: 100,
    };

    const result = buildQuery(requestParams);
    expect(result).toBe('api_key=value1&query=value2&page=100');
  });
});
