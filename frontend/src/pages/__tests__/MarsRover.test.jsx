// src/pages/__tests__/MarsRover.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import MarsRover from '../MarsRover';
import '@testing-library/jest-dom';

// Global fetch mock
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          photos: [
            {
              id: 1,
              img_src: 'https://mars.nasa.gov/photo.jpg',
              camera: { full_name: 'Front Hazard Avoidance Camera' },
            },
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('MarsRover Page', () => {
  test('renders heading and form elements', async () => {
    await act(async () => {
      render(<MarsRover />);
    });

    expect(screen.getByText('Mars Rover Photos')).toBeInTheDocument();
    expect(screen.getByLabelText(/camera/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/earth date/i)).toBeInTheDocument();
  });

  test('loads photos on mount', async () => {
    await act(async () => {
      render(<MarsRover />);
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    const photoCard = await screen.findByText(/front hazard/i);
    expect(photoCard).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('mars.nasa.gov'));
  });

  test('shows error if no photos returned', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ photos: [] }),
      })
    );

    await act(async () => {
      render(<MarsRover />);
    });

    const errorMsg = await screen.findByText(/no photos found/i);
    expect(errorMsg).toBeInTheDocument();
  });

  test('calls fetch when form is submitted', async () => {
    await act(async () => {
      render(<MarsRover />);
    });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2); // initial load + form submission
    });
  });
});
