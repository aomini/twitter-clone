import styled from 'styled-components';

export const IconSvg = styled.svg<{theme: {theme: string}}>`
    height : 100%;
    width: 100%;
    fill: ${(props): string => props.theme.text}
`;