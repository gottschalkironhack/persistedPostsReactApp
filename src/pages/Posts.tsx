import { ReactElement } from "react";
import styled, { keyframes } from "styled-components";
import { usePosts } from "../hooks/usePosts";
import { PostsTable } from "../components/PostsTable";
import { FavoritePostsTable } from "../components/FavoritePostsTable";
import { Pagination } from "../components/Pagination";
import { SkeletonTable } from "../components/SkeletonTable";
import { ErrorState } from "../components/ErrorState";
import { SearchInput } from "../components/SearchInput";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

const PageContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 24px;
`;

const Header = styled.header`
  margin-bottom: 28px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.1rem;
  color: #3b2063;
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 3px;
  animation: ${float} 3s ease-in-out infinite;
  text-shadow: 3px 3px 0 #c9a0dc, 6px 6px 0 rgba(59, 32, 99, 0.15);
`;

const Subtitle = styled.p`
  font-size: 0.75rem;
  color: #7c5a9b;
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 700;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const RefreshButton = styled.button<{ $isRefreshing: boolean }>`
  padding: 10px 20px;
  background: ${({ $isRefreshing }) => ($isRefreshing ? "#c9a0dc" : "#a3f7bf")};
  color: #3b2063;
  border: 3px solid #3b2063;
  cursor: ${({ $isRefreshing }) => ($isRefreshing ? "not-allowed" : "pointer")};
  font-size: 0.55rem;
  text-transform: uppercase;
  box-shadow: ${({ $isRefreshing }) =>
    $isRefreshing ? "inset 2px 2px 0 #b088f9" : "4px 4px 0 #3b2063"};
  transition: all 0.1s ease;

  &:hover:not(:disabled) {
    background: #7bed9f;
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #3b2063;
  }

  &:active:not(:disabled) {
    transform: translate(4px, 4px);
    box-shadow: none;
  }
`;

const ResultCount = styled.span`
  font-size: 0.55rem;
  color: #7c5a9b;
  font-family: 'Press Start 2P', cursive;
`;

export const Posts = (): ReactElement => {
  const {
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
    setSearchQuery,
    refresh,
    retry,
    toggleFavorite,
  } = usePosts();

  if (isLoading) {
    return (
      <PageContainer>
        <Header>
          <Title>Posts</Title>
          <Subtitle>Loading posts from the API...</Subtitle>
        </Header>
        <SkeletonTable rows={10} columns={4} />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Header>
          <Title>Posts</Title>
          <Subtitle>Something went wrong</Subtitle>
        </Header>
        <ErrorState message={error} onRetry={retry} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>Posts</Title>
        <Subtitle>Browse and manage your favorite posts</Subtitle>
      </Header>

      <Toolbar>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ResultCount>
            {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} found
          </ResultCount>
          <RefreshButton
            $isRefreshing={isRefreshing}
            disabled={isRefreshing}
            onClick={refresh}
          >
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </RefreshButton>
        </div>
      </Toolbar>

      <PostsTable
        posts={paginatedPosts}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <FavoritePostsTable
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </PageContainer>
  );
};
