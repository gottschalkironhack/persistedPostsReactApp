import { ReactElement } from "react";
import { FavoritePost, Column } from "../types";
import { Table } from "./Table";
import styled from "styled-components";

interface FavoritePostsTableProps {
  favorites: FavoritePost[];
  onToggleFavorite: (post: FavoritePost) => void;
}

const Section = styled.section`
  margin-top: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 0.8rem;
  color: #3b2063;
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 3px 8px;
  background: #ff9ff3;
  color: #3b2063;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.4rem;
  border: 2px solid #3b2063;
  margin-left: 8px;
  vertical-align: middle;
  text-transform: uppercase;
`;

const RemoveButton = styled.button`
  padding: 6px 10px;
  border: 2px solid #3b2063;
  background: #ff6b8a;
  color: #fff;
  cursor: pointer;
  font-size: 0.45rem;
  text-transform: uppercase;
  box-shadow: 3px 3px 0 #3b2063;
  transition: all 0.1s ease;

  &:hover {
    background: #ee5a6f;
    transform: translate(1px, 1px);
    box-shadow: 2px 2px 0 #3b2063;
  }

  &:active {
    transform: translate(3px, 3px);
    box-shadow: none;
  }
`;

const COLUMNS: Column<FavoritePost>[] = [
  { key: "id", header: "ID", width: "80px" },
  { key: "userId", header: "User ID", width: "100px" },
  { key: "title", header: "Title" },
];

export const FavoritePostsTable = ({ favorites, onToggleFavorite }: FavoritePostsTableProps): ReactElement => (
  <Section>
    <SectionTitle>Favorite Posts</SectionTitle>
    <Table
      columns={COLUMNS}
      data={favorites}
      keyExtractor={(post) => post.id}
      emptyMessage="No favorite posts yet. Mark posts as favorites from the table above."
      rowHighlight={(post) => post.removedFromApi}
      rowActionContent={(post: FavoritePost): ReactElement => (
        <>
          {post.removedFromApi && <Badge>Removed from API</Badge>}
          <RemoveButton
            onClick={() => onToggleFavorite(post)}
            aria-label={`Remove post ${post.id} from favorites`}
          >
            Remove
          </RemoveButton>
        </>
      )}
    />
  </Section>
);
