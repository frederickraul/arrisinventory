import { Modal } from "@mui/material";
import styled from "styled-components";

export const ModalContainer = styled(Modal)`
        display: flex;
       align-items: center;
        justify-content:center;
       overflow: auto;

       @media screen and (max-width: 768px){
        display: block;
        align-items: flex-start;
        top: 0;
       }
`
export const ModalPaper = styled.div`
        background-color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
        padding: 3rem;
        width: ${({width}) => (width ? width : '550px')};   
        overflow: scroll;
        height: 100%;
        min-height: 350px;

        @media screen and (max-width: 768px){
            height: 100vh;
            width: 100%;
            padding: 3rem;
            margin: 0;
            
        }
`

export const ModalTitle = styled.div`
display: flex;
justify-content: center;
    padding-bottom: 3rem;
`   