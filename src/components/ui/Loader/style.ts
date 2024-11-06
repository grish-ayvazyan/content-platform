import styled, { keyframes } from "styled-components";

export const LoaderWrapper = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const animationOne = keyframes`
    0% {
        transform: translateX(0px);
    }
    65% {
        height: 1em;
        width: 1em;
    }
    100% {
        height: 1.25em;
        width: 0.75em;
        transform: translateX(0.5em);
    }
`;

const animationTwo = keyframes`
    0% {
        transform: translateX(0px);
    }
    65% {
        height: 1em;
        width: 1em;
    }
    100% {
        height: 1.25em;
        width: 0.75em;
        transform: translateX(-0.5em);
    }
`;

export const Loader = styled.div`
    position: relative;
    width: 2.5em;
    height: 1.25em;

    &:after,
    &:before {
        position: absolute;
        content: "";
        height: 1em;
        width: 1em;
        top: 0;
        background-color: currentColor;
        border-radius: 50%;
    }

    &:after {
        right: 0;
        animation: ${animationTwo} 0.5s ease-in-out infinite alternate;
    }

    &:before {
        left: 0;
        animation: ${animationOne} 0.5s ease-in-out infinite alternate;
    }
`;