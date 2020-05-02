interface IGeneral {
    body : string;
    text : string;
}

interface IButton<T>{
    primary : T,
    default: T    
}

const white = "#fff";
const black = "#000";
const accent = "#77e9de";
const darkBlue = "#000042"
const darkAccent = "#1bc6b4";
const transparentBlue = "#0a4261f2";
const dirtyYellow = "#c6b91f"

export interface ITheme<T>{
    label: string,
    body : string;
    section : string;
    text : string;   
    border : string; 
    btn : IButton<T>;
    list: T;
    listHover: T,
    svg: {
        fill : string
    }
}

const lightTheme: ITheme<IGeneral> = {
    label: "light",
    body : "white",
    section : "#EEC236",
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
    },
    list: {
        body: accent,
        text: white
    },
    listHover: {
        body: white,
        text: black
    },
    svg : {
        fill: darkBlue
    }
}

const darkTheme: ITheme<IGeneral> = {
    label: "dark",
    body : "black",
    section : darkAccent,
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
    },
    list: {
        body: transparentBlue,
        text: white
    },
    listHover: {
        body: dirtyYellow,
        text: black
    },
    svg :{
        fill: black
    }
}

const theme = (mode : string): ITheme<IGeneral> => mode === "dark" ? darkTheme : lightTheme 

export {theme}