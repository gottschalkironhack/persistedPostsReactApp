import { describe, it, expect } from "vitest";
import { reconciledFavorites } from "./comparePosts";
import { Post, FavoritePost } from "../types";

const makePost = (id: number, title = `Post ${id}`): Post => ({
  userId: 1,
  id,
  title,
  body: `Body ${id}`,
});

const makeFavorite = (id: number, title = `Post ${id}`, removed = false): FavoritePost => ({
  userId: 1,
  id,
  title,
  body: `Body ${id}`,
  removedFromApi: removed,
});

describe("reconciledFavorites", () => {
  it("returns empty array when no favorites exist", () => {
    const result = reconciledFavorites([], [makePost(1), makePost(2)]);

    expect(result).toEqual([]);
  });

  it("updates favorite data when post still exists in API", () => {
    const favorites = [makeFavorite(1, "Old title")];
    const freshPosts = [makePost(1, "New title"), makePost(2)];

    const result = reconciledFavorites(favorites, freshPosts);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("New title");
    expect(result[0].removedFromApi).toBe(false);
  });

  it("marks favorite as removed when post no longer exists in API", () => {
    const favorites = [makeFavorite(99)];
    const freshPosts = [makePost(1), makePost(2)];

    const result = reconciledFavorites(favorites, freshPosts);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(99);
    expect(result[0].removedFromApi).toBe(true);
  });

  it("handles mix of existing and removed favorites", () => {
    const favorites = [makeFavorite(1), makeFavorite(50)];
    const freshPosts = [makePost(1, "Updated"), makePost(2)];

    const result = reconciledFavorites(favorites, freshPosts);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ id: 1, title: "Updated", removedFromApi: false });
    expect(result[1]).toMatchObject({ id: 50, removedFromApi: true });
  });

  it("does not mutate the input arrays", () => {
    const favorites = [makeFavorite(1)];
    const freshPosts = [makePost(1, "New")];
    const originalFav = [...favorites];

    reconciledFavorites(favorites, freshPosts);

    expect(favorites).toEqual(originalFav);
  });
});
