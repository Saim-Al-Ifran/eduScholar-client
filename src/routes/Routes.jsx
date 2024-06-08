
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../layouts/Main';
import Home from '../pages/Home/Home';
import AllScholarship from '../pages/AllScholarship/AllScholarship';

const AppRouter = () => {
  return (
    <Router>
 
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home/>} />
        <Route path="/all_scholarship" element={<AllScholarship/>} />
      </Route>

      {/* <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
 
      <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
    
  </Router>
  )
}

export default AppRouter