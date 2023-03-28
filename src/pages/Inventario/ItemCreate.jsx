import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CotizacionButtons, CotizacionContainer, CotizacionCustomerInfo, CotizacionCustomerInfoContainer, CotizacionError, CotizacionField,
  CotizacionInput, CotizacionLabel, CotizacionTextarea
} from '../Quotation/styles';
import { ItemH2 } from '../Inventario/styles';
import { SaveIcon } from '../../constantes/icons';
import { CustomImageUploading } from '../../components';
import { providers } from '../../constantes';
import Select from 'react-select';
import { useAuth } from '../../context/AuthContext';
import Validate from './Validate';
import Compressor from 'compressorjs';

const ItemCreate = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const { saveData, setisLoading } = useAuth();
  const [formErrors, setformErrors] = useState({ name: '', category: '' });


  const [compressedPhoto, setcompressedPhoto] = useState('');

  useEffect(() => {
    convertToBase64(compressedPhoto);
    console.log('COMPRESS: ' + compressedPhoto.size);
  }, [compressedPhoto]);


  const compressPhoto = (image) => {
    return new Compressor(image, {
      quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        setcompressedPhoto(compressedResult);
      },
    });
  }

  const convertToBase64 = (file) => {
    if (file) {
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          const base64 = fileReader.result;
          setdata(prevData => ({ ...prevData, ['photo']: base64 }));

        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    }
  };

  const onChangeImage = async (imageList, addUpdateIndex) => {
    setImages(imageList);
    if (imageList[0]) {
      const image = imageList[0].file;
      await compressPhoto(image);
    }else{
      setdata(prevData => ({ ...prevData, ['photo']: ''})) ;
    }
  };


  //----------------------------------
  const [data, setdata] = useState({ category: 'Otros' });
  const [categories, setcategories] = useState([]);
  let navigate = useNavigate();

  const { getData } = useAuth();


  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = () => {
    getData('categories', setcategories);

  }

  const handleSave = async () => {
    let error = 0;
    error = Validate({ setformErrors, data });

    if (error > 0) { return }

    console.log(data);
    const to = '/inventario/' + data.category + '/' + data.slug;
    saveData('items', data, to);
  }

  const handleInputChange = (e, fieldName) => {
    let { value } = e.target;
    if (fieldName === 'name') {
      const nameLowercase = value.toLowerCase();
      const slug = value
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      setdata(prevData => ({ ...prevData, ['nameLowercase']: nameLowercase, ['slug']: slug }));
    }

    if(fieldName === 'price' || fieldName === 'stock'){
      if(value < 0){
        value = 0;
      }
    }

    setdata(prevData => ({ ...prevData, [fieldName]: value }));
  };

  const handleSelectChange = (e, fieldName) => {
    setdata(prevData => ({ ...prevData, [fieldName]: e.name }));
  };


  return (
    <div>
      <div className='products-heading'>
        <Link to='/Inventario'>
          <ItemH2>Inventario</ItemH2>
        </Link>
        <p className='text-capitalize'>Agregar inventario</p>
      </div>

      <CotizacionContainer>
        <CotizacionCustomerInfo>
          <CotizacionCustomerInfoContainer>
            <CotizacionField>
              <CotizacionLabel>Foto</CotizacionLabel>
              <CustomImageUploading onChange={onChangeImage} images={images} maxNumber={maxNumber} />
            </CotizacionField>

            <CotizacionError className="has-error">{formErrors && formErrors.name}</CotizacionError>
            <CotizacionField>
              <CotizacionLabel>Nombre del item</CotizacionLabel>
              <CotizacionInput
                placeholder=' Ingresa el nombre'
                value={data.name || ''}
                onChange={(e) => handleInputChange(e, 'name')} />
            </CotizacionField>

            <CotizacionError className="has-error">{formErrors && formErrors.details}</CotizacionError>
            <CotizacionField>
              <CotizacionLabel>Descripción</CotizacionLabel>
              <CotizacionTextarea
                placeholder=' Ingresa la descripción'
                value={data.details || ''}
                onChange={(e) => handleInputChange(e, 'details')} />
            </CotizacionField>

            <CotizacionField>
              <CotizacionLabel>Ubicación</CotizacionLabel>
              <CotizacionTextarea
                placeholder=' Ingresa la ubicación ("Estante 1")'
                value={data.location || ''}
                onChange={(e) => handleInputChange(e, 'location')} />
            </CotizacionField>
            <CotizacionField>
              <CotizacionLabel>Stock</CotizacionLabel>
              <CotizacionInput
                placeholder=' Ingresa cantidad en stock'
                value={data.qty || ''}
                type='number'
                onChange={(e) => handleInputChange(e, 'qty')} />
            </CotizacionField>

            <CotizacionError className="has-error">{formErrors && formErrors.price}</CotizacionError>
            <CotizacionField>
              <CotizacionLabel>Precio</CotizacionLabel>
              <CotizacionInput
                placeholder=' Ingresa el precio'
                value={data.price || 0}
                type='number'
                onChange={(e) => handleInputChange(e, 'price')} />
            </CotizacionField>

            <CotizacionField>
              <CotizacionLabel>Tipo</CotizacionLabel>
              <CotizacionInput
                placeholder=' Ingresa el tipo de item (Cocktelero)'
                value={data.type || ''}
                type='text'
                onChange={(e) => handleInputChange(e, 'type')} />
            </CotizacionField>

            <CotizacionError className="has-error">{formErrors && formErrors.category}</CotizacionError>
            <CotizacionField>
              <CotizacionLabel>Categoría</CotizacionLabel>
              <Select
                className="dropdown"
                options={categories}
                getOptionLabel={option => `${option.data.name}`}
                getOptionValue={option => `${option.data.slug}`}
                value={categories.filter((c) => c.data.name === data.category)}
                onChange={(e) => { handleSelectChange(e.data, 'category') }}
              />
            </CotizacionField>

            <CotizacionField>
              <CotizacionLabel>Proveedor</CotizacionLabel>
              <Select
                className="dropdown"
                options={providers}
                getOptionLabel={option => `${option.name}`}
                getOptionValue={option => `${option.slug}`}
                value={providers.filter((c) => c.name === data.provider)}
                onChange={(e) => { handleSelectChange(e, 'provider') }}
              />
            </CotizacionField>
          </CotizacionCustomerInfoContainer>
        </CotizacionCustomerInfo>
        <CotizacionButtons className='buttons'>
          <Button className='btn btn-primary fa-2x' onClick={handleSave}>
            <SaveIcon /> Guardar
          </Button>
        </CotizacionButtons>
      </CotizacionContainer>
    </div>
  )
}

export default ItemCreate;