import { ReactElement } from "react";
import styled from "styled-components";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Container = styled.div`
  position: relative;
  max-width: 360px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px 10px 40px;
  border: 3px solid #3b2063;
  font-size: 0.85rem;
  background: #fef0ff;
  color: #3b2063;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 700;
  box-sizing: border-box;
  box-shadow: 4px 4px 0px #3b2063;
  transition: box-shadow 0.1s ease, transform 0.1s ease;

  &:focus {
    outline: none;
    background: #fff;
    box-shadow: 2px 2px 0px #3b2063;
    transform: translate(2px, 2px);
  }

  &::placeholder {
    color: #b088f9;
    font-weight: 600;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #b088f9;
  font-size: 0.95rem;
  pointer-events: none;
`;

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search by title...",
}: SearchInputProps): ReactElement => (
  <Container>
    <SearchIcon aria-hidden="true">&#x1F50D;</SearchIcon>
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search posts by title"
    />
  </Container>
);
