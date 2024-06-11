import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const EditScholarship = ({ scholarship, onClose }) => {
  const [formData, setFormData] = useState({ ...scholarship });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission logic
    alert('Scholarship updated successfully!');
    onClose();
  };

  return (
    <Dialog open={true} handler={onClose}>
      <DialogHeader>Edit Scholarship</DialogHeader>
      <DialogBody>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2"
            placeholder="Scholarship Name"
          />
          <input
            type="text"
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            className="border p-2"
            placeholder="University Name"
          />
          <input
            type="text"
            name="subjectCategory"
            value={formData.subjectCategory}
            onChange={handleChange}
            className="border p-2"
            placeholder="Subject Category"
          />
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="border p-2"
            placeholder="Applied Degree"
          />
          <input
            type="number"
            name="applicationFees"
            value={formData.applicationFees}
            onChange={handleChange}
            className="border p-2"
            placeholder="Application Fees"
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <button onClick={onClose} className="bg-gray-500 text-white rounded px-4 py-2 mr-2">
          Cancel
        </button>
        <button onClick={handleSubmit} className="bg-green-500 text-white rounded px-4 py-2">
          Save
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditScholarship;
