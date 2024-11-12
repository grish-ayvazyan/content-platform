import styled from "styled-components";

export const StyledImage = styled.img<{ $isLoaded: boolean }>`
    width: ${(props) => (props.$isLoaded ? props.width : "100%")};
    height: ${(props) => (props.$isLoaded ? props.height : "100%")};
    max-width: 100%;
    will-change: opacity;
    transition: opacity 0.4s ease-in-out;
    opacity: ${(props) => (props.$isLoaded ? 1 : 0.5)};
    visibility: ${(props) => (props.$isLoaded ? "visible" : "hidden")};
    object-fit: contain;
`;
