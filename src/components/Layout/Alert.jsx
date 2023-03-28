
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import CustomSnackBar from '../utils/CustomAlert';
import RollerSpinner from '../utils/spinner/roller';

const Alert = () => {
    const {isLoading,isAlertOpen,alertMessage,alertSeverity,handleCloseAlert} = useAuth();
  return (
    <div>
    {isLoading && <RollerSpinner/>}
    <CustomSnackBar handleClose={handleCloseAlert} isAlertOpen={isAlertOpen} alertMessage={alertMessage} severity={alertSeverity} />     
    </div>
  )
}

export default Alert