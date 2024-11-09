import { memo, useMemo } from "react";

import ExternalLink from "@/assets/icons/external-link.svg";
import Image from "@/components/ui/Image";
import {
    Content,
    Description,
    FlexWrapper,
    ImageWrapper,
    PhotographerInfo,
    ProfileLink,
    Title,
} from "@/pages/Photo/components/PhotoDetail/styles.ts";
import { PhotoDetailProps } from "@/pages/Photo/components/PhotoDetail/types.ts";

const UNTITLED_PHOTO = "Untitled Photo";

const PhotoDetail = memo(
    ({ photo: { width, height, src, avg_color, alt, photographer_url, photographer } }: PhotoDetailProps) => {
        const ratio = useMemo(() => width / height, [width, height]);
        const isLandscape = useMemo(() => width > height, [width, height]);

        return (
            <Content>
                <FlexWrapper>
                    <ImageWrapper $ratio={ratio} $isLandscape={isLandscape}>
                        <Image
                            src={src.original}
                            alt={alt || UNTITLED_PHOTO}
                            $avgColor={avg_color || "#9f9e9e"}
                            loading="lazy"
                        />
                    </ImageWrapper>
                </FlexWrapper>
                <Description>
                    <Title>{alt || UNTITLED_PHOTO}</Title>
                    <PhotographerInfo>
                        Photographer: <span>{photographer || "Unknown"}</span>
                        {photographer_url && (
                            <sup>
                                <ProfileLink href={photographer_url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink />
                                </ProfileLink>
                            </sup>
                        )}
                    </PhotographerInfo>
                </Description>
            </Content>
        );
    }
);

export default PhotoDetail;
