import React, { useEffect, useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const reviews = [
  {
    "_id": {
      "$oid": "665e8b97873895ced5101cb3"
    },
    "userEmail": "akash.hossain@example.com",
    "universityName": "Example University",
    "subjectCategory": "Computer Science",
    "reviewerImage": "https://randomuser.me/api/portraits/men/1.jpg",
    "reviewerName": "Akash Hossain",
    "reviewDate": "2024-06-03T00:00:00.000Z",
    "rating": 3,
    "comments": "Good scholarship but the application process was a bit lengthy."
  },
  {
    "_id": {
      "$oid": "665e8b97873895ced5101cb4"
    },
    "userEmail": "john.doe@example.com",
    "universityName": "University of Learning",
    "subjectCategory": "Business Administration",
    "reviewerImage": "https://randomuser.me/api/portraits/men/2.jpg",
    "reviewerName": "John Doe",
    "reviewDate": "2024-05-20T00:00:00.000Z",
    "rating": 5,
    "comments": "Excellent scholarship program with a straightforward application process."
  },
  {
    "_id": {
      "$oid": "665e8b97873895ced5101cb5"
    },
    "userEmail": "jane.smith@example.com",
    "universityName": "Tech University",
    "subjectCategory": "Engineering",
    "reviewerImage": "https://randomuser.me/api/portraits/women/1.jpg",
    "reviewerName": "Jane Smith",
    "reviewDate": "2024-06-01T00:00:00.000Z",
    "rating": 4,
    "comments": "Great scholarship, but it required a lot of documentation."
  },
  {
    "_id": {
      "$oid": "665e8b97873895ced5101cb6"
    },
    "userEmail": "emma.jones@example.com",
    "universityName": "Science Academy",
    "subjectCategory": "Biology",
    "reviewerImage": "https://randomuser.me/api/portraits/women/2.jpg",
    "reviewerName": "Emma Jones",
    "reviewDate": "2024-04-15T00:00:00.000Z",
    "rating": 2,
    "comments": "The scholarship was decent, but the support from the university was lacking."
  },
  {
    "_id": {
      "$oid": "665e8b97873895ced5101cb7"
    },
    "userEmail": "michael.brown@example.com",
    "universityName": "Arts College",
    "subjectCategory": "Fine Arts",
    "reviewerImage": "https://randomuser.me/api/portraits/men/3.jpg",
    "reviewerName": "Michael Brown",
    "reviewDate": "2024-03-10T00:00:00.000Z",
    "rating": 5,
    "comments": "Amazing scholarship, very helpful for my studies."
  }
]

const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = (reviewId) => {
    // Delete review logic
  };

  const openDialog = (review) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedReview(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 text-center">All Reviews</h1>
      <div className="overflow-y-auto h-[calc(100vh-8rem)] px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map(review => (
            <div key={review._id.$oid} className="border rounded-md p-4 shadow-md">
              <h2 className="text-xl font-semibold">{review.universityName}</h2>
              <p className="text-gray-700">{review.subjectCategory}</p>
              <div className="flex items-center my-2">
                <img src={review.reviewerImage} alt="Reviewer" className="w-10 h-10 rounded-full mr-2" />
                <div>
                  <p className="font-semibold">{review.reviewerName}</p>
                  <p className="text-gray-500 text-sm">{new Date(review.reviewDate).toLocaleDateString()}</p>
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
            Are you sure you want to delete this review by {selectedReview.reviewerName}?
          </DialogBody>
          <DialogFooter>
            <button onClick={closeDialog} className="bg-gray-500 text-white rounded px-4 py-2 mr-2">
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete(selectedReview._id.$oid);
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
  );
};

export default Reviews;
