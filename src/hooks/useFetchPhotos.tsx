import { useMemo } from "react";

import { QUERY_KEYS } from "@/services/api/constants.ts";
import { fetchPhotos } from "@/services/api/pexelsApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PhotosWithTotalResults } from "pexels";

export const useFetchPhotos = () => {
    const { data, fetchNextPage, isFetchingNextPage, isFetchNextPageError, isFetching, error, hasNextPage } =
        useInfiniteQuery({
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
        });

    const photos = useMemo(() => data?.pages.flatMap((page) => page.photos) ?? [], [data]);

    return {
        isFetching,
        photos,
        isFetchingNextPage,
        isFetchNextPageError,
        fetchNextPage,
        hasNextPage,
        error,
    };
};
