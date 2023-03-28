import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import { noAvailableImg } from '../../assets';
import { CardDelete } from '../Card/styles';
import { ItemCardContent, ItemCover } from './styles';

const Item = ({item:{data},item,handleDelete}) => {
  const {photo,name,slug,qty,category} = data;
  const {id} = item;
  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

  if(category == undefined){
    category = 'otros';
  }
  return (
    <div>
        <Link to={`/inventario/${category.toLowerCase()}/${slug}`}>
            <ItemCardContent>
            <div>
            <CardDelete onClick={(e) => { e.preventDefault(); handleDelete(id); }}>
                  <AiOutlineClose />
                </CardDelete>
              </div>
                <ItemCover 
                background={photo ? photo : noAvailableImg }
                className='product-image'
                />
                <h3 className='product-name'>{name}</h3>
                <p className='product-price'>Stock: </p>
                <p>{qty ? qty : 0} unidades</p>

            </ItemCardContent>
        </Link>
    </div>
  )
}

export default Item;