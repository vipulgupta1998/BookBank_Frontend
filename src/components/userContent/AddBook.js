import React, { useState } from 'react';

export default function AddBook(props) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    coverImageUrl: '',
    condition: ''
  });

  const host = process.env.REACT_APP_PORT;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, genre, description, coverImageUrl, condition } = formData;
    if (!title || !author || !genre || !description || !coverImageUrl || !condition) {
      props.showAlert("Please fill all the fields", "danger");
      return;
    }
 
    try {
      const response = await fetch(`${host}/book/addBook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      if (json.success) {
        props.showAlert("Book added successfully", "success");
        setFormData({
          title: '',
          author: '',
          genre: '',
          description: '',
          coverImageUrl: '',
          condition: ''
        });
      } else {
        props.showAlert("Failed to add book", "danger");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      props.showAlert("An error occurred", "danger");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter the book title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter the author's name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter the book genre"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter a short description of the book"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="coverImageUrl" className="block text-sm font-medium text-gray-700">Cover Image URL</label>
          <input
            type="text"
            id="coverImageUrl"
            name="coverImageUrl"
            value={formData.coverImageUrl}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter the cover image URL"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="worn">Worn</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
