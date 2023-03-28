import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  var currentYear= new Date().getFullYear();

  return (
    <div className='footer-container'>
      <p>&copy; Copyright 2022-{currentYear}, Escandon Banquetes.
  </p>
      <p className='icons'> 
       
      </p>

    </div>
  )
}

export default Footer