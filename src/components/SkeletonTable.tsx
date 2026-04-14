import { ReactElement } from "react";
import styled, { keyframes } from "styled-components";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fef0ff;
  border: 3px solid #3b2063;
  box-shadow: 6px 6px 0px #3b2063;
`;

const Th = styled.th`
  padding: 12px 14px;
  background: #c9a0dc;
  border-bottom: 3px solid #3b2063;
  border-right: 2px solid #3b2063;

  &:last-child {
    border-right: none;
  }
`;

const Td = styled.td`
  padding: 10px 14px;
  border-bottom: 2px dashed #d5b8e8;
  border-right: 2px dashed #d5b8e8;

  &:last-child {
    border-right: none;
  }
`;

const SkeletonBar = styled.div<{ $width?: string }>`
  height: 14px;
  width: ${({ $width }) => $width || "100%"};
  background: #d5b8e8;
  animation: ${blink} 1s infinite ease-in-out;
  border: 2px solid #c9a0dc;
`;

const HeaderBar = styled(SkeletonBar)`
  height: 12px;
  width: 60%;
  background: #b088f9;
  border-color: #9b6dff;
`;

export const SkeletonTable = ({ rows = 10, columns = 4 }: SkeletonTableProps): ReactElement => (
  <StyledTable>
    <thead>
      <tr>
        {Array.from({ length: columns }, (_, i) => (
          <Th key={i}>
            <HeaderBar />
          </Th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: rows }, (_, rowIdx) => (
        <tr key={rowIdx}>
          {Array.from({ length: columns }, (_, colIdx) => (
            <Td key={colIdx}>
              <SkeletonBar $width={colIdx === 2 ? "80%" : "50%"} />
            </Td>
          ))}
        </tr>
      ))}
    </tbody>
  </StyledTable>
);
