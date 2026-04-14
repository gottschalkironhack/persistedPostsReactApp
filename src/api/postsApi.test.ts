import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchedPosts } from "./postsApi";

const MOCK_POSTS = [
  { userId: 1, id: 1, title: "Post one", body: "Body one" },
  { userId: 1, id: 2, title: "Post two", body: "Body two" },
];

describe("fetchedPosts", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed posts on successful response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_POSTS,
    } as Response);

    const result = await fetchedPosts();

    expect(result).toEqual(MOCK_POSTS);
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts"
    );
  });

  it("throws on non-ok response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    await expect(fetchedPosts()).rejects.toThrow(
      "Failed to fetch posts: 500 Internal Server Error"
    );
  });

  it("propagates network errors", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network failure"));

    await expect(fetchedPosts()).rejects.toThrow("Network failure");
  });
});
