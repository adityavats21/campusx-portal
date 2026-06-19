import { apiUrl } from './api';

test('builds same-origin API URLs by default', () => {
  expect(apiUrl('/api/health')).toBe('/api/health');
});
