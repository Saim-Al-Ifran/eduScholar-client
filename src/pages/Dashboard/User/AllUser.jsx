import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

const usersData = [
  {
    "_id": { "$oid": "665dcfc2189eef2c64141a0a" },
    "name": "Akash Hossain",
    "email": "akash.hossain@example.com",
    "password": "$2b$10$na6NQHGU3rPrm4Io.Ghhhu3Ke4QlXrFmucOhPXlLIkIN9IfHnvnqG",
    "role": "moderator",
    "profilePicture": "http://example.com/profile.jpg",
    "createdAt": { "$date": "2024-06-03T14:14:26.873Z" },
    "__v": 0
  },
  {
    "_id": { "$oid": "665dcfc2189eef2c64141a0b" },
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "$2b$10$na6NQHGU3rPrm4Io.Ghhhu3Ke4QlXrFmucOhPXlLIkIN9IfHnvnqH",
    "role": "user",
    "profilePicture": "http://example.com/profile2.jpg",
    "createdAt": { "$date": "2024-05-20T10:10:10.873Z" },
    "__v": 0
  }
  // Add more users as needed
];

const ManageUsers = () => {
  const [users, setUsers] = useState(usersData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id.$oid !== userId));
    alert('User deleted successfully!');
  };
 
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

  const handleSave = () => {
    setUsers(users.map(user => user._id.$oid === selectedUser._id.$oid ? selectedUser : user));
    closeEditDialog();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  return (
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
            {users.map(user => (
              <tr key={user._id.$oid}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                   {user.role}
                </td>
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
            ))}
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
                  <option value="user">User</option>
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
            <Button onClick={handleSave} color='green'>
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
                handleDelete(selectedUser._id.$oid);
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
  );
};

export default ManageUsers;

