import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import * as React from 'react';
import { DialogIconContainer } from './styles';



export default function AlertDialog(props) {
  const { isOpen, action,handleClose,message,title,icon,color } = props;

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='xs'
        fullWidth={true}

      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogIconContainer style={{color: color}}>
            {icon}
          </DialogIconContainer>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='btn btn-secondary' onClick={handleClose}>Cancelar</Button>
          <Button className='btn btn-danger' onClick={action} autoFocus>
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
