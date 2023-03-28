import { Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { theme } from '../constantes';


const SearchBar = ({ filter, text, action, noLowerCase }) => {

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value;
    if (!noLowerCase) {
      lowerCase = lowerCase.toLowerCase();
    }
    console.log(lowerCase);
    filter(lowerCase);
  };
  return (
    <div>
      <TextField
        id="search-bar"
        color='info'
        onChange={(e) => { inputHandler(e) }}
        label={text ? text : 'Buscar'}
        variant="outlined"
        placeholder="Buscar..."
        size="small"
        type='search'
      />
      <IconButton aria-label="search" onClick={action}>
        <BsSearch style={{ fill: theme.primary }} />
      </IconButton>
    </div>
  )
}

export default SearchBar