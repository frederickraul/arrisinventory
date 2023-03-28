import React from 'react'
import Button from '@mui/material/Button';
import Select from 'react-select';
import { ButtonsContainer, Field, Input, Label, Textarea } from '../../styles';
import { ModalTitle } from '../../../components/utils/CustomModal/styles';
import { CustomImageUploading } from '../../../components';
import { CloseIcon, SaveIcon } from '../../../constantes/icons';
import AnimatedModal from '../../../components/utils/CustomModal/AnimatedModal';
import { providers } from '../../../constantes';
import { ItemH2 } from '../../Inventario/styles';
import { genders } from '../../../constantes/genders';
import { CardHR } from '../../../components/Card/UserCardNew/styles';
import { rols } from '../../../constantes/rols';
import { CotizacionError } from '../../Quotation/styles';

const UserModal = (props) => {
    const { name, email, gender,rol, address, phone, photo,password,passwordConfirm } = props.data;
    const { 
        handleInputChange, 
        handleSelectChange, 
        onChangeImage, 
        images, 
        maxNumber, 
        onCreateItem, 
        onUpdateItem, 
        isUpdate, 
        setImages, 
        userId,
        userType, 
        index,
        formErrors } = props;


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
                    setImages={setImages}
                    maxNumber={maxNumber}
                    image={photo}
                />

            </Field>
            <Field>
                <Label>Tipo de usuario</Label>
                {rol=== 'god' ?
                <Input
                    type='text'
                    readOnly={true}
                    value='Programador'
                    onChange={(e) => handleInputChange(e, 'newRol')}
                />
                :
                <Select
                    isDisabled={userType !== 'god' ? true: false}
                    className="dropdown"
                    options={rols}
                    value={rols.filter((c) => c.value === rol)}
                    onChange={(e) => { handleSelectChange(e, 'rol') }}
                    />
                }
            </Field>

            <CotizacionError className="has-error">{formErrors&& formErrors.email}</CotizacionError>
            <Field>
                <Label>Usuario</Label>
                <Input
                    placeholder='user@dominio.com'
                    type='email'
                    readOnly={isUpdate ? true : false}
                    value={email || ''}
                    onChange={(e) => handleInputChange(e, 'email')}
                />
            </Field>
            {!isUpdate && (
                <div>
                    <Field>
                        <Label>Contraseña</Label>
                        <Input

                            value={password || ''}
                            onChange={(e) => handleInputChange(e, 'newemail')}
                        />
                    </Field>

                    <Field>
                        <Label>Confirmar Contraseña</Label>
                        <Input

                            value={passwordConfirm || ''}
                            onChange={(e) => handleInputChange(e, 'newemail')}
                        />
                    </Field>
                </div>
            )}

            <CardHR/>

            <CotizacionError className="has-error">{formErrors&& formErrors.name}</CotizacionError>
            <Field>
                <Label>Nombre</Label>
                <Input
                    value={name || ''}
                    onChange={(e) => handleInputChange(e, 'name')}
                />
            </Field>
           
            <Field>
                <Label>Sexo</Label>
                <Select
                    className="dropdown"
                    options={genders}
                    value={genders.filter((c) => c.value === gender)}
                    onChange={(e) => { handleSelectChange(e, 'gender') }}
                />
            </Field>
            <Field>
                <Label>Telefono</Label>
                <Input
                    value={phone || ''}
                    onChange={(e) => handleInputChange(e, 'phone')}
                />
            </Field>
            <Field>
                <Label>Domicilio</Label>
                <Textarea
                    value={address || ''}
                    onChange={(e) => handleInputChange(e, 'address')}
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
                    onClick={() => {
                        isUpdate ? onUpdateItem() : onCreateItem()
                    }}> <SaveIcon /> {isUpdate ? 'Actualizar' : 'Guardar'}</Button>
            </ButtonsContainer>
        </AnimatedModal>
    )
}

export default UserModal;