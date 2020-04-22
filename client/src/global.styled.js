import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body{
        background: ${({ theme }) => theme.body};
        color : ${({ theme }) => theme.text};
    }

    button{
        background : ${({ theme }) => theme.btn.primary.body};
        color : ${({ theme }) => theme.btn.primary.text};
    }

    .row{
        display: grid; 
        border-top: 1px solid ${({ theme }) => theme.border};
        border-left: 1px solid ${({ theme }) => theme.border};
        border-right: 1px solid ${({ theme }) => theme.border};
    }

    .row:last-child{
        border-bottom: 1px solid ${({ theme }) => theme.border};
    }    

    .cell:not(:last-child){
        border-right: 1px solid ${({ theme }) => theme.border};
    }

`;
