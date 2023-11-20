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
    axiosClient.get("category")
    .then(({data}) => {
      setExistingCategories(data.data);
    })
    .catch(e => console.log(e))
  }

  useEffect(() => getCategories(),[])

  const saveNewCategory = (e) => {
    e.preventDefault(); // Prevent the form from submitting and page refreshing
    const newCategoryObject = { category: newCategory };
    setExistingCategories([...existingCategories, newCategoryObject]);
    setNewCategory('');

    // Log the new category to the console
    console.log('New Category Added:', newCategoryObject);
    axiosClient.post("/category",newCategoryObject)
    .then((data) => {
      console.log(data);
      setNotification("Category has been added");
    })
    .catch(e => console.log(e))
  };

  const saveEditedCategory = (ev,categoryId) => {
    ev.preventDefault();
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
      setNotification(editedCategory + " has been deleted");
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
          {existingCategories.map((category) => (
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
