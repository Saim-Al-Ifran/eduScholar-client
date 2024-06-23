import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import TopNavBar from '../components/Dashboard/TopNavBar';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64"> {/* Adjusted margin-left */}
        <TopNavBar />
        <div className="overflow-auto p-4 flex-1"> {/* Ensure content area can scroll */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
