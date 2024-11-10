import { Component, ErrorInfo, ReactNode } from "react";

import ErrorComponent from "@/containers/ErrorBoundary/ErrorComponent.tsx";
import { UNEXPECTED_ERROR_OCCURRED } from "@/services/api/constants.ts";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    handleRetry?: () => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
        if (this.props.handleRetry) {
            this.props.handleRetry();
        }
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <ErrorComponent
                    errorMessage={this.state.error?.message || UNEXPECTED_ERROR_OCCURRED}
                    handleRetry={this.handleRetry}
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
