import React, { useEffect, useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { useChangeApplicationStatusMutation } from '../../../features/manage_application/manageApplicationApi';
import {toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
const ApplicationEditModal = ({ application, onClose }) => {
  const [status, setStatus] = useState(application.status);
  const [changeApplicationStatus,{isLoading,isError,isSuccess,data}] = useChangeApplicationStatusMutation();
  const dispatch = useDispatch();
 
  useEffect(()=>{
        if(isSuccess){
            toast.success('Status changed!!')
            onClose();
        }
        if(isError){
            toast.error("something wrong!!");
            onClose();
        }
  },[isSuccess,isError,onClose])

  
  const handleSave = async() => {
     
     await dispatch(changeApplicationStatus({
       id:application._id,
       data:{ 
        status:status 
       }
    }));
    onClose();
   
  };


 

  

  console.log(data);

  return (
    <Dialog open={true} handler={onClose}>
      <DialogHeader>Edit Application Status</DialogHeader>
      <DialogBody>
        <div className="flex flex-col space-y-4">
          <label className="block text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="approved">Approve</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </DialogBody>
      <DialogFooter>
        <button onClick={onClose} className="bg-gray-500 text-white rounded px-4 py-2 mr-2">
          Cancel
        </button>
        <Button loading={isLoading} onClick={handleSave} color="green">
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
};


export default ApplicationEditModal;

