import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdWarning } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { SearchBar } from '../../components';
import ListCard from '../../components/Card/ListCard';
import AlertDialog from '../../components/utils/AlertDialog';
import { theme } from '../../constantes';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../lib/firebase';
import { ItemH2 } from '../Inventario/styles';

const List = () => {
const [lists, setlists] = useState([]);
const [filter, setfilter] = useState('');
const [index, setindex] = useState();
const [isDialogOpen, setisDialogOpen] = useState(false);
const {getData,setisLoading} = useAuth();
  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
  }, [lists]);

  const getItems = () => {
    try {
      getData('lists', setlists);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpenAlert = (id) =>{
    setindex(id);
    setisDialogOpen(true);
  }
  
  const handleDelete = async() =>{
    setisLoading(true);
    await deleteDoc(doc(storage,'lists',index));
    getItems();
    handleDialogToggle();
    setisLoading(false);
  }

  const handleDialogToggle = () => {
    setisDialogOpen(!isDialogOpen);
  }
  
  return (
    <div>
      <div className='products-heading'>
        <Link to='/listas'>
          <ItemH2>Listas</ItemH2>
        </Link>
        <p className='text-capitalize'>Administrar Listas</p>
      </div>
      <div className='floating-button-container'>
        <div></div>
      <SearchBar filter={setfilter} text={'Buscar lista'}/>
      </div>
      <div className='providers-container'>
        {lists.filter(item =>item.data.name.toLowerCase().includes(filter)).map((item) => (
          <ListCard key={item.id} item={item} handleDelete={handleOpenAlert}/>
        ))}
      </div>
      <AlertDialog 
        color={theme.danger}
        icon={<MdWarning/>}
        isOpen ={isDialogOpen} 
        action={handleDelete}
        handleClose={handleDialogToggle}
        //title={'Eliminar usuario'}
        message={'Estas a punto de eliminar la lista. ¿Estas seguro?'}
        />
    </div>
  )
}

export default List;