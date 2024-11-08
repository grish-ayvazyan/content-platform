import { memo } from "react";

import { Item, StyledDescription } from "@/components/Masonry/MasonryItem/styles.ts";
import { MasonryItemProps } from "@/components/Masonry/types.ts";
import Image from "@/components/ui/Image";

const NO_DESCRIPTION_TEXT = "This photo doesn’t have any description";

export const MasonryItem = memo(({ photo, position }: MasonryItemProps) => {
    return (
        <Item $position={position}>
            <Image
                src={photo.src.medium}
                alt={photo.alt || "alt"}
                loading="lazy"
                $avgColor={photo.avg_color || "#9f9e9e"}
            />
            <StyledDescription>{photo.alt || NO_DESCRIPTION_TEXT}</StyledDescription>
        </Item>
    );
});

export default MasonryItem;
