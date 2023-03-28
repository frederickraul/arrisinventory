import React, { useEffect, useRef, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteIcon, PlusIcon, PrintIcon, SaveIcon } from '../../constantes/icons';

import { 
    CheckBoxContainer, 
    CotizacionButtons, 
    CotizacionContainer, 
    CotizacionCustomerInfo, 
    CotizacionCustomerInfoContainer, 
    CotizacionDateContainer, 
    CotizacionError, 
    CotizacionField, 
    CotizacionHeader, 
    CotizacionInput, 
    CotizacionLabel, 
    CotizacionPaid, 
    CotizacionPaidContainer, 
    CotizacionTextarea } from './styles';
  
  import {
    Button, 
    Table,
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow,
    Checkbox
  } from "@mui/material";
  
  import QuotationPrint from './QuotationPrint';
  import Select from 'react-select';
  import Moment from 'moment';
import { useReactToPrint } from 'react-to-print';


const Form = (props) => {
    const { data, rows, setRows,elements,setdata,handleSave,formErrors,isUpdate,isIvaActive, setisIvaActive,IVA} = props;
    
    const [deleteIndex, setdeleteIndex] = useState();

    const [showConfirm, setShowConfirm] = React.useState(false);

    const date =  Moment().format('DD-MM-YYYY');
    const time = Moment().format('hh:mm a');

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    const handleFieldChange = (e, index,fieldName) => {
        const { value } = e.target;
        const list = [...rows];
        const price = list[index]['price'];
        const amount = value * price;
    
        list[index][fieldName] = value;
        list[index]['amount'] = amount.toFixed(2);
        setRows(list);
        setdata(prevData => ({ ...prevData, ['rows']: list }));

      };
    
      const handleSelectChange = (e, index,fieldName) => {
        const list = [...rows];
        list[index][fieldName] = e.name;
        list[index]['price'] = e.price;
        list[index]['qty'] = 1;
        list[index]['amount'] = Number(e.price).toFixed(2);
        setRows(list);
        setdata(prevData => ({ ...prevData, ['rows']: list }));
        calculateNetTotal();
      };


  useEffect(() => {
    calculateNetTotal();
  }, [rows,isIvaActive]);


  // Function For adding new row object
  const handleAdd = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1, name: "",price:"",
        qty: "", amount: ""
      },
    ]);
  };

  // Function to handle save



  const handleCheckbox= () =>{
    setisIvaActive(!isIvaActive);
    !isIvaActive || setdata(prevData => ({ ...prevData, ['iva']: 0 }));

  }
  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes 
  // to input elements and record their values in state

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setdata(prevData => ({...prevData, [fieldName]: value}));
    
  };

  const calculateNetTotal = () => {
    let acu = 0;
    rows.forEach(element => {
      acu += Number(element.amount);
    });

    const grossamount = Number(acu);
    
    const iva = (grossamount * (isIvaActive?(IVA/10) : 0));
    
    const netamount = (grossamount + iva);
    setdata(prevData => ({ ...prevData, 
      ['grossAmount']: grossamount.toFixed(2), 
      ['iva']: iva.toFixed(2), 
      ['netAmount']: netamount.toFixed(2) }));
  }

  // Showing delete confirmation to users
  const handleConfirm = (i) => {
    setdeleteIndex(i);
    setShowConfirm(true);
    
  };

  // Handle the case of delete confirmation where 
  // user click yes delete a specific row of id:i
  const handleRemoveClick = (i) => {
    const list = [...rows];
    list.splice(i, 1);
    setRows(list);
    setdata(prevData => ({ ...prevData, ['rows']: list }));
    setShowConfirm(false);
  };

  // Handle the case of delete confirmation 
  // where user click no 
  const handleNo = () => {
    setShowConfirm(false);
  };

    
      return (
    <CotizacionContainer>
      <CotizacionHeader>
        <h2></h2>
        <CotizacionDateContainer>
          <CotizacionLabel>Fecha: {date}</CotizacionLabel>
          <CotizacionLabel>Hora: {time}</CotizacionLabel>
        </CotizacionDateContainer>
      </CotizacionHeader>
        <CotizacionCustomerInfo>
          <CotizacionCustomerInfoContainer>

          <CotizacionError className="has-error">{formErrors&& formErrors.customerName}</CotizacionError>
            <CotizacionField>
              <CotizacionLabel>Nombre del cliente</CotizacionLabel>
              <CotizacionInput 
                  placeholder=' Ingresa el nombre' 
                  value={data.customerName || ''} 
                  onChange={(e)=>handleInputChange(e,'customerName')}/>
            </CotizacionField>
            <CotizacionField>
              <CotizacionLabel>Dirección del cliente</CotizacionLabel>
              <CotizacionTextarea 
                  placeholder=' Ingresa la dirección' 
                  value={data.customerAddress|| ''}  
                  onChange={(e)=>handleInputChange(e,'customerAddress')}/>
            </CotizacionField>
            <CotizacionField>
              <CotizacionLabel>Número del teléfono del cliente</CotizacionLabel>
              <CotizacionInput 
              placeholder=' Ingresa el teléfono' 
              value={data.customerPhoneNumber || ''}  
              onChange={(e)=>handleInputChange(e,'customerPhoneNumber')}/>
            </CotizacionField>
          </CotizacionCustomerInfoContainer>
        </CotizacionCustomerInfo>
        <div className='addButtonContainer'>
        <Button className='text-success fa-2x addButtonSM' onClick={handleAdd}>
                    <PlusIcon  />
                  </Button>

        </div>
        <div className='tableContainer'>
          <CotizacionError className="has-error">{formErrors&& formErrors.rows}</CotizacionError>
   
          <Table
            stickyHeader aria-label="sticky table"
            className="table"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                     <CotizacionLabel>Item</CotizacionLabel>
            </TableCell>
                <TableCell> <CotizacionLabel>Cantidad</CotizacionLabel></TableCell>
                <TableCell> <CotizacionLabel>Monto</CotizacionLabel></TableCell>
                <TableCell>
                  <Button className='text-success fa-2x addButton' onClick={handleAdd}>
                    <PlusIcon  />
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell padding='normal' style={{width: '75%'}} >
                    <Select
                        name={'name'+i} 
                        className="dropdown" 
                        options={elements} 
                        getOptionLabel={option =>`${option.data.name}`} 
                        getOptionValue={option => `${option.data.slug}`}
                        value={elements.filter((c) => c.data.name === row.name)}
                        onChange={(e)=>{handleSelectChange(e.data, i,'name')}}
                        />
                  </TableCell>
                  <TableCell padding="normal" style={{width: '10%'}} >
                    <CotizacionInput
                      name={'qty'+i}
                      type='number'
                      value={row.qty}
                      onChange={(e) => handleFieldChange(e, i,'qty')}
                    />
                  </TableCell>
                  <TableCell padding="normal" style={{width: '10%'}} >
                    <CotizacionInput
                      name={'amount'+i}
                      type='number'
                      value={Number(row.amount).toFixed(2)}
                      readOnly
                    />
                  </TableCell>
                  <TableCell style={{width: '5%'}} >
                  <Button className="text-danger fa-2x" onClick={(e)=>{handleConfirm(i)}}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>


                  {showConfirm && (
                    <div>
                      <Dialog
                        open={showConfirm}
                        onClose={handleNo}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Confirmar"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            ¿Estas seguro de eliminar el item de la cotización?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => handleRemoveClick(deleteIndex)}
                            color="primary"
                            autoFocus
                          >
                            Si
                          </Button>
                          <Button
                            onClick={handleNo}
                            color="primary"
                            autoFocus
                          >
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <CotizacionPaidContainer>
            <CotizacionPaid>
            <CotizacionField alignSM='flex-end' align='flex-end' center>
                <CotizacionLabel >Incluir IVA</CotizacionLabel>
                <CheckBoxContainer><Checkbox checked={isIvaActive} onChange={handleCheckbox}/></CheckBoxContainer>
              </CotizacionField>
              <CotizacionField align='flex-end'>
                <CotizacionLabel >Subtotal</CotizacionLabel>
                <CotizacionInput value={data.grossAmount || 0} readOnly/>
              </CotizacionField>
              <CotizacionField align='flex-end'>
                <CotizacionLabel>IVA {IVA || 0}%</CotizacionLabel>
                <CotizacionInput value={data.iva || 0} readOnly/>
              </CotizacionField>
              <CotizacionField align='flex-end'>
                <CotizacionLabel bold>Total</CotizacionLabel>
                <CotizacionInput value={ data.netAmount || 0} readOnly/>
              </CotizacionField>
            </CotizacionPaid>
        </CotizacionPaidContainer>
        <CotizacionButtons className='buttons'>
        {isUpdate &&
          <div>
            <div className='hidden'>
              <QuotationPrint
                data={data}
                rows={rows}
                noOrden={data.noOrden}
                date={date}
                time={time}
                ref={componentRef} />
            </div>
            <div>
              <Button className='btn btn-dark fa-2x' onClick={handlePrint}>
                <PrintIcon /> Imprimir
              </Button>

            </div>
          </div>}
        <Button className='btn btn-primary fa-2x' onClick={handleSave}>
         <SaveIcon/> {isUpdate ? 'Actualizar' : 'Guardar'}
        </Button>
      </CotizacionButtons>
      </CotizacionContainer>
  )
}

export default Form