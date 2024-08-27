import React,{ createContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ( { children } ) => {
    
    const [userData, setUserData] = useState({});

    useEffect(()=>{

        const token = localStorage.getItem('token');

        if(token){
            const decodedToken = jwtDecode(token);
            setUserData(decodedToken);
        }

    },[]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            { children }
        </UserContext.Provider>
    )
}

