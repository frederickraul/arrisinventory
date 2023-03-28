import React, { useState, useEffect} from 'react';

import { ItemH2 } from './styles';
import { Item, SearchBar } from '../../components';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { storage } from '../../lib/firebase';
import AlertDialog from '../../components/utils/AlertDialog';
import { theme } from '../../constantes';
import { MdWarning } from 'react-icons/md';


const ItemList = () => {
  const { slug } = useParams();
  const [items, setitems] = useState([]);
  const [filter, setfilter] = useState('');
  const [categories, setcategories] = useState([]);
  const [categoriesName, setcategoriesName] = useState([]);

  const [index, setindex] = useState();
  const [isDialogOpen, setisDialogOpen] = useState(false);

  const {getData,getDataWhere,getDataWhereArray} = useAuth();

  const capitalizeWord = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    getCategories();

  }, []);

  useEffect(() => {
      let array = [];
      categories.forEach(element => {
        if(element.data.name !== 'Otros'){
          array.push(element.data.name);         
        }
      });
      setcategoriesName(array);       
  }, [categories]);

  useEffect(() => {
    getItems();

  }, [categoriesName]);

  


  const getCategories = () => {
    getData('categories', setcategories);
  }

  const getItems =() =>{
    try {
      if(slug === 'otros'){
        getDataWhereArray('items',setitems,'category','not-in',categoriesName);

      }else{
        getDataWhere('items',setitems,'category','==',capitalizeWord(slug));
      }
    } catch (error) {
      console.log(error);
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
      <div className='products-heading'>
        <Link to='/inventario'>
          <ItemH2>Inventario</ItemH2>
        </Link>
        <p className='text-capitalize'>{slug}</p>
      </div>
      <div className='floating-button-container'>
        <div></div>
      <SearchBar filter={setfilter} text={'Buscar item'}/>
      </div>
      <div className='items-container'>
        {items
        .filter(item =>item.data.name.toLowerCase().includes(filter))
        .map((item) => (
          <Item key={item.id} item={item} category={slug} handleDelete={handleOpenAlert}
          />
        ))}
      </div>

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
  );
}

export default ItemList;