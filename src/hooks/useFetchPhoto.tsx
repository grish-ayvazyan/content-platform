import { QUERY_KEYS } from "@/services/api/constants.ts";
import { fetchPhoto } from "@/services/api/pexelsApi";
import { useQuery } from "@tanstack/react-query";
import { Photo } from "pexels";

export const useFetchPhoto = (id: string) => {
    const { data, isFetching, isLoading, isError, error } = useQuery<Photo>({
        queryKey: [QUERY_KEYS.PHOTOS.GET_PHOTO, id],
        queryFn: () => fetchPhoto(id),
    });

    return {
        photo: data,
        isFetching,
        isLoading,
        isError,
        error,
    };
};
