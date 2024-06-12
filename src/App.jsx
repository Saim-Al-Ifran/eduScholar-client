 import React from 'react'
import AppRouter from './routes/Routes'
import { Toaster} from "react-hot-toast";
 
import useUserRoles from './hooks/useUserRoles';
 const App = () => {
 
   return ( 
    <>
            <Toaster />
            <AppRouter/>
    </>

   )
 }
 
 export default App