import { Component } from "react";
import ErrorFallback from "./ErrorFallback";

/**
 * Error Boundary Component (Class-based - required by React)
 * Note: React doesn't support error boundaries in functional components yet.
 * This is a minimal wrapper that delegates UI rendering to functional components.
 */
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Log to error reporting service here (e.g., Sentry, LogRocket)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          resetError={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
