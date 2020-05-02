import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body{
        background: ${({ theme }) => theme.body};
        color : ${({ theme }) => theme.text};
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        margin:0;
        transition: background 500ms ease,  color 500ms ease;
    }

    button{
        background : ${({ theme }) => theme.btn.primary.body};
        color : ${({ theme }) => theme.btn.primary.text};
        transition: background 500ms ease,  color 500ms ease;
    }

    .row{
        display: grid; 
        border-top: 1px solid ${({ theme }) => theme.border};
        border-left: 1px solid ${({ theme }) => theme.border};
        border-right: 1px solid ${({ theme }) => theme.border};
        transition: border 500ms ease;
    }

    .row:last-child{
        border-bottom: 1px solid ${({ theme }) => theme.border};
        transition: border 500ms ease;
    }    

    .cell:not(:last-child){
        border-right: 1px solid ${({ theme }) => theme.border};
        transition: border 500ms ease;
    }

`;
