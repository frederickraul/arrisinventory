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

const ItemModal = (props) => {
    const { name, details, type, price, provider, image, category,location } = props.data;
    const { handleInputChange, handleSelectChange, onChangeImage, images, maxNumber,handleSave,formErrors,categories,providers } = props;

    return (
        <AnimatedModal {...props}>
            <ModalTitle>
                <ItemH2>Actualizar</ItemH2>
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

            <CotizacionError className="has-error">{formErrors&& formErrors.name}</CotizacionError>
            <Field>
                <Label>Nombre</Label>
                <Input
                    value={name || ''}
                    onChange={(e) => handleInputChange(e, 'name')}
                />
            </Field>
            
            <CotizacionError className="has-error">{formErrors&& formErrors.details}</CotizacionError>
            <Field>
                <Label>Descripción</Label>
                <Textarea
                    value={details || ''}
                    onChange={(e) => handleInputChange(e, 'details')}
                />
            </Field>

            <Field>
                <Label>Ubicación</Label>
                <Input
                    type='text'
                    value={location || ''}
                    onChange={(e) => handleInputChange(e, 'location')}
                />
            </Field>
            <Field>
                <Label>Precio</Label>
                <Input
                    type='number'
                    value={price || ''}
                    onChange={(e) => handleInputChange(e, 'price')}
                />
            </Field>
            <Field>
                <Label>Tipo</Label>
                <Input
                    value={type || ''}
                    onChange={(e) => handleInputChange(e, 'type')}
                />
            </Field>
            

            <CotizacionError className="has-error">{formErrors&& formErrors.category}</CotizacionError>
            <Field>
                <Label>Categoría</Label>
                <Select
                    className="dropdown"
                    options={categories}
                    getOptionLabel={option => `${option.data.name}`}
                    getOptionValue={option => `${option.data.slug}`}
                    value={categories.filter((c) => c.data.name === category)}
                    onChange={(e) => { handleSelectChange(e.data, 'category') }}
                />
            </Field>
            <Field>
                <Label>Proveedor</Label>
                <Select
                    className="dropdown"
                    options={providers}
                    getOptionLabel={option => `${option.name}`}
                    getOptionValue={option => `${option.slug}`}
                    value={providers.filter((c) => c.name === provider)}
                    onChange={(e) => { handleSelectChange(e, 'provider') }}
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
                    onClick={handleSave}> <SaveIcon /> Actualizar</Button>
            </ButtonsContainer>
        </AnimatedModal>
    )
}

export default ItemModal;