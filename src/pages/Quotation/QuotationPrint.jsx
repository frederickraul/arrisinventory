import React from "react";
import {
  CotizacionColumn,
  CotizacionContainer,
  CotizacionCustomerInfo,
  CotizacionCustomerInfoContainer,
  CotizacionDateContainer,
  CotizacionField,
  CotizacionFieldPrint,
  CotizacionHeaderPrint,
  CotizacionLabel,
  CotizacionLabelPrint,
  CotizacionPaid,
  CotizacionPaidContainer,
} from './styles';

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Logo } from "../../components/Sidebar/styles";
import { newLogo } from "../../assets";


// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
const QuotationPrint = React.forwardRef((props, ref) => {
  const { data, rows, noOrden, date, time } = props;

  return (
    <div ref={ref}>
      <CotizacionContainer white>
        <CotizacionHeaderPrint>
          <Logo src={newLogo} alt="logo" />
          <CotizacionDateContainer>
            <CotizacionLabel>Fecha: {date}</CotizacionLabel>
            <CotizacionLabel>Hora: {time}</CotizacionLabel>
          </CotizacionDateContainer>
        </CotizacionHeaderPrint>
        <CotizacionCustomerInfo>
          <CotizacionCustomerInfoContainer>
            <CotizacionFieldPrint align='flex-start'>
              <CotizacionLabelPrint>Orden: </CotizacionLabelPrint>
              <label className="text-uppercase">{noOrden}</label>
            </CotizacionFieldPrint>
            <CotizacionFieldPrint align='flex-start'>
              <CotizacionLabelPrint>Nombre del cliente: </CotizacionLabelPrint>
              {data.customerName}
            </CotizacionFieldPrint>
            <CotizacionFieldPrint align='flext-start'>
              <CotizacionLabelPrint>Dirección del cliente: </CotizacionLabelPrint>
              {data.customerAddress}
            </CotizacionFieldPrint>
            <CotizacionFieldPrint align='flext-start'>
              <CotizacionLabelPrint>Número del teléfono del cliente: </CotizacionLabelPrint>
              {data.customerPhoneNumber}
            </CotizacionFieldPrint>
          </CotizacionCustomerInfoContainer>
        </CotizacionCustomerInfo>
        <div className='tableContainer'>
          <Table
            stickyHeader aria-label="sticky table"
            className="table"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell> <CotizacionLabel>Item</CotizacionLabel></TableCell>
                <TableCell> <CotizacionLabel>Cantidad</CotizacionLabel></TableCell>
                <TableCell> <CotizacionLabel>Monto</CotizacionLabel></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell padding='normal' style={{ width: '75%' }} >
                    {row.name}
                  </TableCell>
                  <TableCell padding="normal" style={{ width: '10%' }} >
                    {row.qty}
                  </TableCell>
                  <TableCell padding="normal" style={{ width: '10%' }} >
                    {Number(row.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <CotizacionPaidContainer>
          <CotizacionPaid>
            <CotizacionField align='flex-end'>
              <CotizacionColumn align='flex-end'>
                <CotizacionLabel >Subtotal</CotizacionLabel>
              </CotizacionColumn>
              <CotizacionColumn>
                ${data.grossAmount}
              </CotizacionColumn>
            </CotizacionField>
            <CotizacionField align='flex-end'>
              <CotizacionColumn align='flex-end'>
                <CotizacionLabel>IVA 8%</CotizacionLabel>
              </CotizacionColumn>
              <CotizacionColumn>
                ${data.iva}

              </CotizacionColumn>
            </CotizacionField>
            <CotizacionField align='flex-end'>
              <CotizacionColumn align='flex-end'>
                <CotizacionLabel bold>Total</CotizacionLabel>
              </CotizacionColumn>
              <CotizacionColumn>
                ${data.netAmount}

              </CotizacionColumn>
            </CotizacionField>
          </CotizacionPaid>
        </CotizacionPaidContainer>
      </CotizacionContainer>


    </div>
  );
});

export default QuotationPrint;