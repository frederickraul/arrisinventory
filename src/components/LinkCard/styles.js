import styled from 'styled-components';
import { theme } from '../../constantes';

export const Card = styled.div`
     cursor: pointer;
    transform: scale(1, 1);
    transition: transform 0.5s ease;
    color: #2ba44f;
    
    :hover{
        transform: scale(1.1,1.1)

    }
`
export const LinkCardImg = styled.img`
    border-radius: 15px;
    transform: scale(1, 1);
    transition: transform 0.5s ease;
`

export const LinkCardIcon = styled.div`
        display: flex;
        
        svg {
            color: white;
            font-size: 250px;
            padding: 20px;
            border-radius: 15px;
            transform: scale(1, 1);
            transition: transform 0.5s ease;
            background-color:  ${({ background }) => (
                background == 0 ? theme.bgGradientPrimary : 
                background == 1 ? theme.bgGradientSuccess : 
                background == 2 ? theme.bgGradientWarning : 
                background == 3 ? theme.bgGradientDanger : theme.bgGradientDark 
                )};
            
        }
`

export const LinkCardP = styled.p`
    color: #444444;
    font-size: 1.5rem;
    text-align: center;
    padding: .3rem;
`