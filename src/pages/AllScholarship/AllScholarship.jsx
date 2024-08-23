import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ScholarshipCard from "../../components/Home/ScholarshipCard";
import { Button } from "@material-tailwind/react";
import { useGetAllUserScholarshipsQuery } from "../../features/scholarship/scholarshipApi";
import { FadeLoader } from 'react-spinners';

const AllScholarship = () => {
  const { data: scholarshipsData = { data: [] }, isLoading } = useGetAllUserScholarshipsQuery();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader color="#4CAF50" size={50} />
      </div>
    );
  }

  const filteredScholarships = scholarshipsData.data.filter((scholarship) =>
    scholarship.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scholarship.subjectCategory.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship._id} {...scholarship} />
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
