import React from 'react';
import { useGetStudentApplicationQuery } from '../../features/manage_application/manageApplicationApi';

const UserApplication = () => {
  const { data: applicationsData, isLoading } = useGetStudentApplicationQuery();

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    // Display spinner while data is loading
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 mt-6 text-center">My Applications</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>University Name</th>
              <th>Rank</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {applicationsData?.applications.map((application, index) => {
              return (
                <tr key={index}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={application?.scholarship.image}
                            alt="Scholarship Logo" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {application?.scholarship.universityName}
                    <br />
                    <span className="badge badge-ghost badge-sm">{application?.scholarship.location}</span>
                  </td>
                  <td>{application?.scholarship.worldRank}</td>
                  <th>
                    <button
                      className={`btn btn-xs ${
                        application?.status === 'pending'
                          ? 'btn-warning'
                          : 'btn-success'
                      }`}
                    >
                      {application?.status}
                    </button>
                  </th>
                  <td>{formatDate(application?.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserApplication;
