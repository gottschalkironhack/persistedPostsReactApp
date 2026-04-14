import { ReactElement } from "react";
import styled, { keyframes } from "styled-components";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const wobble = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background: #fef0ff;
  border: 3px solid #3b2063;
  box-shadow: 6px 6px 0px #3b2063;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 16px;
  color: #ff6b8a;
  font-family: 'Press Start 2P', cursive;
  animation: ${wobble} 0.5s ease-in-out infinite;
`;

const Message = styled.p`
  font-size: 0.75rem;
  color: #3b2063;
  margin: 0 0 24px;
  max-width: 400px;
  line-height: 1.8;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 700;
`;

const RetryButton = styled.button`
  padding: 12px 28px;
  background: #ff9ff3;
  color: #3b2063;
  border: 3px solid #3b2063;
  cursor: pointer;
  font-size: 0.6rem;
  text-transform: uppercase;
  box-shadow: 4px 4px 0px #3b2063;
  transition: all 0.1s ease;

  &:hover {
    background: #f368e0;
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #3b2063;
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: none;
  }
`;

export const ErrorState = ({ message, onRetry }: ErrorStateProps): ReactElement => (
  <Container role="alert">
    <Icon aria-hidden="true">GAME OVER</Icon>
    <Message>{message}</Message>
    <RetryButton onClick={onRetry}>Retry</RetryButton>
  </Container>
);
