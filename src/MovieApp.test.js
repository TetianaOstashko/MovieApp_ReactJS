import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('displays popular movies', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              { id: 1, title: 'Movie 1' },
              { id: 2, title: 'Movie 2' },
            ],
          }),
      })
    );

    const { getByText } = render(<App />);

    await waitFor(() => getByText('Movie 1'));
    await waitFor(() => getByText('Movie 2'));

    expect(getByText('Movie 1')).toBeInTheDocument();
    expect(getByText('Movie 2')).toBeInTheDocument();
  });

  test('searches and adds movies', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              { id: 3, title: 'Movie 3' },
              { id: 4, title: 'Movie 4' },
            ],
          }),
      })
    );

    const { getByPlaceholderText, getByText, queryByText } = render(<App />);

    const searchInput = getByPlaceholderText('Search movies');
    fireEvent.change(searchInput, { target: { value: 'Movie 3' } });
    fireEvent.click(getByText('Search'));
    await waitFor(() => getByText('Movie 3'));
    fireEvent.click(getByText('Add to Favorites'));

    expect(queryByText('Movie 3')).toBeInTheDocument();
  });
});
