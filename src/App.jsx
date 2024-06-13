 import React from 'react'
import AppRouter from './routes/Routes'
import { Toaster} from "react-hot-toast";
import useUserRoles from './hooks/useIsAdmin';
 
 
 const App = () => {
     const {isAdmin} = useUserRoles();
     console.log(isAdmin);
   return (
    <>
            <Toaster />
            <AppRouter/>
    </>

   )
 }
 
 export default App