import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostsTable } from "./PostsTable";
import { Post, FavoritePost } from "../types";

const makePost = (id: number): Post => ({
  userId: 1,
  id,
  title: `Post ${id}`,
  body: `Body ${id}`,
});

const makeFavorite = (id: number): FavoritePost => ({
  ...makePost(id),
  removedFromApi: false,
});

describe("PostsTable", () => {
  it("renders posts with correct columns", () => {
    const posts = [makePost(1), makePost(2)];

    render(
      <PostsTable posts={posts} favorites={[]} onToggleFavorite={vi.fn()} />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("User ID")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  it("shows Favorite button for non-favorited posts", () => {
    render(
      <PostsTable posts={[makePost(1)]} favorites={[]} onToggleFavorite={vi.fn()} />
    );

    expect(screen.getByText("Favorite")).toBeInTheDocument();
  });

  it("shows Unfavorite button for favorited posts", () => {
    render(
      <PostsTable
        posts={[makePost(1)]}
        favorites={[makeFavorite(1)]}
        onToggleFavorite={vi.fn()}
      />
    );

    expect(screen.getByText("Unfavorite")).toBeInTheDocument();
  });

  it("calls onToggleFavorite when clicking favorite button", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const post = makePost(1);

    render(
      <PostsTable posts={[post]} favorites={[]} onToggleFavorite={onToggle} />
    );

    await user.click(screen.getByText("Favorite"));

    expect(onToggle).toHaveBeenCalledWith(post);
  });

  it("shows empty message when no posts", () => {
    render(
      <PostsTable posts={[]} favorites={[]} onToggleFavorite={vi.fn()} />
    );

    expect(screen.getByText("No posts match your search")).toBeInTheDocument();
  });
});
