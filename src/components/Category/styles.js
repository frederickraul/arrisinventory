import styled from 'styled-components';
import { theme } from '../../constantes';

export const CategoryCard = styled.div`
     cursor: pointer;
    transform: scale(1, 1);
    transition: transform 0.5s ease;
    color: ${theme.grayDark};

    :hover{
        transform: scale(1.1,1.1)

    }
`
export const CategoryCardImg = styled.img`
      border-radius: 15px;
    transform: scale(1, 1);
    transition: transform 0.5s ease;
    background-color: white;
`

