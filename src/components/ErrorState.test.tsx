import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  it("renders the error message", () => {
    render(<ErrorState message="Something failed" onRetry={vi.fn()} />);

    expect(screen.getByText("Something failed")).toBeInTheDocument();
  });

  it("renders a retry button", () => {
    render(<ErrorState message="Error" onRetry={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(<ErrorState message="Error" onRetry={onRetry} />);
    await user.click(screen.getByRole("button", { name: "Retry" }));

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("has an alert role for accessibility", () => {
    render(<ErrorState message="Error" onRetry={vi.fn()} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
