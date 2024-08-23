import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom"; 
import ScholarshipCard from "../../../components/Home/ScholarshipCard";
import { useGetAllUserScholarshipsQuery } from "../../../features/scholarship/scholarshipApi";
 

const TopScholarship = () => {
  const {data : scholarshipsData =[]} = useGetAllUserScholarshipsQuery();

 
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-center font-bold mb-[4rem] mt-[6rem]">Top Scholarships</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarshipsData?.data?.slice(0, 6).map((scholarship, index) => (

            <ScholarshipCard key={index}  {...scholarship}/>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/all_scholarship">
              <Button
              variant="gradient"
              size="lg"
              color="black"
              >
              See All Scholarships
            </Button>
          </Link>

        </div>
      </div>
    );
  };

  export default TopScholarship;