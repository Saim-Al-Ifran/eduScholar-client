import React, { useState } from 'react';
 
import EditScholarship from './EditScholarship';
import { Button } from '@material-tailwind/react';

const scholarshipsData = [
  {
    name: "Harvard Scholarship",
    universityName: "Harvard University",
    subjectCategory: "Engineering",
    degree: "Undergraduate",
    applicationFees: 50,
  },
  {
    name: "Stanford Scholarship",
    universityName: "Stanford University",
    subjectCategory: "Business",
    degree: "Graduate",
    applicationFees: 75,
  },
  // Add more scholarships here...
];

const AllScholarship = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const openModal = (scholarship) => {
    setSelectedScholarship(scholarship);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedScholarship(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold  text-center mt-[3rem] mb-[3rem]">Manage Scholarships</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Scholarship Name</th>
            <th className="py-2 px-4 border-b">University Name</th>
            <th className="py-2 px-4 border-b">Subject Category</th>
            <th className="py-2 px-4 border-b">Applied Degree</th>
            <th className="py-2 px-4 border-b">Application Fees</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scholarshipsData.map((scholarship, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{scholarship.name}</td>
              <td className="py-2 px-4 border-b">{scholarship.universityName}</td>
              <td className="py-2 px-4 border-b">{scholarship.subjectCategory}</td>
              <td className="py-2 px-4 border-b">{scholarship.degree}</td>
              <td className="py-2 px-4 border-b">${scholarship.applicationFees}</td>
              <td className="py-2 px-4 border-b">
                <Button color='blue' className='mr-[1rem]' onClick={() => openModal(scholarship)}  >
                <i class="fa-solid fa-pen-to-square"></i>
                </Button>

                <Button  color='red'>
                <i class="fa-solid fa-trash-arrow-up"></i>
              
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <EditScholarship 
          scholarship={selectedScholarship}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default AllScholarship;
