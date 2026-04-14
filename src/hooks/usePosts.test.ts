import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { usePosts } from "./usePosts";
import * as postsApi from "../api/postsApi";
import { Post } from "../types";

const MOCK_POSTS: Post[] = Array.from({ length: 25 }, (_, i) => ({
  userId: 1,
  id: i + 1,
  title: `Post ${i + 1}`,
  body: `Body ${i + 1}`,
}));

describe("usePosts", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("starts in loading state", () => {
    vi.spyOn(postsApi, "fetchedPosts").mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => usePosts());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.posts).toEqual([]);
  });

  it("loads posts on mount", async () => {
    vi.spyOn(postsApi, "fetchedPosts").mockResolvedValue(MOCK_POSTS);

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.posts).toEqual(MOCK_POSTS);
    expect(result.current.error).toBeNull();
  });

  it("sets error on fetch failure", async () => {
    vi.spyOn(postsApi, "fetchedPosts").mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.posts).toEqual([]);
  });

  it("paginates posts (10 per page)", async () => {
    vi.spyOn(postsApi, "fetchedPosts").mockResolvedValue(MOCK_POSTS);

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.paginatedPosts).toHaveLength(10);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.currentPage).toBe(1);
  });

  it("changes page", async () => {
    vi.spyOn(postsApi, "fetchedPosts").mockResolvedValue(MOCK_POSTS);

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedPosts[0].id).toBe(11);
  });

  it("filters posts by search query", async () => {
    vi.spyOn(postsApi, "fetchedPosts").mockResolvedValue(MOCK_POSTS);

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.setSearchQuery("Post 1");
    });

    expect(result.current.filteredPosts.length).toBeGreaterThan(0);
    expect(result.current.filteredPosts.every((p) => p.title.includes("Post 1"))).toBe(true);
    expect(result.current.currentPage).toBe(1);
  });

  it("toggles favorites", async () => {
    vi.spyOn(postsApi, "fetchedPosts").mockResolvedValue(MOCK_POSTS);

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.toggleFavorite(MOCK_POSTS[0]);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe(1);

    act(() => {
      result.current.toggleFavorite(MOCK_POSTS[0]);
    });

    expect(result.current.favorites).toHaveLength(0);
  });

  it("refreshes posts and resets to page 1", async () => {
    vi.spyOn(postsApi, "fetchedPosts").mockResolvedValue(MOCK_POSTS);

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.setCurrentPage(3);
    });

    expect(result.current.currentPage).toBe(3);

    await act(async () => {
      result.current.refresh();
    });

    await waitFor(() => {
      expect(result.current.isRefreshing).toBe(false);
    });

    expect(result.current.currentPage).toBe(1);
  });
});
