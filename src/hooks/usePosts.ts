import { useState, useEffect, useCallback } from "react";
import { Post, FavoritePost } from "../types";
import { fetchedPosts } from "../api/postsApi";
import {
  storedFavorites,
  persistFavorites,
  toggledFavorite,
} from "../helpers/storeFavorites";
import { reconciledFavorites } from "../helpers/comparePosts";

interface UsePostsReturn {
  posts: Post[];
  favorites: FavoritePost[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  currentPage: number;
  searchQuery: string;
  filteredPosts: Post[];
  paginatedPosts: Post[];
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  refresh: () => void;
  retry: () => void;
  toggleFavorite: (post: Post) => void;
}

const ITEMS_PER_PAGE: number = 10;

const postsMatchingQuery = (posts: Post[], query: string): Post[] => {
  if (!query.trim()) return posts;
  const lower: string = query.toLowerCase();
  return posts.filter((post: Post): boolean => post.title.toLowerCase().includes(lower));
};

const postsForPage = (posts: Post[], page: number): Post[] => {
  const start: number = (page - 1) * ITEMS_PER_PAGE;
  return posts.slice(start, start + ITEMS_PER_PAGE);
};

const pageCount = (totalItems: number): number =>
  Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [favorites, setFavorites] = useState<FavoritePost[]>(storedFavorites);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const loadPosts = useCallback(async (isRefresh: boolean): Promise<void> => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const data: Post[] = await fetchedPosts();
      setPosts(data);

      setFavorites((prev: FavoritePost[]): FavoritePost[] => {
        // reconcile the favorites with the posts
        const reconciled: FavoritePost[] = reconciledFavorites(prev, data);
        persistFavorites(reconciled);
        return reconciled;
      });

      setCurrentPage(1);
    } catch (err: unknown) {
      const message: string = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect((): void => {
    loadPosts(false);
  }, [loadPosts]);

  const refresh = useCallback((): void => {
    loadPosts(true);
  }, [loadPosts]);

  const retry = useCallback((): void => {
    loadPosts(false);
  }, [loadPosts]);

  const toggleFavorite = useCallback((post: Post): void => {
    setFavorites((prev: FavoritePost[]): FavoritePost[] => {
      const favoritePost: FavoritePost = { ...post, removedFromApi: false };
      const updated: FavoritePost[] = toggledFavorite(favoritePost, prev);
      persistFavorites(updated);
      return updated;
    });
  }, []);

  const handleSetSearchQuery = useCallback((query: string): void => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const filteredPosts = postsMatchingQuery(posts, searchQuery);
  const totalPages = pageCount(filteredPosts.length);
  const paginatedPosts = postsForPage(filteredPosts, currentPage);

  return {
    posts,
    favorites,
    isLoading,
    isRefreshing,
    error,
    currentPage,
    searchQuery,
    filteredPosts,
    paginatedPosts,
    totalPages,
    setCurrentPage,
    setSearchQuery: handleSetSearchQuery,
    refresh,
    retry,
    toggleFavorite,
  };
};
