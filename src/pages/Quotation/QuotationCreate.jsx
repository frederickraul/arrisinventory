import React, { useEffect, useState } from 'react';


import { ItemH2 } from '../Inventario/styles';
import { Link, useNavigate } from 'react-router-dom';
import Form from './Form';
import { useAuth } from '../../context/AuthContext';
import Validate from './Validate';

import uniqid from 'uniqid';
import JSMTRand from 'js_mt_rand';
import Moment from 'moment';
 
let mt = new JSMTRand();
var md5 = require('md5');




const QuotationCreate = () => {
  const orden_no = 'ORDEN-'+(md5(uniqid(mt.srand(0))).substring(0, 4)).toUpperCase();
  const date =  Moment().format('DD-MM-YYYY');
  const [IVA, setIVA] = useState(0);
  const [isIvaActive, setisIvaActive] = useState(false);

  const [data, setdata] = useState(
    {noOrden: orden_no, customerName: "", customerAddress: "", customerPhoneNumber: "", grossAmount: 0, iva: 0, netAmount: 0,createdAt: date }
  );


  const [rows, setRows] = useState([{ id: 1, name: "", price: "", qty: "", amount: "" }]);
  const [elements, setelements] = useState([]);
  const [formErrors, setformErrors] = useState({})
  const { getData,saveData,setisLoading,getDataById } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    getItems();
    getIva();

  }, []);

  const getItems = () => {
    try {
      getData('items', setelements);
    } catch (error) {
      console.log(error);
    }
  }

  const getIva =async () =>{
    const id = '1CD8eWsz1ywHQvT4FqG7';
    getDataById('settings',setIVA,id);
    console.log(IVA);
  }

  const handleSave = async() => {
    let error = 0;
    error = Validate({setformErrors, data,rows});
    if(error>0){ 
      return;
    }
    try {
       saveData('quotations',data);
       navigate('/cotizacion/'+data.noOrden);
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
        <p className='text-capitalize'>Nueva cotización</p>
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
      />
    </div>
  )
}

export default QuotationCreate;