import React, { useState } from 'react';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { logo } from '../../assets';
import CustomCheckbox from '../../components/utils/CustomCheckbox';
import { useAuth } from '../../context/AuthContext';
import RollerSpinner from '../../components/utils/spinner/roller';


const Signup = () => {
  const [checked, setChecked] = useState(false);
  const [data, setdata] = useState([]);
  const {signup,currentUser} = useAuth();
  const [error, seterror] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [isAlertOpen, setisAlertOpen] = useState(false);

  const handleClose = () =>{
    setisAlertOpen(false);
  }

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setdata(prevData => ({ ...prevData, [fieldName]: value }));
    console.log(data);
  };


  const handleChange = () => {
    setChecked(!checked);
    //console.log(checked);
  };

  const handleSubmit= async(e) =>{
    e.preventDefault();
    if(data.password !== data.passwordConfirm){
        setisAlertOpen(true);
        return seterror('La contraseña de verificación no coincide.');
    }
    try {
      seterror('');
      setisLoading(true);
      await signup(data.user, data.password);
    } catch (error) {
      console.log(error.message);
      setisAlertOpen(true);
      //Error (auth/email-already-in-use).
      switch(error.message){
        case 'Firebase: Error (auth/email-already-in-use).':
          seterror("El correo electronico ya esta en uso.");
        break;
        case 'Firebase: Error (auth/network-request-failed).':
          seterror("Asegurate de tener una conección a internet.");
        break;
        default:
          seterror('Hubo un error');
        
      }
    }
    setisLoading(false);
  }

  return (

    <div className='auth-background'>
          <div>

            {isLoading && <RollerSpinner />}
            {error && <Snackbar autoHideDuration={5000} open={isAlertOpen} onClose={handleClose}>
            <Alert severity="error">{error}</Alert>
            </Snackbar>}
          </div>
  <div className="auth-container">
      <div>
        <img src={logo} alt="rocket" className="rocket"/>
        <div className="text">
            <h1>Bienvenido</h1>
            <p>Inventario</p>
            {JSON.stringify(currentUser)}
        </div>

      </div>
      <div>
      </div>
        <form className="form">
            <div className="animated-input">
                <input type="text" placeholder="Usuario"  value={data.user || ''}
                    onChange={(e) => handleInputChange(e, 'user')}/>
                <input type="password" placeholder="Contraseña"  value={data.password || ''}
                    onChange={(e) => handleInputChange(e, 'password')}/>
                <input type="password" placeholder="Confirmar Contraseña"  value={data.passwordConfirm || ''}
                    onChange={(e) => handleInputChange(e, 'passwordConfirm')}/>
            </div>
            <div className="check">
                <div>
                    <CustomCheckbox checked={checked} onChange={()=>{handleChange()}}
/>
                    <label className="remember">Recordarme</label>
                </div>
                <p className="forget"><a href="#">¿Olvidaste la contraseña?</a></p>
            </div>
        </form>
        <Button className="btn btn-primary-alt" onClick={handleSubmit}>Registrar</Button>
        
    </div>
    </div>
  );
};

export default Signup;
