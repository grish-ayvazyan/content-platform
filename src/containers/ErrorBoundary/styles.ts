import styled from "styled-components";

export const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    text-align: center;
`;

export const ErrorHeading = styled.h1`
    font-size: 28px;
    margin-bottom: 15px;
`;

export const ErrorMessage = styled.p`
    font-size: 18px;
    margin-bottom: 25px;
`;

export const ReloadButton = styled.button`
    padding: 12px 24px;
    background-color: #3498db;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #1abc9c;
    }
`;
