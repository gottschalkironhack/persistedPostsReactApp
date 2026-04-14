export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface FavoritePost extends Post {
  removedFromApi: boolean;
}

export type SortDirection = "asc" | "desc";

export interface Column<T> {
  key: keyof T;
  header: string;
  width?: string;
}
