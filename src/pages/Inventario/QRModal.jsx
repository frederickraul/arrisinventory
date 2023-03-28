import React from 'react'
import AnimatedModal from '../../components/utils/CustomModal/AnimatedModal';
import Button from '@mui/material/Button';
import Select from 'react-select';
import { ButtonsContainer, Field, Input, Label, Textarea } from '../styles';
import { ModalTitle } from '../../components/utils/CustomModal/styles';
import { ItemH2 } from './styles';
import { CustomImageUploading } from '../../components';
import { CloseIcon, SaveIcon } from '../../constantes/icons';
import { CotizacionError } from '../Quotation/styles';
import QRCode from 'react-qr-code';
import { CardH2 } from '../../components/Card/styles';

const QRModal = (props) => {
    const { name,category,slug } = props.data;
    const rootURL = window.location.origin;
    const to = rootURL+ '/inventario/'+category+'/'+slug;
    return (
        <AnimatedModal {...props}>
            <ModalTitle>
                <ItemH2>Código QR</ItemH2>
            </ModalTitle>
            <div className='qr-container'>
            <QRCode value={to}/>
            <br/>
            <h2>{name}</h2>
            </div>
            <br/>
            <br/>
            <ButtonsContainer>
                <div></div>
                <Button
                    type='button'
                    className='btn btn-danger fa-2x'
                    onClick={props.onClose}> <CloseIcon /> Cerrar</Button>
            </ButtonsContainer>
        </AnimatedModal>
    )
}

export default QRModal;