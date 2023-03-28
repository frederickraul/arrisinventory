import React, { useEffect, useState } from 'react';


import { ItemH2 } from '../Inventario/styles';
import { Link, useNavigate } from 'react-router-dom';
import Form from './Form';
import { useAuth } from '../../context/AuthContext';
import Validate from './Validate';


const ListCreate = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);

  const [rows, setRows] = useState([{ id: 1, complete: false}]);
  const [elements, setelements] = useState([]);
  const [formErrors, setformErrors] = useState({})
  const [isIvaActive, setisIvaActive] = useState(false);
  
  const { getData,setisLoading,saveData } = useAuth();

  useEffect(() => {
    getItems();

  },[]);



  const getItems = () => {
    try {
      getData('items', setelements);
    } catch (error) {
      console.log(error);
    }
  }
  

  const handleSave = async() => {
    let error = 0;
    console.log(data);
    error = Validate({setformErrors, data,rows});
    
    if(error>0){ return}

    try {
        const to = '/listas/'+data.slug;
      saveData('lists',data, to);
    } catch (error) {
    }
    await setTimeout(5000);
    setisLoading(false);
  }

  
  return (
    <div>
      <div className='products-heading'>
        <Link to='/listas'>
          <ItemH2>Listas</ItemH2>
        </Link>
        <p className='text-capitalize'>Crear Lista</p>
      </div>

      <Form 
        data={data} 
        elements={elements} 
        rows={rows} 
        setRows={setRows} 
        setdata={setdata} 
        handleSave={handleSave} 
        formErrors={formErrors}
      />
    </div>
  )
}

export default ListCreate;