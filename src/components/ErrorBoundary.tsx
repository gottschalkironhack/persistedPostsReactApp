import { Component, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  margin: 24px;
  background: #fef0ff;
  border: 3px solid #3b2063;
  box-shadow: 6px 6px 0px #3b2063;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 0.75rem;
  color: #ff6b8a;
  margin: 0 0 16px;
  text-transform: uppercase;
`;

const Message = styled.p`
  font-size: 0.75rem;
  color: #3b2063;
  margin: 0 0 24px;
  max-width: 500px;
  line-height: 1.8;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 700;
`;

const ReloadButton = styled.button`
  padding: 12px 28px;
  background: #a3f7bf;
  color: #3b2063;
  border: 3px solid #3b2063;
  cursor: pointer;
  font-size: 0.6rem;
  text-transform: uppercase;
  box-shadow: 4px 4px 0px #3b2063;
  transition: all 0.1s ease;

  &:hover {
    background: #7bed9f;
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #3b2063;
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: none;
  }
`;

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReload = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <Container role="alert">
        <Title>Something went wrong</Title>
        <Message>
          {this.state.error?.message || "An unexpected error occurred while rendering this page."}
        </Message>
        <ReloadButton onClick={this.handleReload}>Try Again</ReloadButton>
      </Container>
    );
  }
}
