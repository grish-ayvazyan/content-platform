import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Grid, GridContainer } from "@/components/Masonry/MasonryGrid/styles.ts";
import { MasonryItem } from "@/components/Masonry/MasonryItem";
import { ItemPosition } from "@/components/Masonry/types.ts";
import Loader from "@/components/ui/Loader";
import { LoaderWrapperBottom } from "@/components/ui/Loader/styles.ts";
import ErrorComponent from "@/containers/ErrorBoundary/ErrorComponent.tsx";
import { useFetchPhotos } from "@/hooks/useFetchPhotos.tsx";
import { UNEXPECTED_ERROR_OCCURRED } from "@/services/api/constants.ts";
import { Photo } from "@/services/api/types.ts";

const GAP = 16;
const VIEWPORT_BUFFER = 800;

export const MasonryGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [activeItems, setActiveItems] = useState<Photo[]>([]);
    const [itemPositions, setItemPositions] = useState<Record<number, ItemPosition>>({});
    const [columnWidth, setColumnWidth] = useState(250);
    const { photos, error, hasError, isFetchNextPageError, isFetchingNextPage, isFetching, fetchNextPage, refetch } =
        useFetchPhotos();

    //TODO: create hooks for helpers
    const calculateLayout = useCallback(() => {
        if (!gridRef.current || !photos.length) return;

        const gridWidth = gridRef.current.offsetWidth;
        const columnCount = Math.floor((gridWidth + GAP) / (columnWidth + GAP));
        const columnHeights = Array(columnCount).fill(0);
        const newItemPositions: Record<number, ItemPosition> = {};

        photos.forEach((photo) => {
            const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
            const left = shortestColumn * (columnWidth + GAP);
            const aspectRatio = photo.width / photo.height || 1;
            const height = columnWidth / aspectRatio;

            newItemPositions[photo.id] = { left, top: columnHeights[shortestColumn], width: columnWidth, height };
            columnHeights[shortestColumn] += height + GAP;
        });

        setItemPositions(newItemPositions);
        gridRef.current.style.height = `${Math.max(...columnHeights)}px`;
    }, [photos, columnWidth]);

    const updateActiveItems = useCallback(() => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const visibleTop = containerRef.current.scrollTop - VIEWPORT_BUFFER;
        const visibleBottom = visibleTop + containerRect.height + 2 * VIEWPORT_BUFFER;

        const newActiveItems = photos.filter((photo) => {
            const position = itemPositions[photo.id];
            return position ? position.top < visibleBottom && position.top + position.height > visibleTop : false;
        });

        setActiveItems(newActiveItems);
    }, [photos, itemPositions]);

    const handleScroll = useCallback(async () => {
        updateActiveItems();

        const container = containerRef.current;
        if (!container) return;

        const nearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + VIEWPORT_BUFFER;

        if (nearBottom && !isFetchingNextPage && !isFetchNextPageError) {
            await fetchNextPage();

            if (container.scrollHeight <= container.clientHeight) {
                await fetchNextPage();
            }
        }
    }, [fetchNextPage, isFetchNextPageError, isFetchingNextPage, updateActiveItems]);

    const calculateColumnWidth = useCallback(() => {
        if (!gridRef.current) return;

        const gridWidth = gridRef.current.offsetWidth;
        let columnCount = Math.floor(gridWidth / 250);
        if (columnCount < 1) columnCount = 1;
        const newColumnWidth = (gridWidth - (columnCount - 1) * GAP) / columnCount;
        setColumnWidth(newColumnWidth);
    }, []);

    useEffect(() => {
        const fillViewportWithContent = async () => {
            if (!containerRef.current || !gridRef.current) return;

            // Calculate if content is smaller than the viewport height
            while (
                gridRef.current.scrollHeight <= containerRef.current.clientHeight &&
                !isFetchingNextPage &&
                !isFetchNextPageError
            ) {
                await fetchNextPage();
            }
        };

        fillViewportWithContent();
    }, [photos, isFetchingNextPage, isFetchNextPageError]);

    useEffect(() => {
        calculateLayout();
    }, [calculateLayout]);

    useEffect(() => {
        updateActiveItems();
    }, [itemPositions, updateActiveItems]);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll]);

    useEffect(() => {
        const handleResize = () => {
            calculateColumnWidth();
            if (photos.length > 0) {
                calculateLayout();
                updateActiveItems();
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [photos.length]);

    const loader = useMemo(
        () => (
            <LoaderWrapperBottom>
                <Loader hasContainer />
            </LoaderWrapperBottom>
        ),
        [isFetchingNextPage]
    );

    if (hasError || isFetchNextPageError) {
        return (
            <ErrorComponent
                errorMessage={error?.message || UNEXPECTED_ERROR_OCCURRED}
                handleRetry={isFetchNextPageError ? fetchNextPage : refetch}
            />
        );
    }

    if (isFetching && photos.length === 0) return <Loader />;

    const renderMasonryItem = (photo: Photo, index: number) => {
        const position = itemPositions[photo.id];
        return position && <MasonryItem key={`${photo.id}-${index}`} photo={photo} position={position} />;
    };

    return (
        <GridContainer ref={containerRef}>
            <Grid ref={gridRef}>{activeItems.map(renderMasonryItem)}</Grid>
            {isFetchingNextPage && loader}
        </GridContainer>
    );
};

export default MasonryGrid;
