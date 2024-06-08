import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom"; 
import ScholarshipCard from "../../../components/Home/ScholarshipCard";
const scholarshipsData = [
    {
      universityName: "Harvard University",
      universityLogo: "https://cdn-fieah.nitrocdn.com/gPcagixaUBxZFGSNjoZhotFrtQtDJGWz/assets/images/optimized/rev-22d07d8/scholarly.co/wp-content/uploads/2022/10/t.jpg",
      category: "Undergraduate",
      location: "Cambridge, MA, USA",
      deadline: "2024-08-15",
      subjectCategory: "Engineering",
      applicationFees: 50,
      rating: 4.8,
    },
    {
      universityName: "Stanford University",
      universityLogo: "https://images.shiksha.com/mediadata/images/1533535408phpRuopAS.jpeg",
      category: "Graduate",
      location: "Stanford, CA, USA",
      deadline: "2024-09-01",
      subjectCategory: "Business",
      applicationFees: 75,
      rating: 4.7,
    },
    {
      universityName: "Stanford University",
      universityLogo: "https://cdn.britannica.com/25/121725-050-8BF363EC/Hoover-Tower-Stanford-University-California.jpg",
      category: "Graduate",
      location: "Stanford, CA, USA",
      deadline: "2024-09-01",
      subjectCategory: "Business",
      applicationFees: 75,
      rating: 4.7,
    },
  
 
 
   
  ];



const TopScholarship = () => {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-center font-bold mb-[4rem] mt-[6rem]">Top Scholarships</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarshipsData.slice(0, 6).map((scholarship, index) => (
            <ScholarshipCard key={index} {...scholarship} />
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