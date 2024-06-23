import React, { useState } from 'react';
 
import EditScholarship from './EditScholarship';
import { Button } from '@material-tailwind/react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
 

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

  return (

    <>
        <Helmet>
            <title>Manage Scholarship</title>
        </Helmet>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mt-[3rem] mb-[3rem]">Manage Scholarships</h1>
          <div className="flex justify-end mb-4">
            <Link to="add_scholarship">
                <Button color="green">
                  Create New Scholarship
                </Button>
            </Link>

          </div>
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
                    <Link to="edit_scholarship">
                        <Button color='blue' className='mr-[1rem]'>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Button>
                    </Link>

                    <Button color='red'>
                      <i className="fa-solid fa-trash-arrow-up"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
 
  
        </div>
    </>


  );
};

export default AllScholarship;
