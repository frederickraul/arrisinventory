import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { addDoc, collection, getDocs, deleteDoc, query, orderBy, where, doc, setDoc, getDoc, startAt, endAt } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../lib/firebase';

const AuthContext = createContext();


export const StateContext = ({ children }) => {
    const navigate = useNavigate();
    const [currentUser, setcurrentUser] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [isAlertOpen, setisAlertOpen] = useState(false);
    const [alertMessage, setalertMessage] = useState('');
    const [alertSeverity, setalertSeverity] = useState('info');
    
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signout = () => {
        signOut(auth);
        console.log(currentUser);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const deleteUser = (user) => {
        deleteUser(user).then(() => {
            // User deleted.
          }).catch((error) => {
            // An error ocurred
            // ...
          });
    }

    const handleCloseAlert = () =>{
        setisAlertOpen(false);
    } 

    const getData = async (collectionName, setdata,order) => {
        let collRef;
        setisLoading(true);
        order ?
         collRef = query(collection(storage, collectionName), orderBy(order))
        :
         collRef = query(collection(storage, collectionName));
        await getDocs(collRef)
            .then(response => {
                const DATA = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                setdata(DATA);
                setisLoading(false);

            })
            .catch(error => {
                console.log(error);
                setisLoading(false);

            })
    }

    const getCurrentUserInfo = async (id) => {
        setisLoading(true);
        const DOC = await getDoc(doc(storage,'users',id));
        const userInfo = DOC.data();
        setisLoading(false);
        return userInfo;
    }


    const getDataById = async (collectionName, setdata,id) => {
        setisLoading(true);
        await getDoc(doc(storage,collectionName,id))
            .then(response => {
                setdata(response.data());
                setisLoading(false);
            })
            .catch(error => {
                console.log(error);
                setisLoading(false);

            })
    }

    const getDataWhere = async (collectionName, setdata, filter,condition, val,order) => {
        let collRef;
        setisLoading(true);
        condition === 'like' ? 
            collRef = query(collection(storage, collectionName), orderBy('nameLowercase'), startAt(val),endAt(val + '\uf8ff'))
            
        :
            order ? 
                collRef = query(collection(storage, collectionName), orderBy(order), where(filter, condition, val))
                :
                collRef = query(collection(storage, collectionName), where(filter, condition, val));



        await getDocs(collRef)
            .then(response => {
                const DATA = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                setisLoading(false);
                setdata(DATA);

            })
            .catch(error => {
                setisLoading(false);
                console.log(error);
            })
    }

    const getDataWhereArray = async (collectionName, setdata, filter, condition, val) => {
        if(val.length < 1){
           return;
        }
        setisLoading(true);
        const collRef = query(collection(storage, collectionName), where(filter, condition, val),);
        await getDocs(collRef)
            .then(response => {
                const DATA = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                setisLoading(false);
                setdata(DATA);

            })
            .catch(error => {
                setisLoading(false);
                console.log(error);
            })
    }

    const saveData = async (collectionName, data,to) => {
        setisLoading(true);
        const collRef = collection(storage, collectionName);
        await addDoc(collRef, data).then(response => {
            setalertMessage('El registro ha sido exitoso.');
            setalertSeverity('success');
            setisAlertOpen(true);
            setisLoading(false);
            to && navigate(to);

            return response;
        }).catch(error => {
            console.log(error);
            setalertMessage('Upss algo salio mal.');
            setalertSeverity('error');
            setisAlertOpen(true);
            setisLoading(false);
            return error;
        });
    }

    const updateData = async (collectionName, data,id) => {
        console.log(id);
        if(!id){return}
        setisLoading(true);
        const collRef = doc(storage, collectionName, id);
        await setDoc(collRef, data).then(response => {
            setalertMessage('El registro ha sido actualizado.');
            setalertSeverity('success');
            setisAlertOpen(true);
            setisLoading(false);
            return response;
        }).catch(error => {
            console.log(error);
            setalertMessage('Upss algo salio mal.');
            setalertSeverity('error');
            setisAlertOpen(true);
            setisLoading(false);
            return error;
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user){
                getCurrentUserInfo(user.uid).then((userInfo) =>{
                    if(userInfo){
                        const userDATA = {
                            uid: user.uid,
                            email: user.email,
                            photo: userInfo.photo,
                            name: userInfo.name,
                            gender: userInfo.gender,
                            rol: userInfo.rol
                        }
                        setcurrentUser(userDATA);
                    }else{
                        const newUser ={
                            email: user.email,
                            name: user.email
                        }
                        const userDATA = {
                            uid: user.uid,
                            email: user.email,
                            email: user.email,
                            name: user.email,
                            rol: ''
                        }
                        updateData('users',newUser,user.uid,)
                        setcurrentUser(userDATA);
                    }
                });

            }else{
                setcurrentUser(user);
            }

            
        });
        
           
    }, [])



    return (
        <AuthContext.Provider
            value={{
                signup,
                login,
                signout,
                deleteUser,
                currentUser,
                isAlertOpen,
                alertMessage,
                alertSeverity,
                isLoading,
                setisLoading,
                setisAlertOpen,
                setalertMessage,
                setalertSeverity,
                handleCloseAlert,
                getData,
                getDataById,
                getDataWhere,
                getDataWhereArray,
                saveData,
                updateData,
            }}>
            {children}

        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);