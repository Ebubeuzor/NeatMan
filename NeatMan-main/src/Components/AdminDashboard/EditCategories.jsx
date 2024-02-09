import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Sidebar from './Sidebar';
import axiosClient from '../../../axoisClient';
import { useStateContext } from '../../context/ContextProvider';
import { Navigate } from 'react-router-dom';

export default function EditCategories() {
  const [newCategory, setNewCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [existingCategories, setExistingCategories] = useState([]);


  const [loading,setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedCategories, setEditedCategories] = useState({});
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const {notification,setNotification,token,setToken,setUser,user} = useStateContext();

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const [makeChange, setMakeChange] = useState(true);

  const handleEditedCategoryChange = (value) => {
    setMakeChange(false);
    setEditedCategory(value);
  };

  
  if(!token){
    return <Navigate to="/Login"/>
  }
  
  const userData = () => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }

  useEffect(() => {
    userData()
  }, []);
  
  
  if (user.admin == null) {
    return <Navigate to="/"/>
  }
  

  const getCategories = () => {
    setLoading(true);
    axiosClient.get("category")
    .then(({data}) => {
      setExistingCategories(data.data);
      setLoading(false);
    })
    .catch(e => console.log(e))
  }

  useEffect(() => getCategories(),[])

  const saveNewCategory = (e) => {
    e.preventDefault();
    setLoading(true);
    const newCategoryObject = { category: newCategory };
    
    // Log the new category to the console
    console.log('New Category Added:', newCategoryObject);
    
    axiosClient.post("/category", newCategoryObject)
    .then((data) => {
      console.log(data);
      setNotification("Category has been added");
      setExistingCategories([...existingCategories, data.data]); // Update state with the newly added category
      setNewCategory(data.data.name); // Update the input field with the new category name
      setLoading(false);
      })
      .catch(e => console.log(e));
  };
  

  const saveEditedCategory = (ev,categoryId) => {
    ev.preventDefault();
    setLoading(true);
    const data = {
      "category" : editedCategory
    };
    
    axiosClient.patch(`category/${categoryId}`,data)
    .then((data) => {
      console.log(data);
      setNotification(editedCategory + " has been edited");
      getCategories();
    })
    .catch(e => console.log(e))
    setMakeChange(true)
  };

  const openDeleteConfirmation = (categoryId) => {
    setCategoryToDelete(categoryId);
    setShowDeleteModal(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  const deleteCategory = (id) => {
    console.log(id);
    
    axiosClient.delete(`category/${id}`)
    .then(() => {
      setNotification("Category has been deleted");
      getCategories();
    })
    .catch(e => console.log(e))
  };

  return (
    <div className="flex">
      <div className="sidebar bg-gray-200 w-1/4 border border-gray-300 h-[100vh]">
        <Sidebar />
      </div>
      <div className="main-content flex-1 bg-white h-[100vh] overflow-scroll p-4">
        <section className="in-page__cell bg-slate-200 rounded-lg shadow-lg p-4">
          <h1>Edit Categories</h1>
          <div className="mb-4">
            <form onSubmit={saveNewCategory}>
              <label className="block text-gray-700 font-semibold">New Category:</label>
              <input
                type="text"
                className="border rounded w-full p-2"
                value={newCategory}
                onChange={handleNewCategoryChange}
                required
              />
              <div>
                <Button text="Save New Category" type="submit" />
              </div>
            </form>
          </div>
          {
            loading && (
              <div className="flex justify-center items-center mt-10 mb-10">
                <svg
                  className="animate-spin -ml-1 mr-3 h-10 w-10 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16v3a5 5 0 010 10v3a8 8 0 000 16 4 4 0 110-8 4 4 0 004-4v-3a5 5 0 010-10v-3z"
                  ></path>
                </svg>
                <span>Loading...</span>
              </div>
            )
          }

          {!loading && existingCategories.map((category) => (
            <div key={category.id}>
              <form onSubmit={(ev) => saveEditedCategory(ev,category.id)}>
                <input
                  type="text"
                  className="border rounded w-full p-2"
                  defaultValue={category.name}
                  onChange={(e) => handleEditedCategoryChange( e.target.value)}
                />
                <button 
                  disabled={makeChange}
                  className=" text-white border-2 bg-green-700 px-4 py-2 mt-4 block">
                  Edit
                </button>
              </form>

              <button 
                  onClick={() => deleteCategory(category.id)}
                  className=" text-white border-2 bg-green-700 px-4 py-2 mt-4 block">
                  Delete
                </button>
            </div>
          ))}
        </section>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay">
            <div className="bg-slate-400 p-4 rounded-lg shadow-md">
              <p className="mb-4">Are you sure you want to delete this category?</p>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 mr-2"
                  onClick={deleteCategory}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2"
                  onClick={closeDeleteConfirmation}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {
        notification && (
            <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
            {notification}
        </div>)
      }
    </div>
  );
}
