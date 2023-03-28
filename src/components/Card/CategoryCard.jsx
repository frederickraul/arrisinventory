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
} from './styles';
import { AiOutlineClose } from 'react-icons/ai';
import { theme } from '../../constantes';

const CategoryCard = ({ item: {data},item,index, handeModalOpen,handleDelete}) => {
  const {name, desc, photo } = data;
  const {id} = item;
  const handleModal =() =>{
    handeModalOpen();
  }
  return (
    <div>
      {name == 'Otros' ||
      <CardWrapper>
        <Link to='#'>
          <CardContent>
          <div>
                <CardDelete onClick={()=>handleDelete(id)}>
                  <AiOutlineClose />
                </CardDelete>
              </div>
          <CardImg 
            onClick={handleModal}
            background={theme.bgGradientDark} 
            backgroundIMG={photo && photo}>
            </CardImg>
            <CardInfo onClick={handleModal}>
              <CardH4>{name}</CardH4>
              <CardDescription align='flex-start' column>
                <CardP>Descripción:</CardP>
                {desc}
              </CardDescription>
            </CardInfo>
          </CardContent>
        </Link>
      </CardWrapper>
}
    </div>
  )
}

export default CategoryCard;