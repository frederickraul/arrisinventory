import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { theme } from '../../constantes';
import { CloseIcon } from '../../constantes/icons';

const CustomSnackBar = (props) => {
    const {isAlertOpen,alertMessage, severity, handleClose} = props;
    const [position, setposition] = useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'center',
    });

    const { vertical, horizontal } = position;
    
  return (
    <Snackbar autoHideDuration={5000} open={isAlertOpen} onClose={handleClose} anchorOrigin={{vertical,horizontal}}>
        <Alert severity={severity} variant="filled">
          {alertMessage} 
          <small onClick={handleClose} className='text-primary' style={{marginLeft: 20, cursor: 'pointer', color:theme.red}}>
            <CloseIcon/>
          </small>
        </Alert>
    </Snackbar>
  )
}

export default CustomSnackBar