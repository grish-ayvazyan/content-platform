import React from "react";

import { ErrorContainer, ErrorHeading, ErrorMessage, ReloadButton } from "@/containers/ErrorBoundary/styles.ts";

interface ErrorComponentProps {
    errorMessage: string;
    handleRetry?: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage, handleRetry }) => {
    return (
        <ErrorContainer>
            <ErrorHeading>Oops! Something went wrong.</ErrorHeading>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <ReloadButton onClick={handleRetry}>Retry again</ReloadButton>
        </ErrorContainer>
    );
};

ErrorComponent.displayName = "ErrorComponent";

export default ErrorComponent;
