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
import { supplierIcon } from '../../assets';
import { AiOutlineClose } from 'react-icons/ai';
import { theme } from '../../constantes';

const ProviderCard = ({ item: { data },item,handleDelete }) => {
  const {slug, name, address, phone} = data;
  const {id } = item;

  return (
    <div>
      <CardWrapper>
        <Link to={'/proveedores/' + slug}>
          <CardContent>
          <CardImg background={theme.bgGradientSuccess}>
              <img src={supplierIcon} />
              <div>
                <CardDelete onClick={(e) => { e.preventDefault(); handleDelete(id); }}>
                  <AiOutlineClose />
                </CardDelete>
              </div>
            </CardImg>
            <CardInfo>
              <CardH4>{name}</CardH4>
              <CardDescription align='flex-start' column>
                <CardP>Teléfono:</CardP>
                {phone}
              </CardDescription>

              <CardDescription align='flex-start' column>
                <CardP>Domicilio: </CardP>
                {address}
              </CardDescription>
            </CardInfo>
          </CardContent>
        </Link>
      </CardWrapper>
    </div>
  )
}

export default ProviderCard;