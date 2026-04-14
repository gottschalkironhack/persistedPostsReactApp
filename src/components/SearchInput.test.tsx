import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("renders with the current value", () => {
    render(<SearchInput value="hello" onChange={vi.fn()} />);

    expect(screen.getByDisplayValue("hello")).toBeInTheDocument();
  });

  it("renders with default placeholder", () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    expect(screen.getByPlaceholderText("Search by title...")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(<SearchInput value="" onChange={vi.fn()} placeholder="Find posts..." />);

    expect(screen.getByPlaceholderText("Find posts...")).toBeInTheDocument();
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SearchInput value="" onChange={onChange} />);

    await user.type(screen.getByRole("textbox"), "test");

    expect(onChange).toHaveBeenCalledTimes(4);
    expect(onChange).toHaveBeenLastCalledWith("t");
  });

  it("has accessible label", () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    expect(screen.getByLabelText("Search posts by title")).toBeInTheDocument();
  });
});
