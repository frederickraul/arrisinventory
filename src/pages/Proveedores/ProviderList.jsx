import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdWarning } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { ProviderCard, SearchBar } from '../../components';
import AlertDialog from '../../components/utils/AlertDialog';
import { theme } from '../../constantes';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../lib/firebase';
import { ItemH2 } from '../Inventario/styles';

const ProviderList = () => {
  const { slug } = useParams();
  const [items, setitems] = useState([]);
  const [filter, setfilter] = useState('');
  const { getData, setisLoading } = useAuth();
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [index, setindex] = useState();


  useEffect(() => {
    getItems();

  }, [slug]);

  const getItems = () => {
      getData('providers', setitems);
  }


  const handleOpenAlert = (id) => {
    setindex(id);
    setisDialogOpen(true);
  }

  const handleDelete = async () => {
    setisLoading(true);
    await deleteDoc(doc(storage, 'providers', index));
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
        <Link to='/proveedores'>
          <ItemH2>Proveedores</ItemH2>
        </Link>
        <p className='text-capitalize'>Administrar Proveedores</p>
      </div>
      <div className='floating-button-container'>
        <div></div>
        <SearchBar filter={setfilter} text={'Buscar proveedor'} />
      </div>
      <div className='providers-container'>
        {items
          .filter(item => item.data.name.toLowerCase().includes(filter))
          .map((item) => (
            <ProviderCard key={item.id} item={item} handleDelete={handleOpenAlert}
            />
          ))}
      </div>

      <AlertDialog
        color={theme.danger}
        icon={<MdWarning />}
        isOpen={isDialogOpen}
        action={handleDelete}
        handleClose={handleDialogToggle}
        //title={'Eliminar usuario'}
        message={'Estas a punto de eliminar este proveedor. ¿Estas seguro?'}
      />

    </div>
  )
}

export default ProviderList;