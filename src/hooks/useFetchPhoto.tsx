import { useMemo } from "react";

import { QUERY_KEYS } from "@/services/api/constants.ts";
import { fetchPhoto } from "@/services/api/pexelsApi";
import { Photo } from "@/services/api/types.ts";
import { useQuery } from "@tanstack/react-query";

export const useFetchPhoto = (id: string) => {
    const { data, refetch, isFetching, isLoading, isError, isRefetchError, isLoadingError, error } = useQuery<Photo>({
        queryKey: [QUERY_KEYS.PHOTOS.GET_PHOTO, id],
        queryFn: () => fetchPhoto(id),
        retry: 1,
    });

    const hasError = useMemo(
        () => isError || isRefetchError || isLoadingError,
        [isError, isRefetchError, isLoadingError]
    );

    return {
        photo: data,
        refetch,
        isFetching,
        isLoading,
        error,
        hasError,
    };
};
