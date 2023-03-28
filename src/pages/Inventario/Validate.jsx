import React from 'react'

const Validate = (props) => {
    let error = 0;
    const {setformErrors,data} = props;
    setformErrors([]);
    if(data.name == null || data.name == ''){
      setformErrors(prevFormErrors => ({ ...prevFormErrors, ['name']: 'El campo nombre es requerido.' }));
      error++;
    }
    if(data.details == null){
      setformErrors(prevFormErrors => ({ ...prevFormErrors, ['details']: 'El campo descripción es requerido.' }));
      error++;
    }

    if(data.price == null || data.price == 0){
      setformErrors(prevFormErrors => ({ ...prevFormErrors, ['price']: 'El campo precio es requerido.' }));
      error++;
    }
  
    return error;
}

export default Validate