import { expect, test, beforeEach, describe, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useLocation, useNavigate } from "react-router-dom";
import { City } from "./city";
import { vi } from "vitest";

vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

describe("City", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useLocation as any).mockReturnValue({
      pathname: "/city",
      state: { name: "London" },
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  test("should display the heading as expected", () => {
    render(<City />);
    const heading = screen.getByText("London");
    expect(heading).toBeInTheDocument();
  });
  test("should navigate to search page on button click", () => {
    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);
    render(<City />);
    const button = screen.getByRole("button", { name: "Back to Search" });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
