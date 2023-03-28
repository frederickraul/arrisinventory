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
  CotizacionTextPrint,
} from '../Quotation/styles';

import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Logo } from "../../components/Sidebar/styles";
import { newLogo } from "../../assets";
import CustomCheckbox from "../../components/utils/CustomCheckbox";


// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
const ListPrint = React.forwardRef((props, ref) => {
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
              <CotizacionLabelPrint>Tipo de evento: </CotizacionLabelPrint>
              <label className="text-uppercase">{data.name}</label>
            </CotizacionFieldPrint>
            <CotizacionFieldPrint align='flext-start'>
              <CotizacionTextPrint>Evento para</CotizacionTextPrint> 
              <CotizacionLabelPrint> {data.numberPeople}</CotizacionLabelPrint>
             personas.
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
                <TableCell  align="center" > <CotizacionLabel>Ubicación</CotizacionLabel></TableCell>
                <TableCell  align="center" > <CotizacionLabel>Cantidad</CotizacionLabel></TableCell>
                <TableCell  align="center" > <CotizacionLabel>Completado</CotizacionLabel></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell padding='normal' style={{ width: '75%' }} >
                    {row.name}
                  </TableCell>
                  <TableCell  align="center"  padding="normal" style={{ width: '10%' }} >
                    {row.location}
                  </TableCell>
                  <TableCell  align="center"  padding="normal" style={{ width: '10%' }} >
                    {row.qty}
                  </TableCell>
                  <TableCell align="center" padding="normal" style={{ width: '10%' }} >
                    <CustomCheckbox checked={row.complete}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CotizacionContainer>


    </div>
  );
});

export default ListPrint;