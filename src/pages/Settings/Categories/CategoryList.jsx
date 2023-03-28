import {  Fab } from '@mui/material';
import Compressor from 'compressorjs';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { MdWarning } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CategoryCard } from '../../../components';
import AlertDialog from '../../../components/utils/AlertDialog';
import { theme } from '../../../constantes';
import { PlusIcon } from '../../../constantes/icons';
import { useAuth } from '../../../context/AuthContext';
import { storage } from '../../../lib/firebase';
import { ItemH2 } from '../../Inventario/styles';
import CategoryModal from './CategoryModal';



const CategoryList = () => {
  const [isUpdate, setisUpdate] = useState(false);
  const [categories, setcategories] = useState([]);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [index, setindex] = useState();

  const [data, setdata] = useState([]);
  const [modalTitle, setmodalTitle] = useState('Registrar')
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isAlertOpen, setisAlertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState('');
  const [alertSeverity, setalertSeverity] = useState('success');

  /**
   * Images
   */
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const { getData,saveData,setisLoading,updateData} = useAuth();

  const [compressedPhoto, setcompressedPhoto] = useState('');

  useEffect(() => {
    convertToBase64(compressedPhoto);
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

  useEffect(() => {
    getCategories();
  }, [])


  const getCategories = () => {
    getData('categories', setcategories,'name');
  }

  const handleSave = () => {
    try {
        saveData('categories',data);
        getCategories();
        handleModalClose();
        setalertMessage('El registro ha sido exitoso.');
        setalertSeverity('success');
       
    } catch (error) {
        setalertMessage('Upss algo salio mal.');
        setalertSeverity('error');
    }
    setisAlertOpen(true);
  }

  const handleUpdate = () => {
    updateData('categories',data,index);
    getCategories();
    handleModalClose();
}

  const handleDelete = async() =>{
    setisLoading(true)
    await deleteDoc(doc(storage,'categories',index));
    getCategories();
    setisLoading(false);
    setisDialogOpen(false);
  }


const handleInputChange = (e, fieldName) => {
  const { value } = e.target;
  if(fieldName === 'name'){
    const slug = value
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'');
        setdata(prevData => ({ ...prevData, ['slug']: slug }));
  }
  setdata(prevData => ({ ...prevData, [fieldName]: value }));
};

const handleSelectChange = (e, fieldName) => {
  setdata(prevData => ({ ...prevData, [fieldName]: e.name }));
};


const handleModalOpen = () => {
  setisModalOpen(true);
}

const handleModalClose = () => {
  setisModalOpen(false);
  setImages([]);
}

const handleRegisterClick = () => {
  handleModalOpen();
  setisUpdate(false);
  setdata([]);
  setmodalTitle("Registrar");
}

const handleUpdateClick = (item,id) => {
  handleModalOpen();
  setisUpdate(true);
  setindex(id);
  setdata(item);
  item.photo && setImages([{data_url: item.photo}]);
  setmodalTitle("Actualizar");
}


const handleOpenAlert = (id) =>{
  setindex(id);
  setisDialogOpen(true);
}

const handleDialogToggle = () => {
  setisDialogOpen(!isDialogOpen);
}



  return(
    <div> 
    <div className='products-heading'>
    <Link to='/ajustes'>
      <ItemH2>
        Ajustes
      </ItemH2>
    </Link>
      <p>Administrar Categorias</p>
    </div>

    <div className='floating-button-container'>
    <Fab className='floating-button' color="primary" aria-label="add" onClick={handleRegisterClick}>
            <PlusIcon />
          </Fab>
      </div>
    <div className='products-container'>
          
      {categories?.map((item,index) => 
          <CategoryCard 
              key={item.id} 
              item={item} 
              index={index} 
              handeModalOpen={() => handleUpdateClick(item.data,item.id)}
              handleInputChange={handleInputChange}
              handleDelete={handleOpenAlert}              
              setdata={setdata} />
        )}
    </div>

    <CategoryModal
       title={modalTitle}
       open={isModalOpen}
       onClose={handleModalClose}
       data={data}
       handleInputChange={handleInputChange}
       handleSelectChange={handleSelectChange}
       onChangeImage={onChangeImage}
       onCreateItem={handleSave}
       onUpdateItem={handleUpdate}
       setImages={setImages}
       maxNumber={maxNumber}
       images={images}
       isUpdate={isUpdate}
    />
    
    <AlertDialog 
        color={theme.danger}
        icon={<MdWarning/>}
        isOpen ={isDialogOpen} 
        action={handleDelete}
        handleClose={handleDialogToggle}
        //title={'Eliminar usuario'}
        message={'Estas a punto de eliminar la categoría. ¿Estas seguro?'}
        />

  </div>
  )
}



export default CategoryList;