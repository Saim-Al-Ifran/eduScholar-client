import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea } from '@material-tailwind/react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useGetScholarshipCategoriesQuery } from '../../../features/scholarship_category/scholarshipCategoryApi';
import { useGetDegreeCategoriesQuery } from '../../../features/degree_category/degreeCategoryApi';
import { useGetSubjectCategoriesQuery } from '../../../features/subject_category/subjectCategoryApi';
import { useDispatch } from 'react-redux';
import { useCreateScholarshipMutation } from '../../../features/scholarship/scholarshipApi';

const AddScholarship = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    universityName: '',
    image: null,
    scholarshipCategory: '',
    degree: '',
    location: '',
    applicationDeadline: '',
    subjectCategory: '',
    fees: '',
    stipend: 0,
    serviceCharge: '',
    worldRank: '',
    description: ''
  });

  const { data: scholarshipCategories = [] } = useGetScholarshipCategoriesQuery();
  const { data:degrees=[] } = useGetDegreeCategoriesQuery();
  const { data: subjectCategories = [] } = useGetSubjectCategoriesQuery();
  const [createScholarship, { isLoading,isError,isSuccess }] = useCreateScholarshipMutation();
  const dispatch = useDispatch();
 

  useEffect(()=>{
    
    if(isSuccess){
      toast.success('Scholarship created successfully');
      navigate('/dashboard/manage_scholarship/')
    }
     if(isError){
      toast.error('Failed to create scholarship');
     }
  },[isSuccess,isError,navigate])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

 


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('universityName', formData.universityName);
    data.append('image', formData.image);
    data.append('scholarshipCategory', formData.scholarshipCategory);
    data.append('degree', formData.degree);
    data.append('location', formData.location);
    data.append('applicationDeadline', formData.applicationDeadline);
    data.append('subjectCategory', formData.subjectCategory);
    data.append('fees', formData.fees);
    data.append('stipend', formData.stipend);
    data.append('serviceCharge', formData.serviceCharge);
    data.append('worldRank', formData.worldRank);
    data.append('description', formData.description);
    
    try {
       dispatch(createScholarship(data))
        
    } catch (err) {
       console.log(err);
    }
  
  };

  return (

    <>
      <Helmet>
           <title>Create New Scholarship</title>
      </Helmet>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mt-4 mb-4">Create New Scholarship</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="universityName" className="block text-sm font-medium text-gray-700">
              University Name
            </label>
            <Input
              type="text"
              name="universityName"
              id="universityName"
              value={formData.universityName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <Input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="scholarshipCategory" className="block text-sm font-medium text-gray-700">
              Scholarship Category
            </label>
            <select
              name="scholarshipCategory"
              id="scholarshipCategory"
              value={formData.scholarshipCategory}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>Select Category</option>
              {scholarshipCategories?.data?.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
              Degree
            </label>
            <select
              name="degree"
              id="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>Select Degree</option>
              {degrees?.data?.map(degree => (
                <option key={degree._id} value={degree._id}>{degree.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <Input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
              Application Deadline
            </label>
            <Input
              type="date"
              name="applicationDeadline"
              id="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="subjectCategory" className="block text-sm font-medium text-gray-700">
              Subject Category
            </label>
            <select
              name="subjectCategory"
              id="subjectCategory"
              value={formData.subjectCategory}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>Select Subject Category</option>
              {subjectCategories?.data?.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="fees" className="block text-sm font-medium text-gray-700">
              Fees
            </label>
            <Input
              type="number"
              name="fees"
              id="fees"
              value={formData.fees}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="stipend" className="block text-sm font-medium text-gray-700">
              Stipend
            </label>
            <Input
              type="number"
              name="stipend"
              id="stipend"
              value={formData.stipend}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="serviceCharge" className="block text-sm font-medium text-gray-700">
              Service Charge
            </label>
            <Input
              type="number"
              name="serviceCharge"
              id="serviceCharge"
              value={formData.serviceCharge}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="worldRank" className="block text-sm font-medium text-gray-700">
              World Rank
            </label>
            <Input
              type="number"
              name="worldRank"
              id="worldRank"
              value={formData.worldRank}
              onChange={handleChange}
              required
            />
          </div>
   
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button type="button" color="gray" onClick={() => navigate('/dashboard/manage_scholarship')}>
            Cancel
          </Button>
          <Button loading={isLoading} type="submit" color="green">
            Create
          </Button>
        </div>
      </form>
      </div>
    </>

  
  );
};

export default AddScholarship;
