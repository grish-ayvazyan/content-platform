import { ImagePlaceholderProps } from "@/components/ui/ImagePlaceholder/types.ts";
import styled from "styled-components";

export const Placeholder = styled.div.attrs<ImagePlaceholderProps>((props) => ({
    style: {
        backgroundColor: props.$avgColor,
        width: props.width,
        height: props.height,
    },
}))<ImagePlaceholderProps>`
    display: flex;
    justify-content: center;
    align-items: center;
`;
