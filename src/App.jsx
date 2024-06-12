 import React from 'react'
import AppRouter from './routes/Routes'
import { Toaster} from "react-hot-toast";
import useIsAdmin from './hooks/useIsAdmin';
 const App = () => {
   const isAdmin = useIsAdmin();
     console.log(isAdmin);
   return (
    <>
            <Toaster />
            <AppRouter/>
    </>

   )
 }
 
 export default App