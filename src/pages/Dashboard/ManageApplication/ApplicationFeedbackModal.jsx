import React, { useEffect, useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { useAddFeedBackMutation } from '../../../features/manage_application/manageApplicationApi';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const ApplicationFeedbackModal = ({ application,  onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [addFeedBack, { isSuccess, isError, isLoading }] = useAddFeedBackMutation();
  const dispatch = useDispatch();

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
        Swal.fire({
        icon: 'success',
        title: 'Feedback Submitted',
        text: 'Your feedback has been submitted successfully!',
      }) 
      onClose();
    }

    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting your feedback. Please try again later.',
      });
      onClose();
    }
  }, [isSuccess, isError, onClose]);

  const handleSubmitFeedback = async () => {
    try {
      await dispatch(
        addFeedBack({
          id: application._id,
          data: {
             feedback:feedback
             }
        })
      );
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
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
        <Button onClick={onClose} disabled={isLoading} className="mr-2">
          Cancel
        </Button>
        <Button onClick={handleSubmitFeedback} color="green" loading={isLoading}>
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ApplicationFeedbackModal;
