import { Fab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserCard from '../../../components/Card/UserCard';
import RollerSpinner from '../../../components/utils/spinner/roller';
import { PlusIcon } from '../../../constantes/icons';
import { users } from '../../../constantes/test/users';
import UserModalWindow from './UserModal';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { ItemH2 } from '../../Inventario/styles';
import { storage } from '../../../lib/firebase';
import { useAuth } from '../../../context/AuthContext';
import CustomSnackBar from '../../../components/utils/CustomAlert';
import { async } from '@firebase/util';
import AlertDialog from '../../../components/utils/AlertDialog';
import { theme } from '../../../constantes';
import { MdWarning } from 'react-icons/md';
import UserCardNew from '../../../components/Card/UserCardNew/index';
import { UsersContainer } from '../../../components/Card/UserCardNew/styles';
import { SearchBar } from '../../../components';
import Compressor from 'compressorjs';
import Validate from './Validate';



const UserList = () => {
  const [isUpdate, setisUpdate] = useState(false);
  const [data, setdata] = useState([]);
  const [filter, setfilter] = useState('');
  const [modalTitle, setmodalTitle] = useState('Registrar')
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [users, setusers] = useState([]);
  const [formErrors, setformErrors] = useState([]);
  const [index, setindex] = useState();
  const { getData,saveData,updateData,currentUser } = useAuth();

  /**
   * Images
   */
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




  useEffect(() => {
    getUsers();
  }, [])


  const getUsers = () => {
    getData('users', setusers);
  }

  const handleSave = () => {
    let error = 0;
    error = Validate({setformErrors, data});
    if(error>0){ 
      return;
    }

        saveData('users',data);
        getUsers();
        handleModalClose();
  }

  const handleUpdate = () => {
        
        updateData('users',data,index);
        getUsers();
        handleModalClose();
  }

  const handleOpenAlert = (id) =>{
    setindex(id);
    setisDialogOpen(true);
  }

  const handleDelete = async() =>{
    await deleteDoc(doc(storage,'users',index));
    getUsers();
    handleDialogToggle();
  }
  
  const handleDialogToggle = () => {
    setisDialogOpen(!isDialogOpen);
  }
  
  const getDATA =async (id) =>{
    const res = await getDoc(doc(storage,'users',id));
    console.log(res.data());

  }

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setdata(prevData => ({ ...prevData, [fieldName]: value }));
  };

  const handleSelectChange = (e, fieldName) => {
    setdata(prevData => ({ ...prevData, [fieldName]: e.value }));
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
    if(item.rol ==='god' && currentUser.rol !== 'god'){
      console.log('No eres programador');
      return;
    } 
    handleModalOpen();
    setisUpdate(true);
    setindex(id);
    setdata(item);
    item.photo && setImages([{data_url: item.photo}]);
    setmodalTitle("Actualizar");
  }



  return (
    <div>
      <div className='products-heading'>
        <Link to='/ajustes'>
          <ItemH2>
            Ajustes
          </ItemH2>
        </Link>
        <p>Administrar Usuarios</p>
      </div>

      <div className='floating-button-container'>
        {currentUser.rol === 'god' ?
        <Fab className='floating-button' color="primary" aria-label="add" onClick={handleRegisterClick}>
          <PlusIcon />
        </Fab>
        :
        <div></div>
        }
      <SearchBar filter={setfilter} text={'Buscar nombre'}/>
      </div>
      <UsersContainer>
        {users?.filter(item =>item.data.name.toLowerCase().includes(filter)).map((item, index) =>
          <UserCardNew
            key={item.id}
            item={item}
            index={index}
            handeModalOpen={() => handleUpdateClick(item.data,item.id)}
            handleInputChange={handleInputChange}
            handleDelete={handleOpenAlert}
            setdata={setdata}
            userId={currentUser.uid}
            userType={currentUser.rol}
            />
        )}
      </UsersContainer>

      <UserModalWindow
        title={modalTitle}
        open={isModalOpen}
        onClose={handleModalClose}
        index={index}
        data={data}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        onChangeImage={onChangeImage}
        onCreateItem={handleSave}
        onUpdateItem={handleUpdate}
        setImages={setImages}
        maxNumber={maxNumber}
        images={images}
        userId={currentUser.uid}
        userType={currentUser.rol}
        isUpdate={isUpdate}
      />

      <AlertDialog 
        color={theme.danger}
        icon={<MdWarning/>}
        isOpen ={isDialogOpen} 
        action={handleDelete}
        handleClose={handleDialogToggle}
        //title={'Eliminar usuario'}
        message={'Estas a punto de eliminar el usuario. ¿Estas seguro?'}
        />

    </div>
  )
}

export default UserList;