import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    padding: 16px;
    max-width: 1200px;
    background-color: var(--background);
    border-radius: 32px;
    gap: 20px;
    margin-top: 20px;
    overflow: hidden;

    @media (max-width: 1024px) {
        flex-direction: column-reverse;
    }
`;

export const FlexWrapper = styled.div`
    display: flex;
    flex: 2 1 0;
    align-items: center;
    justify-content: center;
    overflow-y: hidden;
`;

export const ImageWrapper = styled.div<{ $isLandscape: boolean }>`
    border-radius: 25px;
    overflow: hidden;
    height: ${({ $isLandscape }) => ($isLandscape ? "auto" : "100%")};
    max-width: 100%;
    max-height: 100%;
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
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export const PhotographerInfo = styled.p`
    font-size: 18px;
    font-weight: 600;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    span {
        margin-left: 4px;
        font-size: 16px;
        font-weight: 400;
    }
`;

export const ProfileLink = styled.a`
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    margin-left: 4px;

    &:hover {
        color: var(--primary-hover);
    }
    & svg {
        width: 20px;
        height: 20px;
    }
`;
