import { expect, test, beforeEach, describe, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Country } from "./country";
import { vi } from "vitest";

vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

describe("Country", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useLocation as any).mockReturnValue({
      pathname: "/country",
      state: { name: "United Kingdom" },
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  test("should display the heading as expected", () => {
    render(<Country />);
    const heading = screen.getByText("United Kingdom");
    expect(heading).toBeInTheDocument();
  });
  test("should navigate to search page on button click", () => {
    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);
    render(<Country />);
    const button = screen.getByRole("button", { name: "Back to Search" });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
