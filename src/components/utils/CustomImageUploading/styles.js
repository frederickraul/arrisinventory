import styled from "styled-components";
import { theme } from "../../../constantes";

export const ImageUploadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    min-width: 50%;
`
export const ImageUploadingContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`
export const ImageUploadingImg = styled.img`
    max-width: 214px;
    max-height: 214px;
    background-color: white;
    border-radius: 5px;
    display: flex;

    @media screen and (max-width: 768px){
        max-width: 100%;
        max-height: none;
    }

`
