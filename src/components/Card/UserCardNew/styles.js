import styled from 'styled-components';
import { theme } from '../../../constantes';
import { gradientColors } from '../../../constantes/theme';



export const UsersContainer = styled.div`
margin-top: 2rem;
    margin-left: 0.25rem !important;
    margin-right: 0.25rem !important;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
`
export const CardWrapper = styled.div`
    margin-bottom: 1.5rem !important;
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
    min-width: 33%;

    @media screen and (min-width: 992px){
        -ms-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%;
    }

    @media screen and (max-width: 768px){
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%;
    }
`
export const CardContent = styled.div`
    width: 100%;
    font-weight: 400;
    border: 0;
    -webkit-box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,0.125);
    border-radius: 0.25rem;
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

export const CardUp = styled.div`
    height: 120px;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    ${({ background }) => (gradientColors[background] ?  gradientColors[background].color : theme.bgGradientDark)};
`
export const CardAvatar = styled.div`
    width: 120px;
    height: 120px;
    overflow: hidden;
    border: 5px solid #fff;
    border-radius: 50%;
    margin-left: auto !important;    
    margin-right: auto !important;
    margin-top: 60px;
    background-color: ${theme.grayLight};
`

export const CardImg = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50% !important;
    vertical-align: middle;
    border-style: none;
    border-style: none;
    background-image: url(${({ backgroundIMG }) => (backgroundIMG && backgroundIMG)});
    background-size: cover;
    background-position: 50%;

`




export const CardH2 = styled.h2`
    text-transform: uppercase;
    margin-bottom: 2rem;
`
export const CardH4 = styled.h4`
    margin-top: 4rem;
    font-weight: 300;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;

    line-height: 1.2;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
`

export const CardText = styled.p`
    margin-top: -2rem;
    pad: 0;
`



export const CardHR = styled.hr`
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 1px solid rgba(0,0,0,0.1);
`


export const CardInfo = styled.div`
    text-align: center;

    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    border-radius: 0 !important;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
`


export const CardDescription = styled.div`
   
    justify-content:  ${({ align }) => (!align ? 'space-between' : align)};
    flex-direction:  ${({ column }) => (!column ? 'row' : 'column')};
`

export const CardP = styled.p`
    font-weight: 600;
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
