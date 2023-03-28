import { Button } from '@mui/material';
import React from 'react';

import {AiOutlineShopping} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { userMan, userWoman } from '../../assets';
import { useAuth } from '../../context/AuthContext';
import { NavProfileContent, NavProfileIMG, NavProfileText } from './styles';


const Navbar = () => {
    const {currentUser} = useAuth();
    const {photo,gender,name} = currentUser? currentUser : '';

    return (
    <div className='navbar-container'>
        <p className='logo'>
            
        </p>
        <div>

        <Button>
            <NavProfileContent>
                <NavProfileIMG src={photo ? photo : gender === 'Mujer' ? userWoman : userMan}/>

                <NavProfileText>
                {name}
                </NavProfileText>
            </NavProfileContent>
            {/* <span className='cart-item-qty'>5</span> */}
        </Button>
        </div>
      
    </div>
  )
}

export default Navbar;