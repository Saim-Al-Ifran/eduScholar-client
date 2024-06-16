import React, { useEffect, useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { Helmet } from 'react-helmet';
import { 
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation
} from '../../../features/Users/usersApi';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch } from 'react-redux'; 

const ManageUsers = () => {
  const { data: usersData, error, isLoading } = useGetAllUsersQuery();
  const [updateUserRole,{isError,isSuccess,isLoading:updatedRoleLoading,}] = useUpdateUserRoleMutation();
  const [deleteUser,{isSuccess:deleteSuccess}] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  

  useEffect(()=>{
       if(isSuccess){
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "User role updated successfully!",
            timer: 2500
          });
       }

       if(deleteSuccess){
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "User deleted successfully!",
            showConfirmButton: false,
            timer: 1500
          });
       }

  },[isSuccess,deleteSuccess])


  const openEditDialog = (user) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedUser(null);
    setIsEditDialogOpen(false);
  };

  const closeDeleteDialog = () => {
    setSelectedUser(null);
    setIsDeleteDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleSave = async () => {
    try {
        await updateUserRole({
           id: selectedUser._id,
           data: {
            role:selectedUser.role
           }
        });
      closeEditDialog();

    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Failed to update user role!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleDelete = async (userId) => {
   
    try {
    
      await deleteUser(userId);
      closeDeleteDialog()
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Failed to delete user!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>User management</title>
      </Helmet>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Manage Users</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">User Name</th>
                <th className="py-2 px-4 border-b">User Email</th>
                <th className="py-2 px-4 border-b">User Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b"><Skeleton height={30} /></td>
                    <td className="py-2 px-4 border-b"><Skeleton height={30} /></td>
                    <td className="py-2 px-4 border-b"><Skeleton height={30} /></td>
                    <td className="py-2 px-4 border-b"><Skeleton height={30} /></td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan="4" className="py-2 px-4 border-b text-center">Error loading users</td>
                </tr>
              ) : (
                usersData?.map(user => (
                  <tr key={user._id.$oid}>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                    <td className="py-2 px-4 border-b">
                      <Button
                        onClick={() => openEditDialog(user)}
                        className="mr-2"
                        color='green'
                      >
                        Edit
                      </Button>
                      <button
                        onClick={() => openDeleteDialog(user)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {isEditDialogOpen && selectedUser && (
          <Dialog open={isEditDialogOpen} handler={closeEditDialog}>
            <DialogHeader>Edit User</DialogHeader>
            <DialogBody>
              <div className="flex flex-col space-y-4">
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={selectedUser.name}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                    readOnly
                  />
                </label>

                <label>
                  Role:
                  <select
                    name="role"
                    value={selectedUser.role}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="student">Student</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button onClick={closeEditDialog} className="mr-2" color='gray'>
                Cancel
              </Button>
              <Button onClick={handleSave} color='green' loading={updatedRoleLoading}>
                Save
              </Button>
            </DialogFooter>
          </Dialog>
        )}

        {isDeleteDialogOpen && selectedUser && (
          <Dialog open={isDeleteDialogOpen} handler={closeDeleteDialog}>
            <DialogHeader>Confirm Delete</DialogHeader>
            <DialogBody>
              Are you sure you want to delete user {selectedUser.name}?
            </DialogBody>
            <DialogFooter>
              <button onClick={closeDeleteDialog} className="bg-gray-500 text-white rounded px-4 py-2 mr-2">
                Cancel
              </button>
              <Button
                onClick={() => {
                  handleDelete(selectedUser._id);
                  closeDeleteDialog();
                }}
                color='red'
              >
                Delete
              </Button>
            </DialogFooter>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default ManageUsers;
