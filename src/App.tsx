import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Loader from "@/components/ui/Loader";
import { ROUTES_CONFIG } from "@/routes";

const PhotoGrid = lazy(() => import("./pages/PhotoGrid"));
const PhotoDetail = lazy(() => import("./pages/PhotoDetail"));

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path={ROUTES_CONFIG.PHOTO_GRID.ROOT} element={<PhotoGrid />} />
                <Route path={ROUTES_CONFIG.PHOTO_GRID.PHOTO_DETAIL} element={<PhotoDetail />} />
                <Route path="*" element={<Navigate to={ROUTES_CONFIG.PHOTO_GRID.ROOT} replace />} />
            </Routes>
        </Suspense>
    );
}

export default App;
