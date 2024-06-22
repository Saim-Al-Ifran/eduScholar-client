import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const ApplicationDetailsModal = ({ application, onClose }) => {
  console.log(application);
  return (
    <Dialog open={true} handler={onClose}>
      <DialogHeader>Application Details</DialogHeader>
      <DialogBody className="max-h-[400px] overflow-y-auto">
        <div className="flex flex-col space-y-4">
          <img src={application?.scholarship?.image} alt="" />
          <p><strong>University Name:</strong> {application?.scholarship?.universityName}</p>
          <p><strong>Scholarship Category:</strong> {application?.scholarship?.scholarshipCategory}</p>
          <p><strong>Subject Category:</strong> {application?.scholarship?.subjectCategory}</p>
          <p><strong>Applied Degree:</strong> {application?.scholarship?.degree}</p>
          <p><strong>Application Fees:</strong> {application?.scholarship?.fees} TK</p>
          <p><strong>Service Charge:</strong> {application?.scholarship?.serviceCharge} TK</p>
          <p><strong>Word-Rank:</strong> {application?.scholarship?.worldRank}</p>
          <p><strong>Applicant:</strong> {application?.personalDetails?.firstName } {application?.personalDetails?.lastName}</p>
          <p><strong>Status:</strong> {application?.status}</p>
        </div>
      </DialogBody>
      <DialogFooter>
        <button onClick={onClose} className="bg-gray-500 text-white rounded px-4 py-2">
          Close
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default ApplicationDetailsModal;
