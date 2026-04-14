import { ReactElement } from "react";
import { Post, FavoritePost, Column } from "../types";
import { Table } from "./Table";
import { isFavorite } from "../helpers/storeFavorites";
import styled from "styled-components";

interface PostsTableProps {
  posts: Post[];
  favorites: FavoritePost[];
  onToggleFavorite: (post: Post) => void;
}

const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  padding: 6px 10px;
  border: 2px solid #3b2063;
  background: ${({ $isFavorite }) => ($isFavorite ? "#ffeaa7" : "#fef0ff")};
  color: #3b2063;
  cursor: pointer;
  font-size: 0.45rem;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: ${({ $isFavorite }) =>
    $isFavorite ? "inset 2px 2px 0 #f9ca24" : "3px 3px 0 #3b2063"};
  transition: all 0.1s ease;

  &:hover {
    background: ${({ $isFavorite }) => ($isFavorite ? "#fdcb6e" : "#f3e5f5")};
    transform: translate(1px, 1px);
    box-shadow: ${({ $isFavorite }) =>
      $isFavorite ? "inset 2px 2px 0 #e1b12c" : "2px 2px 0 #3b2063"};
  }

  &:active {
    transform: translate(3px, 3px);
    box-shadow: none;
  }
`;

const COLUMNS: Column<Post>[] = [
  { key: "id", header: "ID", width: "80px" },
  { key: "userId", header: "User ID", width: "100px" },
  { key: "title", header: "Title" },
];

export const PostsTable = ({ posts, favorites, onToggleFavorite }: PostsTableProps): ReactElement => (
  <Table
    columns={COLUMNS}
    data={posts}
    keyExtractor={(post) => post.id}
    emptyMessage="No posts match your search"
    rowActionContent={(post: Post): ReactElement => (
      <FavoriteButton
        $isFavorite={isFavorite(post.id, favorites)}
        onClick={() => onToggleFavorite(post)}
        aria-label={
          isFavorite(post.id, favorites)
            ? `Remove post ${post.id} from favorites`
            : `Add post ${post.id} to favorites`
        }
      >
        {isFavorite(post.id, favorites) ? "Unfavorite" : "Favorite"}
      </FavoriteButton>
    )}
  />
);
