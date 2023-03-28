import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ItemH2 } from '../Inventario/styles';
import { useAuth } from '../../context/AuthContext';
import Validate from './Validate';
import Form from './Form';


const ProviderDetails = () => {
  const [id, setid] = useState();
  const {getDataWhere,updateData,setisLoading} = useAuth(); 
  const [item, setitem] = useState([]);
  const [data, setdata] = useState([]);
  const {slug} = useParams();
  const [formErrors, setformErrors] = useState(['']);

  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    if(item[0]){
      setdata(item[0].data); 
      setid(item[0].id); 
    }
    console.log(item);
  }, [item]);
  


  
  const getItem =() =>{
    try {
      getDataWhere('providers',setitem,'slug','==',slug);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = async() => {
    let error = 0;
    error = Validate({setformErrors, data});
    if(error>0){ return}
    try {
       updateData('providers',data,id);
    } catch (error) {
    }
    await setTimeout(5000);
    setisLoading(false);
  }
  

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setdata(prevData => ({ ...prevData, [fieldName]: value }));
  };


  return (
    <div>
    <div className='products-heading'>
      <Link to='/proveedores'>
        <ItemH2>Proveedores</ItemH2>
      </Link>
      <p className='text-capitalize'>Modificar proveedor</p>
    </div>
      <Form formErrors={formErrors} data={data} handleInputChange={handleInputChange} handleSave={handleSave} isUpdate/>

    </div>
  )
}

export default ProviderDetails;