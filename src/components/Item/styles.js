import styled from "styled-components";
import { noAvailableImg } from "../../assets";


export const ItemCardContent = styled.div`
  cursor: pointer;
  transform: scale(1, 1);
  transition: transform 0.5s ease;
  color: #324d67;
  width: 250px;
  height: 250px;
  border-radius: 15px;
  background-color: white;
   transition: transform 0.5s ease;
   text-align: center;

&:hover button{
    transform: scale(1.1,1.1)

}
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

export const ItemCover = styled.div`
    background-image: url(${({ background }) => (background) }); 
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    width: 100%;
    height: 100%;
`