import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import QueryContainer from "@/containers/QueryContainer.tsx";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryContainer>
                <App />
            </QueryContainer>
        </BrowserRouter>
    </StrictMode>
);
