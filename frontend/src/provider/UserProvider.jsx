import { isUserLoggedIn } from '../services/user';
import React, { createContext, useContext, useEffect, useState } from 'react'

export const CustomerContext = createContext();
const useUser= ()=>{
    return useContext(CustomerContext);
}


const UserProvider = ({children}) => {
    const [user , setUser] = useState();
    // --- this will be used to check if user is already logged in or not using cookies -------
    const checkIfUserIsLoggedIn = async ()=>{
      const [response , error] = await isUserLoggedIn();
      if(error)
      return;
      setUser(response.data);
    }
    useEffect(()=>{
      checkIfUserIsLoggedIn();
    },[]);

  return (
    <CustomerContext.Provider value={{user , setUser}}>
        {children}
    </CustomerContext.Provider>
  )
}

export default UserProvider;
export {useUser};