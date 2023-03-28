import React from 'react';

const Validate = (props) => {
    let error = 0;

    const isValidEmail = (email) =>{
        return /\S+@\S+\.\S+/.test(email);
      }

    const {setformErrors,data} = props;
    setformErrors([]);
    if(!isValidEmail(data.email)){
      setformErrors(prevFormErrors => ({ ...prevFormErrors, ['email']: 'El email no es válido.' }));
      error++;
    }
    if(data.name == null || data.name == ""){
      setformErrors(prevFormErrors => ({ ...prevFormErrors, ['name']: 'El campo nombre es requerido.' }));
      error++;
    }
    
    
  
    return error;
}

export default Validate