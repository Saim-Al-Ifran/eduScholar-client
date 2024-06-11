import React, { useState } from 'react';
 
 
import ApplicationDetails from './ApplicationDetails';
import ApplicationFeedbackModal from './ApplicationFeedbackModal';
import ApplicationEditModal from './ApplicationEditModal';
import { Button } from '@material-tailwind/react';

const applicationsData = [
  {
    id: 1,
    universityName: "Harvard University",
    scholarshipName: "Harvard Scholarship",
    scholarshipCategory: "Merit-based",
    subjectCategory: "Engineering",
    degree: "Undergraduate",
    applicationFees: 50,
    serviceCharge: 20,
    status: "pending",
  },
  {
    id: 2,
    universityName: "Stanford University",
    scholarshipName: "Stanford Scholarship",
    scholarshipCategory: "Need-based",
    subjectCategory: "Business",
    degree: "Graduate",
    applicationFees: 75,
    serviceCharge: 30,
    status: "processing",
  },
  // Add more applications here...
];

const AllAppliedApplication = () => {
  const [applications, setApplications] = useState(applicationsData);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const openDetailsModal = (application) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedApplication(null);
  };

  const openFeedbackModal = (application) => {
    setSelectedApplication(application);
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    setSelectedApplication(null);
  };

  const openEditModal = (application) => {
    setSelectedApplication(application);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedApplication(null);
  };

  const handleSaveStatus = (id, status) => {
    setApplications(applications.map(app => app.id === id ? { ...app, status } : app));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-[3rem] text-center mt-5">Manage Applications</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">University Name</th>
            <th className="py-2 px-4 border-b">Scholarship Name</th>
            <th className="py-2 px-4 border-b">Application Fees</th>
            <th className="py-2 px-4 border-b">Service Charge</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Details</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{application.universityName}</td>
              <td className="py-2 px-4 border-b">{application.scholarshipName}</td>
              <td className="py-2 px-4 border-b">${application.applicationFees}</td>
              <td className="py-2 px-4 border-b">${application.serviceCharge}</td>
              <td className="py-2 px-4 border-b">{application.status}</td>
              <td className="py-2 px-4 border-b">
              <Button
                  onClick={() => openDetailsModal(application)}
                >
                   <i class="fa-solid fa-eye"></i>
                </Button>
              </td>
              <td className="py-2 px-4 border-b">

                <Button
                  onClick={() => openFeedbackModal(application)}
                  className="mr-2"
                  color='blue'
                >
                 <i class="fa-solid fa-comment"></i>
                </Button>
                <Button
                  onClick={() => openEditModal(application)}
                  color='green'
                  className='mr-2'
                >
                    <i class="fa-solid fa-pen-to-square"></i>
                </Button>
                <Button
                  onClick={() => console.log('Delete Application')}
                  color='red'
                >
                  <i class="fa-solid fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDetailsModalOpen && (
        <ApplicationDetails
          application={selectedApplication}
          onClose={closeDetailsModal}
        />
      )}

      {isFeedbackModalOpen && (
        <ApplicationFeedbackModal
          application={selectedApplication}
          onClose={closeFeedbackModal}
        />
      )}

      {isEditModalOpen && (
        <ApplicationEditModal
          application={selectedApplication}
          onClose={closeEditModal}
          onSaveStatus={handleSaveStatus}
        />
      )}
    </div>
  );
};

export default AllAppliedApplication;
