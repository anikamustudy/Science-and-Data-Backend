import React, { useEffect, useState } from 'react';
import ApiService from '../services/api';
import { useNavigate } from 'react-router-dom';

import DataTable from 'react-data-table-component';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await ApiService.get('/scientific-data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data', error);
      if (error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleVisibilityToggle = async (id, visibility) => {
    try {
      const token = localStorage.getItem('token');
      console.info('ID  & Visibility', id, visibility);
      await ApiService.put(
        `/scientific-data/${id}/visibility`,
        { visibility },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchData();
    } catch (error) {
      console.error('Error updating visibility', error);
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'File Type',
      selector: row => row.file_path,
      sortable: true,
    },
    {
      name: 'Visibility',
      cell: row => (
        <button
          className={`p-2 rounded ${row.visibility === 'public' ? 'bg-green-500' : 'bg-gray-500'}`}
          onClick={() =>
            handleVisibilityToggle(
              row.id,
              row.visibility === 'public' ? 'private' : 'public',
            )
          }
        >
          {row.visibility}
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex space-x-2">
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => handleDownload(row.file_path)}
          >
            Download
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];
  const handleDelete = async id => {
    try {
      const token = localStorage.getItem('token');
      await ApiService.delete(`/scientific-data/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  const handleDownload = fileUrl => {
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <DataTable columns={columns} data={data} pagination responsive />
    </div>
  );
};

export default Dashboard;
