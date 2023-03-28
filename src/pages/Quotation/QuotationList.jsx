import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { client } from '../../lib/client';
import RollerSpinner from '../../components/utils/spinner/roller';
import { ItemH2 } from '../Inventario/styles';
import { QuotationCard, SearchBar } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { storage } from '../../lib/firebase';
import { theme } from '../../constantes';
import { MdWarning } from 'react-icons/md';
import AlertDialog from '../../components/utils/AlertDialog';


const QuotationList = () => {
const [quotations, setquotations] = useState([]);
const [filter, setfilter] = useState('');
const [isDialogOpen, setisDialogOpen] = useState(false);
const [index, setindex] = useState();
const {getData,setisLoading} = useAuth();

  useEffect(() => {
    getItems();
  }, []);


  const getItems = () => {
    try {
      getData('quotations', setquotations);
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
    await deleteDoc(doc(storage,'quotations',index));
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
        <Link to='/cotizacion'>
          <ItemH2>Cotización</ItemH2>
        </Link>
        <p className='text-capitalize'>Administrar cotización</p>
      </div>
      <div className='floating-button-container'>
        <div></div>
      <SearchBar filter={setfilter} text={'Buscar cotización'}/>
      </div>
      <div className='products-container'>
        {quotations
        .filter(item =>item.data.noOrden.toLowerCase().includes(filter))
        .map((item) => (
          <QuotationCard key={item.id} item={item} noOrden={item.noOrden}  handleDelete={handleOpenAlert}/>
        ))}
      </div>
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
  );
}

export default QuotationList;