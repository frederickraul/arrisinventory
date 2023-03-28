import React from 'react';

import { LinkCardP } from '../LinkCard/styles';
import { Link } from 'react-router-dom';
import { MdAttachMoney } from 'react-icons/md';
import { 
  CardContent, 
  CardDelete, 
  CardDescription, 
  CardH4, 
  CardImg, 
  CardInfo, 
  CardP, 
  CardSmall, 
  CardWrapper } from './styles';
import { AiOutlineClose } from 'react-icons/ai';
import { theme } from '../../constantes';


const QuotationCard = ({ item: { data },item,handleDelete}) => {
  const {customerName, grossAmount, iva, netAmount, createdAt,noOrden} = data;
  const {id} = item;
  return (
    <div>
      <CardWrapper>
        <Link to={'/cotizacion/' + noOrden}>
          <CardContent>
            <CardImg background={theme.bgGradientWarning}>
              <MdAttachMoney />
              <div>
                <CardDelete onClick={(e) => { e.preventDefault(); handleDelete(id); }}>
                  <AiOutlineClose />
                </CardDelete>
              </div>
            </CardImg>
            <CardInfo>
              <div>
                <CardSmall>{createdAt}</CardSmall>
                <CardH4>{customerName}</CardH4>
              </div>
              <div>
                <CardDescription>
                  <CardP>Subtotal:</CardP>
                  ${(grossAmount)}
                </CardDescription>
                <CardDescription>
                  <CardP>IVA: </CardP>
                  ${(iva)}
                </CardDescription>
                <CardDescription>
                  <CardP>Total: </CardP>
                  ${(netAmount)}
                </CardDescription>
              </div>
            </CardInfo>
          </CardContent>
          <LinkCardP>{noOrden}</LinkCardP>
        </Link>
      </CardWrapper>
    </div>
  )
}

export default QuotationCard;