import { Button } from '@mui/material';
import React from 'react'
import { SaveIcon } from '../../constantes/icons';
import { CotizacionButtons, CotizacionError, CotizacionField, CotizacionInput, CotizacionLabel, CotizacionTextarea } from '../Quotation/styles'
import { CotizacionContainer, CotizacionCustomerInfo,CotizacionCustomerInfoContainer } from '../styles'

const Form = (props) => {
    const {formErrors,data,handleInputChange,handleSave,isUpdate} = props;
  return (
    <CotizacionContainer>
    <CotizacionCustomerInfo>
      <CotizacionCustomerInfoContainer>
      <CotizacionError className="has-error">{formErrors&& formErrors.name}</CotizacionError>
        <CotizacionField>
          <CotizacionLabel>Nombre del proveedor</CotizacionLabel>
          <CotizacionInput
            placeholder=' Ingresa el nombre'
            value={data.name || ''}
            onChange={(e) => handleInputChange(e, 'name')} />
        </CotizacionField>
        <CotizacionField>
          <CotizacionLabel>Dirección del proveedor</CotizacionLabel>
          <CotizacionTextarea
            placeholder=' Ingresa la dirección'
            value={data.address || ''}
            onChange={(e) => handleInputChange(e, 'address')} />
        </CotizacionField>
        <CotizacionField>
          <CotizacionLabel>Número del teléfono del proveedor</CotizacionLabel>
          <CotizacionInput
            placeholder=' Ingresa el teléfono'
            value={data.phone  || ''}
            type='text'
            onChange={(e) => handleInputChange(e, 'phone')} />
        </CotizacionField>
      </CotizacionCustomerInfoContainer>
    </CotizacionCustomerInfo>
    <CotizacionButtons className='buttons'>
      <Button className='btn btn-primary fa-2x' onClick={handleSave}>
       <SaveIcon/>{isUpdate? 'Actualizar' : 'Guardar'}
      </Button>
    </CotizacionButtons>
  </CotizacionContainer>
  )
}

export default Form