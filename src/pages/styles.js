import styled from "styled-components";
import { theme } from "../constantes";


export const CotizacionContainer = styled.div`
    background-color: ${({ white }) => (!white ? theme.grayLightest : 'white')};
    padding: 50px;
    min-height: 65vh;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 768px){
        padding: 1rem;
    }
    
`

export const CotizacionHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const CotizacionHeaderPrint = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 50px;
`

export const CotizacionDateContainer = styled.div`
    display: flex;
    flex-direction: column;
`


export const CotizacionCustomerInfo = styled.div`
width: 100%;
margin-top: 20px;

`

export const CotizacionCustomerInfoContainer = styled.div`
    width: 75%;
    @media screen and (max-width: 768px){
        width: 100%;
    }
`

export const CotizacionColumn = styled.div`
    width: 30%;
`

export const Field = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${({ align }) => (!align ? 'space-between' : align)};
    align-items: ${({ center }) => (!center ? 'flex-start' : 'center')};
    margin-bottom: 1rem;

    @media screen and (max-width: 768px){
        flex-direction: column;
        justify-content: flex-start;
    }


`
export const FieldPrint = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${({ align }) => (!align ? 'space-between' : align)};
    align-items: ${({ center }) => (!center ? 'flex-start' : 'center')};
    font-size: .8rem;
    margin-bottom: .2rem;
`



export const Label = styled.p`
    font-weight: ${({ bold }) => (!bold ? 700 : 800)};
    margin-right: 1rem;
    @media screen and (max-width: 768px){
        margin-bottom: .2rem;
    }
    `
export const LabelPrint = styled.label`
    font-weight: ${({ bold }) => (!bold ? 700 : 800)};
    margin-right: .5rem;   
    margin-left: .5rem;
    `
export const TextPrint = styled.label`
    margin-left: .5rem;
    `

export const Input = styled.input`
    min-width: 50%;
    display: block;
    margin: 0;
    font-family: inherit;
    font-weight: inherit;
    border: 1px solid hsl(0, 0%, 80%);
    border-radius: 0.1rem;
    transition: box-shadow var(300ms);
    padding: .5rem .8rem;
    font-size: 1rem;
    line-height: var(1.8);
    background-color: ${({ readOnly }) => (!readOnly ? `white` : theme.grayLight)};
    color: ${theme.grayDark};
;
   
    &::placeholder {
        color: #B0BEC5;
    }

    &:focus {
        outline: none;
        box-shadow: 0.2rem 0.8rem 1.6rem #B0BEC5;
    }

`
export const Textarea = styled.textarea`
    min-width: 50%;
    display: block;
    margin: 0;
    color: inherit;
    font-family: inherit;
    font-weight: inherit;
    border: 1px solid hsl(0, 0%, 80%);
    border-radius: 0.1rem;
    transition: box-shadow var(300ms);
    padding: .5rem .8rem;
    font-size: 1rem;
    line-height: var(1.8);
    resize: none;

    &::placeholder {
        color: #B0BEC5;
    }

    &:focus {
        outline: none;
        box-shadow: 0.2rem 0.8rem 1.6rem #B0BEC5;
    }
`

export const CheckBoxContainer = styled.div`
`

export const CotizacionPaidContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    padding: 15px 0;
`

export const CotizacionPaid = styled.div`
    width: 50%;

    @media screen and (max-width: 768px){
        width: 100%;
    }
`
export const ButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: auto;
    align-items: center;
    border-top: ${({noBorder}) =>(!noBorder ? '.1rem solid #444444' : 'none')} ;
    padding: 15px 0;
    
    button{
        color:white;
        margin-left: 2rem;
    }

    @media screen and (max-width: 768px){
        justify-content: center    
    }


`