import React, { useState } from 'react';
import ApplicationDetails from './ApplicationDetails';
import ApplicationFeedbackModal from './ApplicationFeedbackModal';
import ApplicationEditModal from './ApplicationEditModal';
import { Button } from '@material-tailwind/react';
import {
  useGetAllApplicationQuery,
  useAddFeedBackMutation,
  useCancelApplicationMutation,
  useChangeApplicationStatusMutation,
  useDeleteApplicationMutation
} from '../../../features/manage_application/manageApplicationApi';
import { Helmet } from 'react-helmet';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AllAppliedApplication = () => {
  const { data: applications = [], isLoading, isError } = useGetAllApplicationQuery();
  const [addFeedBack] = useAddFeedBackMutation();
  const [cancelApplication] = useCancelApplicationMutation();
  const [changeApplicationStatus] = useChangeApplicationStatusMutation();
  const [deleteApplication] = useDeleteApplicationMutation();

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

 
  const handleDeleteApplication = async (id) => {
    await deleteApplication(id);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
        return 'bg-red-200 text-red-800';
      case 'pending':
        return 'bg-[#E3E3E3] text-black-700';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th><Skeleton width={100} /></th>
              <th><Skeleton width={100} /></th>
              <th><Skeleton width={100} /></th>
              <th><Skeleton width={100} /></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td><Skeleton width={100} /></td>
                <td><Skeleton width={100} /></td>
                <td><Skeleton width={100} /></td>
                <td><Skeleton width={100} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading applications.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Manage application</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-[3rem] text-center mt-5">Manage Applications</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">University Name</th>
              <th className="py-2 px-4 border-b">Scholarship Category</th>
              <th className="py-2 px-4 border-b">Application Fees</th>
              <th className="py-2 px-4 border-b">Applicant</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Details</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td className="py-2 px-4 border-b">{application?.scholarship?.universityName}</td>
                <td className="py-2 px-4 border-b">{application?.scholarship?.scholarshipCategory}</td>
                <td className="py-2 px-4 border-b">{application?.scholarship?.fees} TK</td>
                <td className="py-2 px-4 border-b">{application?.personalDetails?.firstName}</td>
                <td className={`py-2 px-4 border-b`}>
                  <a className={`py-2 px-4 ${getStatusClass(application.status)}`}>{application.status}</a>
                </td>
                <td className="py-2 px-4 border-b">
                  <Button onClick={() => openDetailsModal(application)}>
                    <i className="fa-solid fa-eye"></i>
                  </Button>
                </td>
                <td className="py-2 px-4 border-b">
                  <Button
                    onClick={() => openFeedbackModal(application)}
                    className="mr-2"
                    color='blue'
                  >
                    <i className="fa-solid fa-comment"></i>
                  </Button>
                  <Button
                    onClick={() => openEditModal(application)}
                    color='green'
                    className='mr-2'
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>
                  <Button
                    onClick={() => handleDeleteApplication(application.id)}
                    color='red'
                  >
                    <i className="fa-solid fa-trash"></i>
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
       
          />
        )}
      </div>
    </>
  );
};

export default AllAppliedApplication;
