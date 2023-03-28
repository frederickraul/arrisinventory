import React, { useEffect, useState } from 'react';


import { ItemH2 } from '../Inventario/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from './Form';
import { useAuth } from '../../context/AuthContext';
import Validate from './Validate';



const ListDetails = () => {
  const { slug } = useParams();

  const [list, setlist] = useState([]);
  const [data, setdata] = useState(
    {name: '', address: ""}
  );

  const [rows, setRows] = useState([{ id: 1, name: "", location: "", qty: "", complete: false }]);
  const [elements, setelements] = useState([]);
  const [formErrors, setformErrors] = useState({})
  const [isIvaActive, setisIvaActive] = useState(false);
  const { getData,updateData,setisLoading,getDataWhere } = useAuth();

  useEffect(() => {
    getItems();
    getList();

  },[slug]);

  useEffect(() => {
   if(list[0]){
    setdata(list[0].data);
    setRows(list[0].data.rows);
  }

  },[list]);
  

  const getItems = () => {
      getData('items', setelements);
   
  }
  
  const getList =() =>{
      getDataWhere('lists',setlist,'slug','==',slug);
   
  }


  const handleSave = async() => {
    let error = 0;
    error = Validate({setformErrors, data,rows});
    if(error>0){console.log('Error found'); return}
    try {
       updateData('lists',data,list[0].id);
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
        <p className='text-capitalize'>Modificar Lista</p>
      </div>

      <Form 
        data={data} 
        elements={elements} 
        rows={rows} 
        setRows={setRows} 
        setdata={setdata} 
        handleSave={handleSave} 
        formErrors={formErrors}
        isUpdate
      />
    </div>
  )
}

export default ListDetails;