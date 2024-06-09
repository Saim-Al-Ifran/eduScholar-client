import Sidebar from "../components/Dashboard/Sidebar"
import TopNavBar from "../components/Dashboard/TopNavBar"
import AddScholarship from "../pages/Dashboard/AllScholarship/AllScholarship"

 

const Dashboard = () => {
  return (
    <>
    <div className="flex h-screen">
      <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNavBar />
          <AddScholarship/>
        </div>
    </div>
    </>
  )
}

export default Dashboard