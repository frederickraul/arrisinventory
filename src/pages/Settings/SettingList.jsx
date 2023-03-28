import React,{useState,useEffect} from 'react';
import { LinkCard } from '../../components';
import { settingsLinksArray } from '../../constantes/links';
import { useAuth } from '../../context/AuthContext';
import IVAModal from './IVAModal';


const SettingList = () => {
  
  const [settings, setsettings] = useState([]);
  const [iva, setiva] = useState();
  const [data, setdata] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const {getDataWhere,updateData} = useAuth();
  

  

  useEffect(() => {
    if(settings[0]){
      setiva(settings[0].data);
    }
  }, [settings]);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings= () =>{
      getDataWhere('settings',setsettings,'name','==','IVA');
  }
  

const handleInputChange = (e, fieldName) => {
  const { value } = e.target;
  setiva(prevIva => ({ ...prevIva, [fieldName]: Number(value) }));
};

const handleModalOpen = () => {
  setisModalOpen(true);
}

const handleModalClose = () => {
  setisModalOpen(false);
}

const handleUpdateClick =() => {
  handleModalOpen(); 

}
const handleSaveIVA =() => {
    updateData('settings',iva,settings[0].id);
    setisModalOpen(false);

}


   return( 
   <div>
      <div className='products-heading'>
        <h2>Ajustes</h2>
        <p>Seleccionar ajuste</p>
      </div>

      <div className='products-container'>
        {settingsLinksArray?.map((link,index) => 
          <LinkCard key={index} link={link} index={9}  handeModalOpen={handleUpdateClick} />
        )}
      </div>

      <IVAModal
       open={isModalOpen}
       onClose={handleModalClose}
       data={iva}
       handleInputChange={handleInputChange}
       handleSave={handleSaveIVA}
    />
    </div>
    )
}

export default SettingList;