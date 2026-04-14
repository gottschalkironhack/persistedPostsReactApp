import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FavoritePostsTable } from "./FavoritePostsTable";
import { FavoritePost } from "../types";

const makeFavorite = (id: number, removed = false): FavoritePost => ({
  userId: 1,
  id,
  title: `Post ${id}`,
  body: `Body ${id}`,
  removedFromApi: removed,
});

describe("FavoritePostsTable", () => {
  it("renders the section title", () => {
    render(<FavoritePostsTable favorites={[]} onToggleFavorite={vi.fn()} />);

    expect(screen.getByText("Favorite Posts")).toBeInTheDocument();
  });

  it("renders favorite posts", () => {
    const favorites = [makeFavorite(1), makeFavorite(2)];

    render(
      <FavoritePostsTable favorites={favorites} onToggleFavorite={vi.fn()} />
    );

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  it("shows empty message when no favorites", () => {
    render(<FavoritePostsTable favorites={[]} onToggleFavorite={vi.fn()} />);

    expect(
      screen.getByText("No favorite posts yet. Mark posts as favorites from the table above.")
    ).toBeInTheDocument();
  });

  it("shows 'Removed from API' badge for removed posts", () => {
    render(
      <FavoritePostsTable
        favorites={[makeFavorite(1, true)]}
        onToggleFavorite={vi.fn()}
      />
    );

    expect(screen.getByText("Removed from API")).toBeInTheDocument();
  });

  it("calls onToggleFavorite when clicking remove button", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const fav = makeFavorite(1);

    render(
      <FavoritePostsTable favorites={[fav]} onToggleFavorite={onToggle} />
    );

    await user.click(screen.getByText("Remove"));

    expect(onToggle).toHaveBeenCalledWith(fav);
  });
});
