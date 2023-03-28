import styled from 'styled-components';
import { theme } from '../../constantes';

export const CardWrapper = styled.div`
     cursor: pointer;
    transform: scale(1, 1);
    transition: transform 0.5s ease;
    color: ${theme.grayDark};   
    margin: 10px;
    :hover{
        transform: scale(1.1,1.1);
    }
`
export const CardContent = styled.div`
    width: 300px;
    height: 150px;
    border-radius: 15px;
    transform: scale(1, 1);
    transition: transform 0.5s ease;
    background-color: white;
    border: ${theme.grayDark};
    display: flex;
    flex-direction: row;
    &:hover button{
        border: 1px solid red;
        z-index: 9999;
        opacity: 1;
        -webkit-transition: opacity .5s ease-in-out;
        -moz-transition: opacity .5s ease-in-out;
        -o-transition: opacity .5s ease-in-out;
        transition: opacity .5s ease-in-out;
    }
`

export const CardImg = styled.div`
    background-color: ${({ background }) => (!background ? theme.primaryColor : background)};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    width: 35%;
    border-radius: 10px 0 0 10px;

    svg{
        font-size: 5rem;
        color: ${theme.grayLightest};
    }

    img{
        width: 4rem;
        color: ${theme.grayLightest};
    }

    ::before{
        background-image: url(${({ backgroundIMG }) => (backgroundIMG && backgroundIMG)});
        background-size:cover;
        background-repeat: no-repeat;
        background-position:50%;
        border-radius: 10px 0 0 10px;
        content: '';
        display: block;
        height: 150px;
        position: absolute;
        width: 35%;
    }
`



export const CardH2 = styled.h2`
    text-transform: uppercase;
    margin-bottom: 2rem;
`
export const CardH4 = styled.h4`
    text-transform: uppercase;
`


export const CardInfo = styled.div`
    width: 65%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`


export const CardDescription = styled.div`
    font-size: .9rem;
    width: 100%;
    display: flex;
    justify-content:  ${({ align }) => (!align ? 'space-between' : align)};
    flex-direction:  ${({ column }) => (!column ? 'row' : 'column')};
`

export const CardP = styled.p`
    font-weight: bold;
    margin-right: .5rem;
`

export const CardSmall = styled.small`
   width: 100%;
   display: flex;
   flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 10px;
`
export const CardDelete = styled.button`
    display: flex;
    justify-content: flex-end;
    border: none;
    background: none;
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 0;
    border-radius: 20px;
    cursor: pointer;
    opacity: 0;
    
    -webkit-transition: opacity .5s ease-in-out;
    -moz-transition: opacity .5s ease-in-out;
    -o-transition: opacity .5s ease-in-out;
    transition: opacity .5s ease-in-out;
    z-index: 2;
    background-color: red;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    svg{
        color: white;
        font-size: 1rem;
        margin: .3rem;
    }

   
`
