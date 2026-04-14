import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  storedFavorites,
  persistFavorites,
  toggledFavorite,
  isFavorite,
} from "./storeFavorites";
import { FavoritePost } from "../types";

const makeFavorite = (id: number, removed = false): FavoritePost => ({
  userId: 1,
  id,
  title: `Post ${id}`,
  body: `Body ${id}`,
  removedFromApi: removed,
});

describe("storedFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty array when nothing stored", () => {
    expect(storedFavorites()).toEqual([]);
  });

  it("returns parsed favorites from localStorage", () => {
    const favorites = [makeFavorite(1)];
    localStorage.setItem("favorite-posts", JSON.stringify(favorites));

    expect(storedFavorites()).toEqual(favorites);
  });

  it("returns empty array on corrupted JSON", () => {
    localStorage.setItem("favorite-posts", "not-json");

    expect(storedFavorites()).toEqual([]);
  });
});

describe("persistFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("writes favorites to localStorage", () => {
    const favorites = [makeFavorite(1), makeFavorite(2)];
    persistFavorites(favorites);

    const stored = JSON.parse(localStorage.getItem("favorite-posts")!);
    expect(stored).toEqual(favorites);
  });

  it("handles localStorage errors gracefully", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceeded");
    });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    persistFavorites([makeFavorite(1)]);

    expect(consoleSpy).toHaveBeenCalledWith("Failed to persist favorites to localStorage");

    spy.mockRestore();
    consoleSpy.mockRestore();
  });
});

describe("toggledFavorite", () => {
  it("adds a post to empty favorites", () => {
    const post = makeFavorite(1);
    const result = toggledFavorite(post, []);

    expect(result).toEqual([post]);
  });

  it("removes a post that already exists in favorites", () => {
    const post = makeFavorite(1);
    const result = toggledFavorite(post, [post, makeFavorite(2)]);

    expect(result).toEqual([makeFavorite(2)]);
  });

  it("does not mutate the original array", () => {
    const original = [makeFavorite(1)];
    const frozen = [...original];
    toggledFavorite(makeFavorite(2), original);

    expect(original).toEqual(frozen);
  });
});

describe("isFavorite", () => {
  it("returns true when post is in favorites", () => {
    expect(isFavorite(1, [makeFavorite(1)])).toBe(true);
  });

  it("returns false when post is not in favorites", () => {
    expect(isFavorite(99, [makeFavorite(1)])).toBe(false);
  });

  it("returns false for empty favorites", () => {
    expect(isFavorite(1, [])).toBe(false);
  });
});
