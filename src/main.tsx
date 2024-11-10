import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ErrorBoundary from "@/containers/ErrorBoundary/ErrorBoundary.tsx";
import QueryContainer from "@/containers/QueryContainer.tsx";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <QueryContainer>
                    <App />
                </QueryContainer>
            </BrowserRouter>
        </ErrorBoundary>
    </StrictMode>
);
