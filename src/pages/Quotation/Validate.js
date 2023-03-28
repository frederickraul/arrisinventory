import React from 'react';

const Validate = (props) => {
    let error = 0;
    const {setformErrors,data,rows} = props;
    setformErrors([]);
    if(data.customerName == null || data.customerName == ""){
      setformErrors(prevFormErrors => ({ ...prevFormErrors, ['customerName']: 'El campo nombre es requerido.' }));
      error++;
    }
    //Rows Validation
    if(rows.length < 1){
        setformErrors(prevFormErrors => ({ ...prevFormErrors, ['rows']: 'Se necesita por lo menos un item en la lista.' }));
        error++;
    }else{
        if(rows[0].amount == null || rows[0].amount == ""){
            setformErrors(prevFormErrors => ({ ...prevFormErrors, ['rows']: 'Se necesita por lo menos un item en la lista.' }));
            error++;
        }
    }
        
    return error;
}

export default Validate