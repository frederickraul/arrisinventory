import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ItemH2 } from '../Inventario/styles';
import { useAuth } from '../../context/AuthContext';
import Validate from './Validate';
import Form from './Form';
import { faker } from '@faker-js/faker';


const ProviderCreate = () => {



  const [formErrors, setformErrors] = useState({});
  
  //----------------------------------
  const [data, setdata] = useState([]);
  const {saveData,setisLoading} = useAuth();
  
  let navigate = useNavigate();

useEffect(() => {
//   const randomName = faker.name.findName(); // Rowan Nikolaus
//   const randomSlug = randomName.toLowerCase()
//   .replace(/ /g,'-')
//   .replace(/[^\w-]+/g,'');; // Rowan Nikolaus
// const randomphone = faker.phone.number(); // Kassandra.Haley@erich.biz
// const randomaddress = faker.address.direction(); // Kassandra.Haley@erich.biz

//   setdata({name: randomName, slug: randomSlug,address: randomaddress, phone: randomphone});
}, [])


  const handleSave = async() => {
    let error = 0;
    error = Validate({setformErrors, data});
    
    if(error>0){ return}

    try {
       saveData('providers',data);
       navigate('/proveedores/'+data.slug);
    } catch (error) {
    }
    await setTimeout(5000);
    setisLoading(false);
  }

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    if(fieldName === 'name'){
      const slug = value
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'');
          setdata(prevData => ({ ...prevData, ['slug']: slug }));
    }
    setdata(prevData => ({ ...prevData, [fieldName]: value }));
  };

  return (
    <div>
    <div className='products-heading'>
      <Link to='/proveedores'>
        <ItemH2>Proveedores</ItemH2>
      </Link>
      <p className='text-capitalize'>Agregar proveedor</p>
    </div>

    <Form formErrors={formErrors} data={data} handleInputChange={handleInputChange} handleSave={handleSave}/>

    </div>
  )
}

export default ProviderCreate;