import React from 'react'

const AllScholarship = () =>  {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">All Scholarship</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded">+ Add New</button>
        </div>
        <div className="bg-white shadow rounded p-4">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
                <th className="px-4 py-2">Author</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">PDR0012</td>
                <td className="border px-4 py-2">Lorem ipsum dolor sit amet consectetur sdfdsfsdfsdfsdfsdfsd</td>
                <td className="border px-4 py-2">Sarees</td>
                <td className="border px-4 py-2">Le Reve</td>
                <td className="border px-4 py-2">$120</td>
                <td className="border px-4 py-2">11</td>
                <td className="border px-4 py-2"><img src="https://via.placeholder.com/50" alt="product" /></td>
                <td className="border px-4 py-2">Active</td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
                <td className="border px-4 py-2">kakashi</td>
              </tr>
              {/* Add more rows here */}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default AllScholarship