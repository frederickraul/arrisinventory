import React,{useState} from 'react';


import { Card, LinkCardIcon, LinkCardP } from './styles';
import { Link } from 'react-router-dom';
import { CardWrapper } from '../Card/styles';

const LinkCard = ({link:{label,icon,to},index, handeModalOpen}) => {

const openIvaModal =() => {
    label === 'IVA' && handeModalOpen();
}

return (
      <CardWrapper onClick={openIvaModal} 
      >
        <Link to={to}>
            <Card>
              <LinkCardIcon background={index}>
                {icon}
              </LinkCardIcon>
                <LinkCardP>{label}</LinkCardP>
            </Card>
        </Link>
      </CardWrapper>
      
  )
}

export default LinkCard;