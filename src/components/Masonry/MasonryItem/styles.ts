import { ItemPosition } from "@/components/Masonry/types.ts";
import styled from "styled-components";

export const Item = styled.div.attrs<{ $position: ItemPosition }>((props) => ({
    style: {
        position: "absolute",
        transform: `translate(${props.$position.left}px, ${props.$position.top}px)`,
        width: `${props.$position.width}px`,
        height: `${props.$position.height}px`,
    },
}))`
    overflow: hidden;
    transition: transform 0.3s ease;
    border-radius: 12px;
    border: 2px solid var(--border-transparent);

    img {
        transition: transform 0.2s ease-in-out;
    }

    &:hover {
        cursor: pointer;
        border-color: var(--primary-hover);

        img {
            transform: scale(1.1);
        }

        p {
            opacity: 1;
            z-index: 1;
        }
    }
`;

export const StyledDescription = styled.p`
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    font-size: 12px;
    text-align: center;
    color: var(--black);
    background-color: var(--background-opacity);
    padding: 4px 8px;
    opacity: 0;
    transition: 0.2s ease-in-out;
    filter: blur(0);
`;
