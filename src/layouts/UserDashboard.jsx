import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import TopNavBar from '../components/Dashboard/TopNavBar';

const UserDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">  
        <TopNavBar />
        <div className="overflow-auto p-4 flex-1">  
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
