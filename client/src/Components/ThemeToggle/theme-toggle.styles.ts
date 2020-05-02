import styled, {css} from 'styled-components'

const moon1 =  "#EDDDD4";
const moon2 = "#FCFAFA";
	
const sun1= "#FFFFFF";
const sun2= "#FFBE0B";
const sun3= "#FB5607";

const animationSpeed = "1s";


export const ThemeStyle = styled.div.attrs(props => ({
    moon1, moon2, sun1, sun2, sun3, animationSpeed
}))`
    .Toggle {
		box-shadow: 0 0 10px rgba(0, 0, 0, .1);		
		width: 80px;
		// height: 100px;
		border: 3px solid rgba(252, 250, 250,.125);
		background: rgba(252, 250, 250, .05);
		padding: 13px;
		position: relative;
		border-radius: 200px;
		
		
		&:hover{
			cursor: pointer;
		}

        &[data-time='day'] {
			.Button {
				left: 45px;
				box-shadow: 0 0 4px 3px ${(props): string => props.sun3};
				border: 1px solid rgba(251, 86, 7, 1) !important;
				top: 0;
				
				&::before {
					opacity: 1;
				}
			}
        }
        
        .Button {
			height: 25px;
			width: 25px;
			background: yellow;
			border-radius: 25px;
			position: absolute;
			pointer-events: none;
			top: 0px;
			left: 2px;
			transition: left ${(props): string => props.animationSpeed} ease, box-shadow ${(props): string => props.animationSpeed} ease, border ${(props): string => props.animationSpeed} ease, top ${(props): string => props.animationSpeed} ease;
			background: ${(props): string => props.moon1}; /* Old browsers */
			background: linear-gradient(135deg,  ${(props): string => props.moon1} 0%,${(props): string => props.moon2} 50%,${(props): string => props.moon1} 51%,${(props): string => props.moon2} 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
			box-shadow: 0 0 25px 5px ${(props): string => props.moon1};
			border: 5px solid rgba(237, 221, 212, .5);			

			&::before {
				content: '';
				height: 24px;
				width: 24px;
				background: red;
				// top: -5px;
				// left: -5px;
				position: absolute;
				border-radius: 24px;
				background:  ${(props): string => props.sun1}; /* Old browsers */
				background: radial-gradient(ellipse at center,  ${(props): string => props.sun1} 5%,  ${(props): string => props.sun2} 50%,  ${(props): string => props.sun3} 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
				transition: opacity ${(props): string => props.animationSpeed} ease;
				opacity: 0;

			}
        }
    }
`;