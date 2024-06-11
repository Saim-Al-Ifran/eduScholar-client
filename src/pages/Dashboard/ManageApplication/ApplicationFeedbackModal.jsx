import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const ApplicationFeedbackModal = ({ application, onClose }) => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = () => {
    // Handle feedback submission logic
    alert('Feedback submitted successfully!');
    onClose();
  };

  return (
    <Dialog open={true} handler={onClose}>
      <DialogHeader>Application Feedback</DialogHeader>
      <DialogBody>
        <div className="flex flex-col space-y-4">
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            className="border p-2"
            placeholder="Enter your feedback"
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <button onClick={onClose} className="bg-gray-500 text-white rounded px-4 py-2 mr-2">
          Cancel
        </button>
        <button onClick={handleSubmitFeedback} className="bg-green-500 text-white rounded px-4 py-2">
          Submit
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default ApplicationFeedbackModal;
