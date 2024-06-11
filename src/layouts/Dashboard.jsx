import { Outlet } from "react-router-dom"
import Sidebar from "../components/Dashboard/Sidebar"
import TopNavBar from "../components/Dashboard/TopNavBar"
import AddScholarship from "../pages/Dashboard/AllScholarship/AllScholarship"

 

const Dashboard = () => {
  console.log(<Outlet/>);
  return (
    <>
    <div className="flex h-screen">
      <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNavBar />
           <Outlet/>
        </div>
    </div>
    </>
  )
}

export default Dashboard