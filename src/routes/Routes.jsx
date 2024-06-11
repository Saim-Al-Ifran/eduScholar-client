import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../layouts/Main';
import Home from '../pages/Home/Home';
import AllScholarship from '../pages/AllScholarship/AllScholarship';
import ScholarshipDetails from '../pages/ScholarshipDetails/ScholarshipDetails';
import Dashboard from '../layouts/Dashboard';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import ManageScholarship from '../pages/Dashboard/ManageScholarship/AllScholarship';
import ManageApplication from '../pages/Dashboard/ManageApplication/AllAppliedApplication';
import AllReviews from '../pages/Dashboard/Reviews/Reviews';
import UserManagement from '../pages/Dashboard/User/AllUser';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="all_scholarship" element={<AllScholarship />} />
          <Route path="scholarship/:id" element={<ScholarshipDetails />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="manage_scholarship" element={<ManageScholarship />} />
          <Route path="manage_application" element={<ManageApplication />} />
          <Route path="all_reviews" element={<AllReviews />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
