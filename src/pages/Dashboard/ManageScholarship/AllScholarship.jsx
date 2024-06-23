import React, { useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import { useGetAllScholarshipQuery, useDeleteScholarshipMutation } from '../../../features/scholarship/scholarshipApi';
import { useDispatch } from 'react-redux';

const AllScholarship = () => {
  const { data: scholarshipsData = [], error, isLoading } = useGetAllScholarshipQuery();
  const [deleteScholarship, { isError, isSuccess, data }] = useDeleteScholarshipMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Scholarship deleted successfully');
    }

    if (isError) {
      toast.error('Failed to delete scholarship');
      console.log(data);
    }
  }, [isSuccess, isError]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        dispatch(deleteScholarship(id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (error) {
    return <div>Error fetching scholarships</div>;
  }

  return (
    <>
      <Helmet>
        <title>Manage Scholarship</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mt-[3rem] mb-[3rem]">Manage Scholarships</h1>
        <div className="flex justify-end mb-4">
          <Link to="add_scholarship">
            <Button color="green">Create New Scholarship</Button>
          </Link>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">image</th>
              <th className="py-2 px-4 border-b">Scholarship Name</th>
              <th className="py-2 px-4 border-b">University Name</th>
              <th className="py-2 px-4 border-b">Subject Category</th>
              <th className="py-2 px-4 border-b">Applied Degree</th>
              <th className="py-2 px-4 border-b">Application Fees</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              scholarshipsData?.data?.map((scholarship) => (
                <tr key={scholarship._id}>
                  <td className="py-2 px-4 border-b"><img src={scholarship.image} width={"200px"}/></td>
                  <td className="py-2 px-4 border-b">{scholarship.scholarshipCategory?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{scholarship.universityName}</td>
                  <td className="py-2 px-4 border-b">{scholarship.subjectCategory?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{scholarship.degree?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{scholarship.fees} TK</td>
                  <td className="py-2 px-4 border-b">
                    <Link to={`edit_scholarship/${scholarship._id}`}>
                      <Button color="blue" className="mr-[1rem]">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                    </Link>
                    <Button color="red" onClick={() => handleDelete(scholarship._id)}>
                      <i className="fa-solid fa-trash-arrow-up"></i>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllScholarship;
