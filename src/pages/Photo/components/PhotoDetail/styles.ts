import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    padding: 16px;
    max-width: 1200px;
    background-color: #414141;
    border-radius: 32px;
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 1024px) {
        flex-direction: column-reverse;
    }
`;

export const FlexWrapper = styled.div`
    display: flex;
    flex: 2;
    align-items: center;
    justify-content: center;
`;

export const ImageWrapper = styled.div<{ $ratio: number; $isLandscape: boolean }>`
    border-radius: 25px;
    overflow: hidden;

    ${({ $isLandscape, $ratio }) =>
        !$isLandscape &&
        `
        width: 100%;
        height: 700px;
        max-width: ${700 * $ratio}px;
        margin: 0 auto;

    @media (max-width: 1024px) {
        height: 600px;
        max-width: ${600 * $ratio}px;
    }

    @media (max-width: 768px) {
        height: 500px;
        max-width: ${500 * $ratio}px;
    }
    `}
`;

export const Description = styled.div`
    flex: 1;
    padding: 16px;

    @media (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    @media (max-width: 768px) {
        flex: 0;
    }
`;

export const Title = styled.h2`
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 12px;
`;

export const PhotographerInfo = styled.p`
    font-size: 18px;
    font-weight: 600;

    span {
        margin-left: 4px;
        font-size: 16px;
        font-weight: 400;
    }
`;

export const ProfileLink = styled.a`
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    margin-left: 4px;

    &:hover {
        color: #1abc9c;
    }
    & svg {
        width: 20px;
        height: 20px;
    }
`;
