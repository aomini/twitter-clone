interface IGeneral {
    body : string;
    text : string;
}

interface IButton{
    primary : IGeneral
}

export interface ITheme{
    body : string;
    section : string;
    text : string;   
    border : string; 
    btn : IButton
}

const lightTheme: ITheme = {
    body : "white",
    section : "#ff008e",
    text: "black",
    border: "#71bff9",
    btn : {
        primary : {
            body: '#ff008e',
            text : 'black'
        }
    }
}

const darkTheme: ITheme = {
    body : "black",
    section : "red",
    text : "white",
    border : '#32383D',
    btn : {
        primary : {
            body: "#1BC6B4",
            text : "#202529"
        }
    }
}

const theme = (mode : string): ITheme => mode === "dark" ? darkTheme : lightTheme 

export {theme}