import { memo } from "react";
import { Link } from "react-router-dom";

import { Item, StyledDescription } from "@/components/Masonry/MasonryItem/styles.ts";
import { MasonryItemProps } from "@/components/Masonry/types.ts";
import Image from "@/components/ui/Image";
import { ROUTES_CONFIG } from "@/routes";

const NO_DESCRIPTION_TEXT = "This photo doesn’t have any description";

export const MasonryItem = memo(({ photo, position }: MasonryItemProps) => {
    return (
        <Link to={`${ROUTES_CONFIG.PHOTO_GRID.ROOT}/${photo.id}`}>
            <Item $position={position}>
                <Image
                    src={photo.src.medium}
                    alt={photo.alt || "alt"}
                    loading="lazy"
                    $avgColor={photo.avg_color || "#9f9e9e"}
                />
                <StyledDescription>{photo.alt || NO_DESCRIPTION_TEXT}</StyledDescription>
            </Item>
        </Link>
    );
});

export default MasonryItem;
