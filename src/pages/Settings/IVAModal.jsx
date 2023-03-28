import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Select from 'react-select';
import { ButtonsContainer, Field, Input, Label, Textarea } from '../../pages/styles';
import { ModalTitle } from '../../components/utils/CustomModal/styles';
import { CustomImageUploading } from '../../components';
import { CloseIcon, SaveIcon } from '../../constantes/icons';
import AnimatedModal from '../../components/utils/CustomModal/AnimatedModal';
import { providers } from '../../constantes';
import { ItemH2 } from '../Inventario/styles';

const IVAModal = (props) => {
    const {title,onClose,handleInputChange,handleSave} = props;
    const {data} = props;

    return (
        <AnimatedModal {...props} width='400px'>
            <ModalTitle>
                <ItemH2>{title ? title : 'Actualizar'}</ItemH2>
            </ModalTitle>

            <Field>
                <Label>IVA</Label>
                <div className='ivaContainer'>
                <Input
                    name='iva'
                    type='number'
                    value={data ? data.value : 0}
                    onChange={(e) => handleInputChange(e, 'value')}
                />
                <label>%</label>

                </div>
                
            </Field>
            <ButtonsContainer noBorder>
                <Button
                    type='button'
                    className='btn btn-danger fa-2x'
                    onClick={onClose}> <CloseIcon /> Cancelar</Button>
                <Button
                    type='button'
                    className='btn btn-primary fa-2x'
                    onClick={handleSave}> <SaveIcon /> Actualizar</Button>
            </ButtonsContainer>
        </AnimatedModal>
    )
}

export default IVAModal