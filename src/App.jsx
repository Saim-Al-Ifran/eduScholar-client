 import React from 'react'
import AppRouter from './routes/Routes'
import { Toaster} from "react-hot-toast";
import useAuthCheck from './hooks/useAuthCheck';
  
 
 const App = () => {
   
   const authChecked = useAuthCheck();

   if (!authChecked) {
     return <div>Loading...</div>; 
   }
 
   return (
    <>
            <Toaster />
            <AppRouter/>
    </>

   )
 }
 
 export default App