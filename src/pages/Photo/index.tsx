import { useParams } from "react-router-dom";

import ArrowBack from "@/assets/icons/back-arrow.svg";
import Loader from "@/components/ui/Loader";
import { useFetchPhoto } from "@/hooks/useFetchPhoto.tsx";
import PhotoDetail from "@/pages/Photo/components/PhotoDetail";
import { PhotoDetailWrapper, StyledLink } from "@/pages/Photo/styles.ts";
import { ROUTES_CONFIG } from "@/routes";

const Photo = () => {
    const { photoId } = useParams();
    const { photo, isFetching } = useFetchPhoto(photoId || "");

    return (
        <PhotoDetailWrapper>
            <StyledLink to={ROUTES_CONFIG.PHOTO_GRID.ROOT}>
                <ArrowBack />
                Back to Photos
            </StyledLink>
            {isFetching ? <Loader /> : photo && <PhotoDetail photo={photo} />}
        </PhotoDetailWrapper>
    );
};

export default Photo;
