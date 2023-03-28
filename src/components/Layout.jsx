import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import Alert from './Layout/Alert';


const Layout = ({ children }) => {
  const location = useLocation().pathname;

  const layout1 = () =>  (
    <div className='layout'>
      <Sidebar />
      <Navbar />
      <main className='main-container'>
        {children}
      </main>
      <footer>
      <Alert/>
        <Footer />
      </footer>
    </div>
  );


  const layout2 = () =>  (
      <div className='auth-wrapper'>
        {children}
        <Alert/>
      </div>
      
  );




  if(location !== '/login'){
    return layout1();
  }else{
    return layout2();
  }

}

export default Layout