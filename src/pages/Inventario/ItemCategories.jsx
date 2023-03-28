import { Fab } from '@mui/material';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { MdWarning } from 'react-icons/md';

import { Category, Item, SearchBar } from '../../components'
import AlertDialog from '../../components/utils/AlertDialog';
import RollerSpinner from '../../components/utils/spinner/roller';
import { theme } from '../../constantes';
import { PlusIcon } from '../../constantes/icons';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../lib/firebase';
import { ItemH2, ItemH4 } from './styles';


const ItemCategories = () => {
  const [isLoading, setisLoading] = useState(true)
  const [categories, setcategories] = useState([]);
  const { getData, getDataWhere } = useAuth();
  const [filter, setfilter] = useState('');
  const [items, setItems] = useState([]);
  const [isSearch, setisSearch] = useState(false);

  const [index, setindex] = useState();
  const [isDialogOpen, setisDialogOpen] = useState(false);


  useEffect(() => {
    getCategories();
  }, [])


  const getCategories = () => {
    getData('categories', setcategories,'name');
    setisLoading(false);
  }

  const getItems = () => {
    getDataWhere('items', setItems, 'name', 'like', filter);
  }

  const handleFilter = (word) => {
    if (word === '') {
      setItems([]);
      setisSearch(false);
    }
    setfilter(word);
  }
  const handleSearch = () => {
    if (filter !== '') {
      setisSearch(true);
      getItems();
    } else {
      setItems([]);
    }
  }

  const handleOpenAlert = (id) =>{
    setindex(id);
    setisDialogOpen(true);
  }
  
  const handleDelete = async() =>{
    await deleteDoc(doc(storage,'items',index));
    getItems();
    handleDialogToggle();
  }
  
  const handleDialogToggle = () => {
    setisDialogOpen(!isDialogOpen);
  }
  


  return (
    <div>
      {isLoading && <RollerSpinner />}
      <div className='products-heading'>
        <h2>Inventario</h2>
        <p>Categorías</p>
      </div>
      <div className='floating-button-container'>
        <div></div>
        <SearchBar filter={handleFilter} text={'Buscar item'} action={handleSearch}/>
      </div>
      <div className='products-container'>
        {
          !isSearch &&
          categories?.map((category, index) => <Category key={category.id} category={category} index={index} />)}
      </div>


      {
        isSearch &&
        <div className='items-container'>
          {items.length < 1 &&
            <ItemH4>No se encontro ningun item con ese nombre.</ItemH4>
          }
          {items
            .map((item) => (
              <Item key={item.id} item={item} category={item.data.category} handleDelete={handleOpenAlert} />
            ))}
        </div>
      }

      <AlertDialog 
        color={theme.danger}
        icon={<MdWarning/>}
        isOpen ={isDialogOpen} 
        action={handleDelete}
        handleClose={handleDialogToggle}
        //title={'Eliminar usuario'}
        message={'Estas a punto de eliminar el item. ¿Estas seguro?'}
        />

    </div>
  )
}



export default ItemCategories;