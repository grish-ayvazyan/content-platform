import { useState } from "react";

import { StyledImage } from "@/components/ui/Image/styles.ts";
import { ImageProps } from "@/components/ui/Image/types.ts";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const Image = (props: ImageProps) => {
    const { src, width, height, alt, loading, $avgColor } = props;
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            {!isLoaded && <ImagePlaceholder $avgColor={$avgColor} />}
            <StyledImage
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                loading={loading}
                $isLoaded={isLoaded}
                width={width || "100%"}
                height={height || "100%"}
            />
        </>
    );
};

export default Image;
