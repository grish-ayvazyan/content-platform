import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Loader from "@/components/ui/Loader";
import { ROUTES_CONFIG } from "@/routes";

const Photos = lazy(() => import("./pages/Photos"));
const Photo = lazy(() => import("./pages/Photo"));

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path={ROUTES_CONFIG.PHOTO_GRID.ROOT} element={<Photos />} />
                <Route path={ROUTES_CONFIG.PHOTO_GRID.PHOTO_DETAIL} element={<Photo />} />
                <Route path="*" element={<Navigate to={ROUTES_CONFIG.PHOTO_GRID.ROOT} replace />} />
            </Routes>
        </Suspense>
    );
}

export default App;
