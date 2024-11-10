import { useMemo } from "react";

import { QUERY_KEYS } from "@/services/api/constants.ts";
import { fetchPhotos } from "@/services/api/pexelsApi";
import { PhotosWithTotalResults } from "@/services/api/types.ts";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchPhotos = () => {
    const {
        data,
        error,
        isFetchingNextPage,
        isFetchNextPageError,
        isFetching,
        isError,
        isRefetchError,
        isLoadingError,
        refetch,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: [QUERY_KEYS.PHOTOS.GET_PHOTOS],
        queryFn: async ({ pageParam = 1 }) => {
            const response: PhotosWithTotalResults = await fetchPhotos(pageParam);
            return {
                photos: response.photos,
                totalResults: response.total_results,
                page: pageParam,
            };
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = lastPage.page + 1;
            const totalFetched = allPages.reduce((total, page) => total + page.photos.length, 0);
            return totalFetched < lastPage.totalResults ? nextPage : undefined;
        },
        initialPageParam: 1,
        retry: 1,
    });

    const photos = useMemo(() => data?.pages.flatMap((page) => page.photos) ?? [], [data]);

    const hasError = useMemo(
        () => isError || isRefetchError || isLoadingError,
        [isError, isRefetchError, isLoadingError]
    );

    return {
        photos,
        error,
        isFetchingNextPage,
        isFetchNextPageError,
        isFetching,
        hasError,
        refetch,
        fetchNextPage,
        hasNextPage,
    };
};
