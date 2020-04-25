interface IGeneral {
    body : string;
    text : string;
}

interface IButton<T>{
    primary : T,
    default: T
}

export interface ITheme{
    body : string;
    section : string;
    text : string;   
    border : string; 
    btn : IButton<IGeneral>
}

const lightTheme: ITheme = {
    body : "white",
    section : "#EEC236",
    // text: "#124e96",
    text: "#000042",
    border: "#71bff9",
    btn : {
        primary : {
            body: '#ff008e',
            text : 'black'
        },
        default : {
            body: 'black',
            text : 'white'
        },
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
        },
        default : {
            body: 'black',
            text : 'white'
        }
    }
}

const theme = (mode : string): ITheme => mode === "dark" ? darkTheme : lightTheme 

export {theme}