import React, { useEffect, useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import {  useDeleteReivewMutation, useGetReviewsQuery } from '../../../features/reviews/reviewsApi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isError, isLoading, data: userReviews } = useGetReviewsQuery();
  const [deleteReview, { isError: deleteErr, isSuccess: deleteSuccess }] =  useDeleteReivewMutation();

  const handleDelete = async (reviewId) => {
    await deleteReview(reviewId);
  };

  useEffect(() => {
    if (deleteSuccess) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Review has been deleted",

        timer: 4500
      });
    }

    if (deleteErr) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error deleting review",
        timer: 4500
      });
    }
  }, [deleteSuccess, deleteErr]);

  const openDialog = (review) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedReview(null);
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 overflow-hidden">
        <h1 className="text-2xl font-bold mb-4 text-center">All Reviews</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border rounded-md p-4 shadow-md">
              <Skeleton height={30} width="80%" />
              <Skeleton height={20} count={2} />
              <div className="flex items-center my-2">
                <Skeleton circle height={40} width={40} />
                <div className="ml-4">
                  <Skeleton height={20} width={60} />
                  <Skeleton height={15} width={100} />
                </div>
              </div>
              <Skeleton height={20} />
              <Skeleton height={80} count={2} />
              <Skeleton height={40} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <h1>Error loading reviews</h1>;
  }
 
  return (

    <>
    <Helmet>
        <title>All Reviews</title>
    </Helmet>
  
      <div className="container mx-auto py-8 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 text-center">All Reviews</h1>
      <div className="overflow-y-auto h-[calc(100vh-8rem)] px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userReviews?.reviews.map(review => (
            <div key={review._id} className="border rounded-md p-4 shadow-md">
              <h2 className="text-xl font-semibold">{review.universityName}</h2>
              <p className="text-gray-700">{review.subjectCategory}</p>
              <div className="flex items-center my-2">
                <img src={review.user.profilePicture} alt="Reviewer" className="w-10 h-10 rounded-full mr-2" />
                <div>
                  <p className="font-semibold">{review.user.name}</p>
                  <p className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="text-yellow-500">Rating: {review.rating}</p>
              <p className="text-gray-800 mt-2">{review.comments}</p>
              <button
                onClick={() => openDialog(review)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {isDialogOpen && selectedReview && (
        <Dialog open={isDialogOpen} handler={closeDialog}>
          <DialogHeader>Confirm Delete</DialogHeader>
          <DialogBody>
            Are you sure you want to delete this review by {selectedReview.user.name}?
          </DialogBody>
          <DialogFooter>
            <button onClick={closeDialog} className="bg-gray-500 text-white rounded px-4 py-2 mr-2">
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete(selectedReview._id);
                closeDialog();
              }}
              className="bg-red-500 text-white rounded px-4 py-2"
            >
              Delete
            </button>
          </DialogFooter>
        </Dialog>
      )}
     </div>
    </>


  );
};

export default Reviews;
