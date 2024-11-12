import { Link } from "react-router-dom";

import styled from "styled-components";

export const PhotoDetailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 16px;
`;

export const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    color: var(--primary);
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;

    svg {
        margin-right: 8px;
    }

    &:hover {
        color: var(--primary-hover);
    }
`;
