import { ImgHTMLAttributes, useState } from "react";

import { StyledImage } from "@/components/ui/Image/styles.ts";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const Image = (props: ImgHTMLAttributes<HTMLImageElement> & { $avgColor: string }) => {
    const { src, alt, loading, $avgColor } = props;
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
                width="100%"
                height="100%"
            />
        </>
    );
};

export default Image;
