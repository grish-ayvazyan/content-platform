import { useParams } from "react-router-dom";

import ArrowBack from "@/assets/icons/back-arrow.svg";
import Loader from "@/components/ui/Loader";
import ErrorComponent from "@/containers/ErrorBoundary/ErrorComponent.tsx";
import { useFetchPhoto } from "@/hooks/useFetchPhoto.tsx";
import PhotoDetail from "@/pages/Photo/components/PhotoDetail";
import { PhotoDetailWrapper, StyledLink } from "@/pages/Photo/styles.ts";
import { ROUTES_CONFIG } from "@/routes";
import { UNEXPECTED_ERROR_OCCURRED } from "@/services/api/constants.ts";

const Photo = () => {
    const { photoId } = useParams();
    const { photo, refetch, isFetching, error, hasError } = useFetchPhoto(photoId || "");

    return (
        <PhotoDetailWrapper>
            <StyledLink to={ROUTES_CONFIG.PHOTO_GRID.ROOT}>
                <ArrowBack />
                Back to Photos
            </StyledLink>
            {hasError && (
                <ErrorComponent errorMessage={error?.message || UNEXPECTED_ERROR_OCCURRED} handleRetry={refetch} />
            )}
            {isFetching ? <Loader /> : photo && <PhotoDetail photo={photo} />}
        </PhotoDetailWrapper>
    );
};

export default Photo;
