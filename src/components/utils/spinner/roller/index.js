import React from 'react';
import '../../../../styles/rollerSpinner.css';


const RollerSpinner = () => {
  return (
    <div className='spinner-container'>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default RollerSpinner