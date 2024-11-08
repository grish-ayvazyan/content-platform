import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Grid, GridContainer } from "@/components/Masonry/MasonryGrid/styles.ts";
import { MasonryItem } from "@/components/Masonry/MasonryItem";
import { ItemPosition } from "@/components/Masonry/types.ts";
import Loader from "@/components/ui/Loader";
import { LoaderWrapperBottom } from "@/components/ui/Loader/styles.ts";
import { useFetchPhotos } from "@/hooks/useFetchPhotos.tsx";
import { Photo } from "pexels";

const COLUMN_WIDTH = 300;
const GAP = 16;
const VIEWPORT_BUFFER = 800;

export const MasonryGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [activeItems, setActiveItems] = useState<Photo[]>([]);
    const [itemPositions, setItemPositions] = useState<Record<number, ItemPosition>>({});
    const { photos, isFetchingNextPage, fetchNextPage, isFetchNextPageError, isFetching } = useFetchPhotos();

    //TODO: create hooks for helpers
    const calculateLayout = useCallback(() => {
        if (!gridRef.current || !photos.length) return;

        const gridWidth = gridRef.current.offsetWidth;
        const columnCount = Math.floor((gridWidth + GAP) / (COLUMN_WIDTH + GAP));
        const columnHeights = Array(columnCount).fill(0);
        const newItemPositions: Record<number, ItemPosition> = {};

        photos.forEach((photo) => {
            const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
            const left = shortestColumn * (COLUMN_WIDTH + GAP);
            const aspectRatio = photo.width / photo.height || 1;
            const height = COLUMN_WIDTH / aspectRatio;

            newItemPositions[photo.id] = { left, top: columnHeights[shortestColumn], width: COLUMN_WIDTH, height };
            columnHeights[shortestColumn] += height + GAP;
        });

        setItemPositions(newItemPositions);
        gridRef.current.style.height = `${Math.max(...columnHeights)}px`;
    }, [photos]);

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

    const handleScroll = useCallback(() => {
        updateActiveItems();

        if (
            containerRef.current &&
            containerRef.current.scrollHeight - containerRef.current.scrollTop <=
                containerRef.current.clientHeight + VIEWPORT_BUFFER &&
            !isFetchingNextPage &&
            !isFetchNextPageError
        ) {
            fetchNextPage();
        }
    }, [fetchNextPage, isFetchNextPageError, isFetchingNextPage, updateActiveItems]);

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
            calculateLayout();
            updateActiveItems();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [calculateLayout, updateActiveItems]);

    const loader = useMemo(
        () => (
            <LoaderWrapperBottom>
                <Loader hasContainer />
            </LoaderWrapperBottom>
        ),
        [isFetchingNextPage]
    );

    //TODO: Implement handleRetry logic and error

    if (isFetching && photos.length === 0) return <Loader />;

    const renderMasonryItem = (photo: Photo) => {
        const position = itemPositions[photo.id];
        return position && <MasonryItem key={photo.id} photo={photo} position={position} />;
    };

    return (
        <GridContainer ref={containerRef}>
            <Grid ref={gridRef}>{activeItems.map(renderMasonryItem)}</Grid>
            {isFetchingNextPage && loader}
        </GridContainer>
    );
};

export default MasonryGrid;
