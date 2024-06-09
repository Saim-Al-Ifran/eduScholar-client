import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
} from '@material-tailwind/react';

const scholarshipsData = [
  {
    id: 1,
    universityName: "Harvard University",
    universityLogo: "https://cdn-fieah.nitrocdn.com/gPcagixaUBxZFGSNjoZhotFrtQtDJGWz/assets/images/optimized/rev-22d07d8/scholarly.co/wp-content/uploads/2022/10/t.jpg",
    category: "Undergraduate",
    location: "Cambridge, MA, USA",
    deadline: "2024-08-15",
    subjectCategory: "Engineering",
    description: "A comprehensive scholarship for undergraduate studies in engineering at Harvard.",
    stipend: "5000 USD per year",
    postDate: "2023-05-01",
    serviceCharge: 100,
    applicationFees: 50,
  },
  // Add more scholarships here...
];

const ScholarshipDetails = () => {
  const { id } = useParams();
  const scholarship = scholarshipsData.find((sch) => sch.id === parseInt(id));
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!scholarship) {
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
          <img className="rounded-lg shadow-md" src={scholarship.universityLogo} alt={scholarship.universityName} />
        </div>
        <div className="md:w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-4">{scholarship.universityName}</h1>
          <p className="text-gray-600 mb-2"><strong>Category:</strong> {scholarship.category}</p>
          <p className="text-gray-600 mb-2"><strong>Location:</strong> {scholarship.location}</p>
          <p className="text-gray-600 mb-2"><strong>Deadline:</strong> {scholarship.deadline}</p>
          <p className="text-gray-600 mb-2"><strong>Subject:</strong> {scholarship.subjectCategory}</p>
          <p className="text-gray-600 mb-4"><strong>Description:</strong> {scholarship.description}</p>
          {scholarship.stipend && <p className="text-gray-600 mb-2"><strong>Stipend:</strong> {scholarship.stipend}</p>}
          <p className="text-gray-600 mb-2"><strong>Post Date:</strong> {scholarship.postDate}</p>
          <p className="text-gray-600 mb-2"><strong>Service Charge:</strong> ${scholarship.serviceCharge}</p>
          <p className="text-gray-600 mb-4"><strong>Application Fees:</strong> ${scholarship.applicationFees}</p>
          <Button onClick={openModal} className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 transition ease-in-out duration-300">
            Apply Scholarship
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} handler={setIsModalOpen}>
        <DialogHeader>Payment Details</DialogHeader>
        <DialogBody divider>
          <p className="mb-4">Please complete the payment to apply for the scholarship.</p>
          <form>
            <div className="mb-4">
              <Input label="Card Number" />
            </div>
            <div className="mb-4">
              <Input label="Expiration Date" />
            </div>
            <div className="mb-4">
              <Input label="CVV" />
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={closeModal} className="mr-1">
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={closeModal}>
            Pay
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ScholarshipDetails;
