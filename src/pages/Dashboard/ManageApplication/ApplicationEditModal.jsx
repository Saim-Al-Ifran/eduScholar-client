import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const ApplicationEditModal = ({ application, onClose, onSaveStatus }) => {
  const [status, setStatus] = useState(application.status);

  const handleSave = () => {
    onSaveStatus(application.id, status);
    onClose();
  };

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
            <option value="completed">Completed</option>
          </select>
        </div>
      </DialogBody>
      <DialogFooter>
        <button onClick={onClose} className="bg-gray-500 text-white rounded px-4 py-2 mr-2">
          Cancel
        </button>
        <button onClick={handleSave} className="bg-green-500 text-white rounded px-4 py-2">
          Save
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default ApplicationEditModal;

