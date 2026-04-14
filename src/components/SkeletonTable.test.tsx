import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SkeletonTable } from "./SkeletonTable";

describe("SkeletonTable", () => {
  it("renders correct number of rows and columns", () => {
    const { container } = render(<SkeletonTable rows={5} columns={3} />);

    const tbody = container.querySelector("tbody");
    expect(tbody?.children).toHaveLength(5);
    expect(tbody?.children[0].children).toHaveLength(3);
  });

  it("uses default 10 rows and 4 columns", () => {
    const { container } = render(<SkeletonTable />);

    const tbody = container.querySelector("tbody");
    expect(tbody?.children).toHaveLength(10);
    expect(tbody?.children[0].children).toHaveLength(4);
  });

  it("renders a table element", () => {
    const { container } = render(<SkeletonTable />);

    expect(container.querySelector("table")).toBeInTheDocument();
  });
});
