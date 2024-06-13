import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App, { splitInThree } from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText("Labseq number generator")).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');
  });

  test('handles button click', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('123456'),
      })
    );

    render(<App />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => screen.getByText(/Result: 654 321/i));
  });
});

describe('splitInThree', () => {
  test('splits number into chunks of three', () => {
    expect(splitInThree(123456)).toBe('654 321');
  });
});