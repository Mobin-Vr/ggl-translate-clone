import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CharCounter from "./CharCounter";

describe("CharCounter", () => {
  it("renders the current length and the max length", () => {
    render(<CharCounter currentLength={5} />);
    expect(screen.getByText("5 / 1,000")).toBeInTheDocument();
  });

  it("renders 0 / 1,000 for an empty input", () => {
    render(<CharCounter currentLength={0} />);
    expect(screen.getByText("0 / 1,000")).toBeInTheDocument();
  });

  it("renders the max length when the input is at the limit", () => {
    render(<CharCounter currentLength={1000} />);
    expect(screen.getByText("1,000 / 1,000")).toBeInTheDocument();
  });
});