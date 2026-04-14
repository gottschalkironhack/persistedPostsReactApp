import { ReactElement } from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 20px 0;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  border: 3px solid #3b2063;
  background: ${({ $active }) => ($active ? "#b088f9" : "#fef0ff")};
  color: ${({ $active }) => ($active ? "#fff" : "#3b2063")};
  cursor: pointer;
  font-size: 0.5rem;
  text-transform: uppercase;
  box-shadow: ${({ $active }) =>
    $active ? "inset 2px 2px 0 #8b5cf6" : "3px 3px 0 #3b2063"};
  transition: all 0.1s ease;

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? "#9b6dff" : "#f3e5f5")};
    transform: translate(1px, 1px);
    box-shadow: ${({ $active }) =>
      $active ? "inset 2px 2px 0 #7c3aed" : "2px 2px 0 #3b2063"};
  }

  &:active:not(:disabled) {
    transform: translate(3px, 3px);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 0.5rem;
  color: #7c5a9b;
  padding: 0 4px;
  font-family: 'Press Start 2P', cursive;
`;

const visiblePageNumbers = (current: number, total: number): number[] => {
  // delta is the number of pages to show before and after the current page
  // we show 2 pages before and after the current page
  const delta = 2;
  const start = Math.max(1, current - delta);
  const end = Math.min(total, current + delta);
  const pages: number[] = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps): ReactElement | null => {
  if (totalPages <= 1) return null;

  const pages: number[] = visiblePageNumbers(currentPage, totalPages);

  return (
    <Container>
      <PageButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        First
      </PageButton>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Prev
      </PageButton>

      {pages[0] > 1 && <PageInfo>...</PageInfo>}

      {pages.map((page) => (
        <PageButton
          key={page}
          $active={page === currentPage}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </PageButton>
      ))}

      {pages[pages.length - 1] < totalPages && <PageInfo>...</PageInfo>}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </PageButton>
      <PageButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        Last
      </PageButton>
    </Container>
  );
};
