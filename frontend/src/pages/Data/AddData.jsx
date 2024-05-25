import React, { useState } from 'react';

import AppService from '../../services/api';
import { useNavigate } from 'react-router-dom';

const DataForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    visibility: 'public',
    file: null,
  });

  const [filePreview, setFilePreview] = useState(null);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const file = files[0];
      setFormData({ ...formData, file });

      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = e => {
          setFilePreview(e.target.result);
        };
        fileReader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDescriptionChange = ({ text }) => {
    setFormData({ ...formData, description: text });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('visibility', formData.visibility);
    if (formData.file) {
      data.append('file', formData.file);
    }

    try {
      const token = localStorage.getItem('token');
      console.warn('Token', token);
      await AppService.post('/scientific-data', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Data added successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('There was an error adding the data!', error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="visibility"
          >
            Visibility
          </label>
          <select
            id="visibility"
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="file">
            File (Image, PDF, Excel)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg,.jpeg,.png,.pdf,.xlsx"
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {filePreview && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              File Preview
            </label>
            {formData.file && formData.file.type.startsWith('image/') ? (
              <img
                src={filePreview}
                alt="File Preview"
                className="w-full h-auto"
              />
            ) : (
              <a
                href={filePreview}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formData.file.name}
              </a>
            )}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Data
        </button>
      </form>
    </div>
  );
};

export default DataForm;
