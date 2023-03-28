
const Validate = (props) => {
    let error = 0;
    const {setformErrors,data} = props;
    setformErrors([]);
    if(data.name == null || data.name == ''){
      setformErrors(prevFormErrors => ({ ...prevFormErrors, ['name']: 'El campo nombre es requerido.' }));
      error++;
    }
    
  
    return error;
}

export default Validate