import React,{useState} from 'react'
import { Navigate } from 'react-router-dom';
import RollerSpinner from './components/utils/spinner/roller';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({children}) => {
const [isLoading, setisLoading] = useState(true);
 const {currentUser} = useAuth();
    if(!currentUser){
        return <Navigate to="/login" replace/>
    }
    return(
        <>
        {children}
        </>
    )
}

export default PrivateRoute