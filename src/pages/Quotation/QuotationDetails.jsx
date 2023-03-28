import React, { useEffect, useState } from 'react';


import { ItemH2 } from '../Inventario/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from './Form';
import { useAuth } from '../../context/AuthContext';
import Validate from './Validate';



const QuotationDetails = () => {
  const { noOrden } = useParams();

  const [order, setorder] = useState([]);
  const [data, setdata] = useState([]);
  const [IVA, setIVA] = useState(0);

  const [rows, setRows] = useState([{ id: 1, name: "", price: "", qty: "", amount: ""}]);
  const [elements, setelements] = useState([]);
  const [formErrors, setformErrors] = useState({})
  const [isIvaActive, setisIvaActive] = useState(false);
  const { getData,updateData,setisLoading,getDataWhere,getDataById} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getItems();
    getOrder();
    getIva();

  },[]);

  useEffect(() => {
   //setdata();
   if(order[0]){
    if(order[0].data.iva > 0){setisIvaActive(true);}
    setdata(order[0].data);
    setRows(order[0].data.rows);
  }
  },[order]);
  
  const getItems = () => {
      getData('items', setelements);
  }

  const getIva = () =>{
    const id = '1CD8eWsz1ywHQvT4FqG7';
    getDataById('settings',setIVA,id);
  }

  
  const getOrder =() =>{
    try {
      getDataWhere('quotations',setorder,'noOrden','==',noOrden);
    } catch (error) {
      console.log(error);
    }
  }


  const handleSave = async() => {
    let error = 0;
    error = Validate({setformErrors, data,rows});
    if(error>0){console.log('Error found'); return}
    try {
       updateData('quotations',data,order[0].id);
    } catch (error) {
    }
    await setTimeout(5000);
    setisLoading(false);
  }

  
  return (
    <div>
      <div className='products-heading'>
        <Link to='/cotizacion'>
          <ItemH2>Cotización</ItemH2>
        </Link>
        <p className='text-capitalize'>Modificar cotización</p>
      </div>

      <Form 
        data={data} 
        elements={elements} 
        rows={rows} 
        setRows={setRows} 
        setdata={setdata} 
        handleSave={handleSave} 
        formErrors={formErrors}
        isIvaActive={isIvaActive}
        setisIvaActive={setisIvaActive}
        IVA={IVA.value}
        isUpdate
      />
    </div>
  )
}

export default QuotationDetails;