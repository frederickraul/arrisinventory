import React from 'react';
import { Link } from 'react-router-dom';
import {
  CardContent,
  CardDelete,
  CardDescription,
  CardH4,
  CardImg,
  CardInfo,
  CardP,
  CardWrapper,
} from '../Card/styles';
import { AiOutlineClose } from 'react-icons/ai';
import { theme } from '../../constantes';
import { BsListCheck } from 'react-icons/bs';

const ListCard = ({ item: { id,data},handleDelete }) => {
 const {rows,slug} = data;
  return (
    <div>
      <CardWrapper>
        <Link to={'/listas/' + slug}>
          <CardContent>
          <CardImg background={theme.bgGradientDanger}>
              <BsListCheck/>
              <div>
                <CardDelete onClick={(e) => { e.preventDefault(); handleDelete(id); }}>
                  <AiOutlineClose />
                </CardDelete>
              </div>
            </CardImg>
            <CardInfo>
              <CardH4>{data.name}</CardH4>
              <CardDescription align='flex-start'>
                <CardP>Personas: </CardP>
                {data.numberPeople}
              </CardDescription>
              <CardDescription align='flex-start'>
                <CardP>Items en la lista: </CardP>
                {rows ? rows.length : 0}
              </CardDescription>

            </CardInfo>
          </CardContent>
        </Link>
      </CardWrapper>
    </div>
  )
}

export default ListCard;