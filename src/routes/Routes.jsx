
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../layouts/Main';

const AppRouter = () => {
  return (
    <Router>
 
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<h1>Home</h1>} />
        {/* <Route path="room/:id" element={<PrivateRoute><RoomDetails /></PrivateRoute>} /> */}
      </Route>

      {/* <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />

      <Route path="dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route index element={<PrivateRoute><Statistics /></PrivateRoute>} />
        <Route path="add-room" element={<PrivateRoute><HostRoute><AddRoom /></HostRoute></PrivateRoute>} />
        <Route path="my-listings" element={<PrivateRoute><HostRoute><MyListings /></HostRoute></PrivateRoute>} />
        <Route path="manage-users" element={<PrivateRoute><AdminRoute><ManageUsers /></AdminRoute></PrivateRoute>} />
        <Route path="my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
        <Route path="manage-bookings" element={<PrivateRoute><HostRoute><ManageBookings /></HostRoute></PrivateRoute>} />
        <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Route>
      <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
    
  </Router>
  )
}

export default AppRouter