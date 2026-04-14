import { ReactNode, ReactElement } from "react";
import styled from "styled-components";
import { Column } from "../types";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  rowActionContent?: (item: T) => ReactNode;
  emptyMessage?: string;
  rowHighlight?: (item: T) => boolean;
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fef0ff;
  border: 3px solid #3b2063;
  box-shadow: 6px 6px 0px #3b2063;
`;

const Th = styled.th<{ $width?: string }>`
  text-align: left;
  padding: 12px 14px;
  background: #c9a0dc;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.55rem;
  color: #3b2063;
  border-bottom: 3px solid #3b2063;
  border-right: 2px solid #3b2063;
  width: ${({ $width }) => $width || "auto"};
  text-transform: uppercase;
  letter-spacing: 1px;

  &:last-child {
    border-right: none;
  }
`;

const Td = styled.td`
  padding: 10px 14px;
  border-bottom: 2px dashed #d5b8e8;
  border-right: 2px dashed #d5b8e8;
  font-size: 0.85rem;
  color: #3b2063;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;

  &:last-child {
    border-right: none;
  }
`;

const Tr = styled.tr<{ $highlight?: boolean }>`
  background: ${({ $highlight }) => ($highlight ? "#fff0b3" : "transparent")};

  &:hover {
    background: ${({ $highlight }) => ($highlight ? "#ffe580" : "#f3e5f5")};
  }

  &:nth-child(even) {
    background: ${({ $highlight }) => ($highlight ? "#fff0b3" : "#f8eafc")};

    &:hover {
      background: ${({ $highlight }) => ($highlight ? "#ffe580" : "#f0daf5")};
    }
  }
`;

const EmptyRow = styled.td`
  padding: 32px 16px;
  text-align: center;
  color: #7c5a9b;
  font-size: 0.6rem;
  font-family: 'Press Start 2P', cursive;
  line-height: 1.8;
`;

export const Table = <T,>({
  columns,
  data,
  keyExtractor,
  rowActionContent,
  emptyMessage = "No data available",
  rowHighlight,
}: TableProps<T>): ReactElement => {
  const showActionsColumn: boolean = !!rowActionContent;

  return (
    <StyledTable>
      <thead>
        <tr>
          {columns.map((col) => (
            <Th key={String(col.key)} $width={col.width}>
              {col.header}
            </Th>
          ))}
          {showActionsColumn && <Th $width="100px">Actions</Th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <EmptyRow colSpan={columns.length + (showActionsColumn ? 1 : 0)}>
              {emptyMessage}
            </EmptyRow>
          </tr>
        ) : (
          data.map((item) => (
            <Tr
              key={keyExtractor(item)}
              $highlight={rowHighlight?.(item)}
            >
              {columns.map((col) => (
                <Td key={String(col.key)}>{String(item[col.key])}</Td>
              ))}
              {showActionsColumn && rowActionContent && <Td>{rowActionContent(item)}</Td>}
            </Tr>
          ))
        )}
      </tbody>
    </StyledTable>
  );
};
