import React from 'react';
import { LinkCard } from '../components';
import { linksArray, secondaryLinksArray } from '../constantes';


const Dashboard = ({ categories, bannerData }) => (
  
    <div>
      <div className='products-heading'>
        <h2>Dashboard</h2>
        <p>Bienvenido</p>
      </div>

      <div className='products-container'>
        {linksArray?.filter(link=>link.label !== 'Inicio').map((link,index) => 
          <LinkCard key={index} link={link} index={index} 
          />
        )}

          {secondaryLinksArray?.filter(link=>link.label !== 'Logout').map((link,index) => 
          <LinkCard key={index} link={link} index={9}/>
        )}
      </div>

    </div>
);

export default Dashboard;