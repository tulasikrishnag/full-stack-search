import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Search } from "./search";

describe("Country", () => {
  test("should render the component as expected", () => {
    render(<Search />);
    const placeholder = screen.getByPlaceholderText("Search accommodation...");
    expect(placeholder).toBeInTheDocument();
  });
});
