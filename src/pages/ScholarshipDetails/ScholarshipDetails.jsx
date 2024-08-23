import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Button,
  Dialog
} from '@material-tailwind/react';
import { useGetUserSingleScholarshipQuery } from '../../features/scholarship/scholarshipApi';
import { GridLoader } from 'react-spinners';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: scholarship = {}, isLoading } = useGetUserSingleScholarshipQuery(id);
 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#4CAF50" size={20} />
      </div>
    );
  }

  if (!scholarship || !scholarship._id) {
    return <div>Scholarship not found</div>;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Helmet>
        <title>{scholarship.universityName} Scholarship Details</title>
      </Helmet>
      <div className={`container mx-auto p-6 flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden transition ease-in-out duration-300 ${isModalOpen ? 'blur-sm' : ''}`}>
        <div className="md:w-1/2 p-4 flex items-center justify-center bg-gray-100">
          <img className="rounded-lg shadow-md" src={scholarship.image} alt={scholarship.universityName} />
        </div>
        <div className="md:w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-4">{scholarship.universityName}</h1>
          <p className="text-gray-600 mb-2"><strong>Category:</strong> {scholarship.scholarshipCategory.name}</p>
          <p className="text-gray-600 mb-2"><strong>Location:</strong> {scholarship.location}</p>
          <p className="text-gray-600 mb-2"><strong>Deadline:</strong> {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
          <p className="text-gray-600 mb-2"><strong>Subject:</strong> {scholarship.subjectCategory.name}</p>
          <p className="text-gray-600 mb-4"><strong>Description:</strong> {scholarship.description}</p>
          {scholarship.stipend && <p className="text-gray-600 mb-2"><strong>Stipend:</strong> {scholarship.stipend}</p>}
          <p className="text-gray-600 mb-2"><strong>Post Date:</strong> {new Date(scholarship.createdAt).toLocaleDateString()}</p>
          <p className="text-gray-600 mb-2"><strong>Service Charge:</strong> ${scholarship.serviceCharge}</p>
          <p className="text-gray-600 mb-4"><strong>Application Fees:</strong> ${scholarship.fees}</p>
          <Button onClick={openModal} className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 transition ease-in-out duration-300">
            Apply Scholarship
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} handler={setIsModalOpen}>
          <Elements stripe={stripePromise}>
               <CheckoutForm scholarship={scholarship} closeModal={closeModal} />
          </Elements>
          
      </Dialog>
    </>
  );
};

export default ScholarshipDetails;
