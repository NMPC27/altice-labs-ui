import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { expect as chaiExpect } from "chai"; // Import Chai's expect

import App from "./App";

describe("App component", () => {
  it("renders without crashing", () => {
    render(<App />);
    chaiExpect(screen.getByText("Labseq number generator")).to.exist;
  });

  it("updates input value on change", () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "123" } });
    chaiExpect(input.value).to.equal("123");
  });

  it("displays result on button click", async () => {
    // Mock the fetch function
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve("123456"),
      }),
    );

    render(<App />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "123" } });

    const button = screen.getByRole("button", { name: /ok/i });
    fireEvent.click(button);

    const result = await screen.findByText(/Result:/);
    chaiExpect(result.textContent).to.equal("Result: 123 456");

    // Restore the original fetch implementation
    global.fetch.mockRestore();
  });

  it("displays error message on fetch failure", async () => {
    // Mock the fetch function to simulate a failure
    global.fetch = vi.fn(() => Promise.reject(new Error("Fetch failed")));

    render(<App />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "123" } });

    const button = screen.getByRole("button", { name: /ok/i });
    fireEvent.click(button);

    const result = await screen.findByText(/Error/);
    chaiExpect(result.textContent).to.equal(
      "Result: Error: Couldn't connect to API",
    );

    // Restore the original fetch implementation
    global.fetch.mockRestore();
  });
});
