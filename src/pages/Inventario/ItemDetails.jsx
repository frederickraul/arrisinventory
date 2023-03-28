import {Button} from '@mui/material';
import Compressor from 'compressorjs';
import React, { useEffect, useState } from 'react';
import { CheckmarkIcon } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { noAvailableImg } from '../../assets';
import { ItemCover } from '../../components/Item/styles';
import { providers } from '../../constantes';
import { MinusIcon, PlusIcon, QRIcon, UpdateIcon } from '../../constantes/icons';
import { useAuth } from '../../context/AuthContext';
import ItemModal from './ItemModal';
import QRModal from './QRModal';
import { ItemButtonContainer, ItemH2, ItemH4, ItemSaveButton } from './styles';
import Validate from './Validate';


const ItemDetails = () => {

  const [images, setImages] = useState([]);
  const maxNumber = 1;

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
  const { slug } = useParams();
  const [data, setdata] = useState([]);
  const [item, setitem] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isQROpen, setisQROpen] = useState(false);
  const [categoryRoute, setcategoryRoute] = useState('');
  const [categories, setcategories] = useState([]);
  const [isqtyUpdated, setisqtyUpdated] = useState(false);
  const {updateData,setisLoading} = useAuth();
  const [formErrors, setformErrors] = useState({name: '',category:''});
  
  const {getDataWhere,getData} = useAuth(); 
  useEffect(() => {
    getCategories();
    getItem();
  }, []);

  useEffect(() => {
    if(item[0]){
      const route = item[0].data.category;
      setdata(item[0].data); 
      setcategoryRoute(route.toLowerCase())}
  }, [item]);
  


  const getCategories = () => {
    getData('categories', setcategories);
  }
  
  
  const getItem =() =>{
    try {
      getDataWhere('items',setitem,'slug','==',slug,);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = async() => {
    let error = 0;
    error = Validate({setformErrors, data});
    
    if(error>0){ return}
    try {
       updateData('items',data,item[0].id);
       setcategoryRoute(data.category);
       setisqtyUpdated(false);
      handleModalClose();

    } catch (error) {
    }
    await setTimeout(5000);
    setisLoading(false);
  }
  

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    if(fieldName === 'name'){
      const nameLowercase = value.toLowerCase();
      const slug = value
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'');
          setdata(prevData => ({ ...prevData, ['nameLowercase']: nameLowercase ,['slug']: slug }));
    }

    setdata(prevData => ({ ...prevData, [fieldName]: value }));
  }

  const handleSelectChange = (e, fieldName) => {
    setdata(prevData => ({ ...prevData, [fieldName]: e.name }));
  }


  const handleIncQty = () => {
    let newqty = data.qty;
    if(newqty == null)newqty=0;
    setdata(prevData => ({ ...prevData, ['qty']: Number(newqty) + 1 }));
    !isqtyUpdated && setisqtyUpdated(true);
  }

  const handleDecQty = () => {
    let newqty = data.qty;
    if(newqty == null)newqty=0;
    setdata(prevData => ({ ...prevData, ['qty']:  (Number(newqty) - 1 < 0) ? 0 : Number(newqty) - 1  }));
    !isqtyUpdated && setisqtyUpdated(true);

  }

  const handleModalOpen = () => {
    data.photo && setImages([{data_url: data.photo}]);
    
    setisModalOpen(true);
  }

  const handleModalClose = () => {
    setisModalOpen(false);
  }
  
  const handleShowQR = () => {
    setisQROpen(!isQROpen);
  }

  return (
    <div>
      <div className='products-heading'>
        <Link to='/inventario'>
          <ItemH2>Inventario</ItemH2>
        </Link>
        <Link to={'/inventario/'+ categoryRoute.toLowerCase()}>
        <p className='text-capitalize'>{data.category == null ? 'Otros' : data.category}</p>
        </Link>
      </div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
              <ItemCover
                background={data.photo ? data.photo : noAvailableImg}
                className="product-detail-image"
              />
            
          </div>

        </div>
        <div className='product-detail-desc'>
          <h1>{data.name}</h1>
          <ItemH4>Descripción: </ItemH4>
          <p>{data.details}</p>
          <ItemH4>Precio: </ItemH4>
          <p>${data.price || 0}</p>
          <ItemH4>Tipo: </ItemH4>
          <p>{data.type}</p>
          <ItemH4>Ubicación: </ItemH4>
          <p>{data.location}</p>
          <ItemH4>Cantidad: </ItemH4>
          <div className='quantity'>
            <p className='quantity-desc'>
              <span className='minus' onClick={() => handleDecQty()}> <MinusIcon /> </span>
              <span className='num' > {Number(data.qty)}  </span>
              <span className='plus' onClick={() => handleIncQty()}> <PlusIcon /> </span>
            </p>
            <ItemButtonContainer>
              {isqtyUpdated && 
            <ItemSaveButton onClick={handleSave}>
              <CheckmarkIcon/>
            </ItemSaveButton>
            }
            </ItemButtonContainer>

          </div>
          <div className='buttons'>
            <div>
              <Button
                type='button'
                className='btn btn-warning-alt fa-2x'
                onClick={handleModalOpen}> <UpdateIcon /> Modificar</Button>
              <Button
                type='button'
                className='btn btn-dark fa-2x'
                onClick={handleShowQR}> <QRIcon /> Código QR</Button>

                <ItemModal
                  open={isModalOpen}
                  onClose={handleModalClose}
                  data={data}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                  categories={categories}
                  providers={providers}
                  formErrors={formErrors}
                  handleSave={handleSave}
                  onChangeImage={onChangeImage}
                  maxNumber={maxNumber}
                  images={images}
                />
                <QRModal
                    open={isQROpen}
                    onClose={handleShowQR}
                    data={data}
                />
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}



export default ItemDetails;