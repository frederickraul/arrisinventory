import React from 'react';

import { CategoryCard, CategoryCardImg } from './styles';
import { LinkCardP } from '../LinkCard/styles';
import { Link } from 'react-router-dom';

const Category = ({category:{data},index}) => {
  const {photo,name,slug} = data;
  return (
    <div>
        <Link to={'/inventario/' + slug}>
            <CategoryCard>
                <CategoryCardImg 
                    background={index}
                    src={photo}
                    width={250}
                    height={250}
                    className='product-image'
                />
                <LinkCardP>{name}</LinkCardP>

            </CategoryCard>
        </Link>
    </div>
  )
}

export default Category