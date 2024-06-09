import { Helmet } from "react-helmet";
import ScholarshipCard from "../../components/Home/ScholarshipCard";
import { Button } from "@material-tailwind/react";


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
  // Add more scholarships here...
]

const AllScholarship = () => {
  
  return (
    <>
      <Helmet>
        <title>All Scholarship</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">All Scholarships</h1>

        <div className="flex justify-center mb-6">
          <div className="flex w-full md:w-1/2 lg:w-1/3 mb-[3rem]">
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for scholarships..."
            />
            <Button
              type="button"
              className="rounded-r-md"
              color="lightBlue"
              ripple="light"
            >
              Search
            </Button>
          </div>
        </div>

        {scholarshipsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scholarshipsData.map((scholarship, index) => (
              <ScholarshipCard key={index} {...scholarship} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-6">
            <p className="text-gray-600 text-lg">No scholarships available.</p>
          </div>
        )}
      </div>
 
    </>
  );
};

export default AllScholarship;
