import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const ApplicationDetailsModal = ({ application, onClose }) => {
  return (
    <Dialog open={true} handler={onClose}>
      <DialogHeader>Application Details</DialogHeader>
      <DialogBody>
        <div className="flex flex-col space-y-4">
          <p><strong>University Name:</strong> {application.universityName}</p>
          <p><strong>Scholarship Name:</strong> {application.scholarshipName}</p>
          <p><strong>Scholarship Category:</strong> {application.scholarshipCategory}</p>
          <p><strong>Subject Category:</strong> {application.subjectCategory}</p>
          <p><strong>Applied Degree:</strong> {application.degree}</p>
          <p><strong>Application Fees:</strong> ${application.applicationFees}</p>
          <p><strong>Service Charge:</strong> ${application.serviceCharge}</p>
          <p><strong>Status:</strong> {application.status}</p>
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
