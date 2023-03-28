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
import {  userMan, userWoman } from '../../assets';
import { AiOutlineClose } from 'react-icons/ai';
import { theme } from '../../constantes';

const UserCard = ({ item: {data},item,index, handeModalOpen,setImages,handleDelete}) => {
  const {name, gender,photo } = data;
  const {id } = item;
  const handleModal =() =>{
    handeModalOpen();

  }
  return (
    <div>
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
            backgroundIMG={photo ? photo : gender==='Hombre' ? userMan : userWoman}>
            </CardImg>
            <CardInfo onClick={handleModal}>
              <CardH4>{name}</CardH4>
              <CardDescription align='flex-start' column>
                <CardP>Sexo:</CardP>
                {gender}
              </CardDescription>
            </CardInfo>
          </CardContent>
        </Link>
      </CardWrapper>
    </div>
  )
}

export default UserCard;