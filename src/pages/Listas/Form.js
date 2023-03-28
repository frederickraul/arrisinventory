import React, { useEffect, useRef, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteIcon, PlusIcon, PrintIcon, SaveIcon } from '../../constantes/icons';

import {
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
} from '../Quotation/styles';

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

import Select from 'react-select';
import Moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import ListPrint from './ListPrint';
import CustomCheckbox from '../../components/utils/CustomCheckbox';


const Form = (props) => {
    const { data, rows, setRows, elements, setdata, handleSave, formErrors, isUpdate, } = props;
    const [deleteIndex, setdeleteIndex] = useState();
    const [showConfirm, setShowConfirm] = React.useState(false);

    const date = Moment().format('DD-MM-YYYY');
    const time = Moment().format('hh:mm a');

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleFieldChange = (e, index, fieldName) => {
        const { value } = e.target;
        const list = [...rows];

        list[index][fieldName] = value;
        setRows(list);
        setdata(prevData => ({ ...prevData, ['rows']: list }));

    };

    const handleSelectChange = (e, index, fieldName) => {
        const list = [...rows];
        list[index][fieldName] = e.name;
        list[index]['location'] = e.location ? e.location : 'N/D';
        list[index]['qty'] = 1;
        list[index]['complete'] = false;
        setRows(list);
        setdata(prevData => ({ ...prevData, ['rows']: list }));
    };


    // Function For adding new row object
    const handleAdd = () => {
        setRows([
            ...rows,
            {
                id: rows.length + 1, name: "", location: "",
                qty: "", complete: false
            },
        ]);
    };

    const handleCheckbox = (e, index, fieldName) => {
        const list = [...rows];
        const isCheck = list[index][fieldName];
        list[index][fieldName] = !isCheck;
        setRows(list);
        setdata(prevData => ({ ...prevData, ['rows']: list }));
    }

    // The handleInputChange handler can be set up to handle
    // many different inputs in the form, listen for changes 
    // to input elements and record their values in state

    const handleInputChange = (e, fieldName) => {
        const { value } = e.target;
        if (fieldName === 'name') {
            const slug = value
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
            setdata(prevData => ({ ...prevData, ['slug']: slug }));
        }

        setdata(prevData => ({ ...prevData, [fieldName]: value }));

    };

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
                <h2>{data.name || ''}</h2>
                <CotizacionDateContainer>
                </CotizacionDateContainer>
            </CotizacionHeader>
            <CotizacionCustomerInfo>
                <CotizacionCustomerInfoContainer>
                    <CotizacionError className="has-error">{formErrors && formErrors.name}</CotizacionError>
                    <CotizacionField>
                        <CotizacionLabel>Nombre del evento</CotizacionLabel>
                        <CotizacionInput
                            placeholder=' Ingresa el nombre de la lista'
                            value={data.name || ""}
                            onChange={(e) => handleInputChange(e, 'name')} />
                    </CotizacionField>
                    <CotizacionField>
                        <CotizacionLabel>Cantidad de personas</CotizacionLabel>
                        <CotizacionInput
                            placeholder=' Ingresa la cantidad de personas'
                            value={data.numberPeople || ""}
                            onChange={(e) => handleInputChange(e, 'numberPeople')} />
                    </CotizacionField>
                </CotizacionCustomerInfoContainer>
            </CotizacionCustomerInfo>
            <div className='addButtonContainer'>
                <Button className='text-success fa-2x addButtonSM' onClick={handleAdd}>
                    <PlusIcon />
                </Button>

            </div>

            <div className='tableContainer'>
                <div>
                    <CotizacionError className="has-error">{formErrors && formErrors.rows}</CotizacionError>

                </div>
                <Table
                    stickyHeader aria-label="sticky table"
                    className="table"
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell> <CotizacionLabel>Item</CotizacionLabel></TableCell>
                            <TableCell size='small'> <CotizacionLabel>Ubicación</CotizacionLabel></TableCell>
                            <TableCell size='small'> <CotizacionLabel>Cantidad</CotizacionLabel></TableCell>
                            <TableCell size='small'>  <CotizacionLabel>Completado</CotizacionLabel></TableCell>
                            <TableCell size='small'>

                                <Button className='text-success fa-2x addButton' onClick={handleAdd}>
                                    <PlusIcon onClick={handleAdd} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell padding='normal' style={{ width: '75%' }} >
                                    <Select
                                        name={'name' + i}
                                        className="dropdown"
                                        options={elements}
                                        getOptionLabel={option => `${option.data.name}`}
                                        getOptionValue={option => `${option.data.slug}`}
                                        value={elements.filter((c) => c.data.name === row.name)}
                                        onChange={(e) => { handleSelectChange(e.data, i, 'name') }}
                                    />
                                </TableCell>
                                <TableCell padding='normal' style={{ width: '75%' }} >
                                    <CotizacionInput
                                        name={'location' + i}
                                        value={row.location || ''}
                                        onChange={(e) => handleFieldChange(e, i, 'qty')}
                                        readOnly
                                    />
                                </TableCell>
                                <TableCell className='cell'>
                                    <CotizacionInput
                                        name={'qty' + i}
                                        type='number'
                                        value={row.qty || 0}
                                        onChange={(e) => handleFieldChange(e, i, 'qty')}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <CustomCheckbox
                                        name={'complete' + i}
                                        className='checkbox'
                                        checked={row.complete}
                                        onChange={(e) => { handleCheckbox(e, i, 'complete') }} />
                                </TableCell>


                                <TableCell className='cell'>
                                    <Button className="text-danger fa-2x" onClick={(e) => { handleConfirm(i) }}>
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

            <CotizacionButtons className='buttons'>
                {isUpdate &&
                    <div>
                        <div className='hidden'>
                            <ListPrint
                                data={data}
                                rows={rows}
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
                    <SaveIcon /> {isUpdate ? 'Actualizar' : 'Guardar'}
                </Button>
            </CotizacionButtons>

        </CotizacionContainer>
    )
}

export default Form