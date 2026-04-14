import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Posts } from "./Posts";
import * as postsApi from "../api/postsApi";
import { Post } from "../types";

const MOCK_POSTS: Post[] = Array.from({ length: 25 }, (_, i) => ({
  userId: 1,
  id: i + 1,
  title: `Post ${i + 1}`,
  body: `Body ${i + 1}`,
}));

describe("Posts page", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("shows skeleton loader while loading", () => {
    vi.spyOn(postsApi, "fetchedPosts").mockReturnValue(new Promise(() => {}));

    render(<Posts />);

    expect(screen.getByText("Loading posts from the API...")).toBeInTheDocument();
  });

  it("renders posts table after loading", async () => {
    vi.spyOn(postsApi, "fetchedPosts").mockResolvedValue(MOCK_POSTS);

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
    });

    const headings = screen.getAllByText("ID");
    expect(headings.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 10")).toBeInTheDocument();
  });

  it("shows error state on fetch failure", async () => {
    vi.spyOn(postsApi, "fetchedPosts").mockRejectedValue(new Error("Server down"));

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByText("Server down")).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("paginates and navigates between pages", async () => {
    const user = userEvent.setup();
    vi.spyOn(postsApi, "fetchedPosts").mockResolvedValue(MOCK_POSTS);

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
    });

    expect(screen.queryByText("Post 11")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Page 2" }));

    expect(screen.getByText("Post 11")).toBeInTheDocument();
    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
  });

  it("filters posts by search", async () => {
    const user = userEvent.setup();
    vi.spyOn(postsApi, "fetchedPosts").mockResolvedValue(MOCK_POSTS);

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText("Search posts by title"), "Post 25");

    await waitFor(() => {
      expect(screen.getByText("Post 25")).toBeInTheDocument();
    });
  });

  it("shows favorite posts section", async () => {
    vi.spyOn(postsApi, "fetchedPosts").mockResolvedValue(MOCK_POSTS);

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByText("Favorite Posts")).toBeInTheDocument();
    });
  });

  it("can favorite and unfavorite a post", async () => {
    const user = userEvent.setup();
    vi.spyOn(postsApi, "fetchedPosts").mockResolvedValue(MOCK_POSTS);

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
    });

    const mainTable = screen.getAllByRole("table")[0];
    const firstRow = within(mainTable).getAllByRole("row")[1];
    const favoriteBtn = within(firstRow).getByText("Favorite");
    await user.click(favoriteBtn);

    expect(within(firstRow).getByText("Unfavorite")).toBeInTheDocument();
  });

  it("shows refresh button and post count", async () => {
    vi.spyOn(postsApi, "fetchedPosts").mockResolvedValue(MOCK_POSTS);

    render(<Posts />);

    await waitFor(() => {
      expect(screen.getByText("Refresh")).toBeInTheDocument();
    });

    expect(screen.getByText("25 posts found")).toBeInTheDocument();
  });
});
