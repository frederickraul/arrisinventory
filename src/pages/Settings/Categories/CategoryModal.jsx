import React from 'react'
import Button from '@mui/material/Button';
import Select from 'react-select';
import { ButtonsContainer, Field, Input, Label, Textarea } from '../../../pages/styles';
import { ModalTitle } from '../../../components/utils/CustomModal/styles';
import { CustomImageUploading } from '../../../components';
import { CloseIcon, SaveIcon } from '../../../constantes/icons';
import AnimatedModal from '../../../components/utils/CustomModal/AnimatedModal';
import { providers } from '../../../constantes';
import { ItemH2 } from '../../Inventario/styles';

const CategoryModal = (props) => {
    
    const { name, desc, image } = props.data;
    const { handleInputChange, handleSelectChange, onChangeImage, images, maxNumber,onCreateItem,onUpdateItem,isUpdate } = props;
    return (
        <AnimatedModal {...props}>
            <ModalTitle>
                <ItemH2>{props.title ? props.title : 'Actualizar'}</ItemH2>
            </ModalTitle>
            <Field>
                <Label>Foto</Label>
                <CustomImageUploading
                    onChange={onChangeImage}
                    images={images}
                    maxNumber={maxNumber}
                    image={image}
                />

            </Field>
            <Field>
                <Label>Nombre</Label>
                <Input
                    value={name || ''}
                    onChange={(e) => handleInputChange(e, 'name')}
                />
            </Field>
            <Field>
                <Label>Descripción</Label>
                <Textarea
                    value={desc || ''}
                    onChange={(e) => handleInputChange(e, 'desc')}
                />
            </Field>
         
            <ButtonsContainer>
                <Button
                    type='button'
                    className='btn btn-danger fa-2x'
                    onClick={props.onClose}> <CloseIcon /> Cancelar</Button>
                <Button
                    type='button'
                    className='btn btn-primary fa-2x'
                    onClick={()=>{
                        isUpdate ? onUpdateItem() : onCreateItem()}}> <SaveIcon /> {isUpdate ? 'Actualizar' : 'Guardar'}</Button>
            </ButtonsContainer>
        </AnimatedModal>
    )
}

export default CategoryModal