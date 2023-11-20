import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "../Button";
import axiosClient from "../../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";
import Sidebar from "./Sidebar";

export default function MenuEditor() {
  const {notification,setNotification,token,setToken,setUser,user} = useStateContext();
  const [activeDropdown1, setActiveDropdown1] = useState(false);
  const [activeDropdown2, setActiveDropdown2] = useState(false);
  const [showDeleteModal1, setShowDeleteModal1] = useState(false);
  const [showDeleteModal2, setShowDeleteModal2] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newMenuTitle, setNewMenuTitle] = useState("");
  const [id, setId] = useState("");
  const [newMenuSubtitle, setNewMenuSubtitle] = useState("");
  const [newMenuItems, setNewMenuItems] = useState([]);
  const [editValues, setEditValues] = useState({});
  const [newMenuItem, setNewMenuItem] = useState({ text: "", link: "" });
  const [editContent, setEditContent] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editedMenuData, setEditedMenuData] = useState(editContent);
const [loadingEditValues, setLoadingEditValues] = useState(true);

  
  
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

  const logOut = (ev) => {
    ev.preventDefault();
    
    axiosClient.get('/logout')
    .then((res) =>{
      setUser({});
      setToken(null);
      location.reload();
    });
  }


  const toggleDropdown1 = () => {
    setActiveDropdown1(!activeDropdown1);
    setActiveDropdown2(false);
  };

  const toggleDropdown2 = () => {
    setActiveDropdown2(!activeDropdown2);
    setActiveDropdown1(false);
  };

  const openDeleteModal1 = () => {
    setShowDeleteModal1(true);
  };

  const closeDeleteModal1 = () => {
    setShowDeleteModal1(false);
  };

  const openDeleteModal2 = (id) => {
    setShowDeleteModal2(true);

    axiosClient.delete(`/menu/${id}`)
    .then(({data}) => {
      setNotification("Menu has been sucessfully deleted")
      saveNewMenu()
    }).catch((e) => console.log(e))
  };

  const closeDeleteModal2 = () => {
    setShowDeleteModal2(false);
  };

  const deleteCard1 = () => {
    // Implement delete logic for card 1
    setShowDeleteModal1(false);
  };

  const deleteCard2 = () => {
    // Implement delete logic for card 2
    setShowDeleteModal2(false);
  };

  const getMenu = () => {
    axiosClient.get('/menu')
      .then(({ data }) => {
        console.log(data);
  
        const transformedData = data.data.map(menuItem => ({
          id: menuItem.id,
          title: menuItem.Title,
          subtitles: menuItem.Categories.map(category => ({
            text: category.categories,
            items: [
              {
                text: category.subMenu,
                link: null // You might need to handle this part based on your actual data
              }
            ]
          }))
        }));
  
        console.log("Transformed Data:", transformedData);
        setEditContent(transformedData);
      })
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    getMenu()
  }, []);
  
  
  

  const [showEditModal1, setShowEditModal1] = useState(false);
  const [editContent1, setEditContent1] = useState({
    title: "New in",
    subtitle: "Frontpage",
    items: ["Tops", "Bottoms", "Accessories"],
  });

  const [showEditModal2, setShowEditModal2] = useState(false);
  const [editContent2, setEditContent2] = useState({
    title: "Gift",
    subtitle: "Frontpage",
    items: ["Tops", "Bottoms", "Accessories"],
  });
  
  const editMenu = (id) => {
    try {
      setLoadingEditValues(true);
  
      axiosClient.get(`/menu/${id}`)
        .then(({ data }) => {
          setEditValues(data);  // Set editValues to the data object, not JSON.stringify(data)
          console.log("Saved values " + JSON.stringify(data));
          setTimeout(() => {
            setLoadingEditValues(false);
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
          setLoadingEditValues(false);
        });
    } catch (error) {
      console.error(error);
      setLoadingEditValues(false);
    }
  };
  
  
  
  const openEditModal1 = (id) => {
    setShowEditModal1(true);
    editMenu(id);
    setId(id);
  }

  const closeEditModal1 = () => {
    setShowEditModal1(false);
  };

  const openEditModal2 = () => {
    setShowEditModal2(true);
  };

  const closeEditModal2 = () => {
    setShowEditModal2(false);
  };

  const saveEditedContent1 = () => {
    setShowEditModal1(false);

    const data = {
      editValues: editValues
    }
    axiosClient.put(`/menu/${id}`,editValues)
    .then(({data}) => {
      setNotification("Data has been sucessfully updated")
    }).catch((e) => console.log(e))
  };

  const saveEditedContent2 = () => {
    setShowEditModal2(false);
  };

  const openCreateModal = () => {
    console.log("Open create modal clicked");
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    // Resets the input fields for next use
    setNewMenuTitle("");
    setNewMenuSubtitle("");
    setNewMenuItems([]);
    setNewMenuItem({ text: "", link: "" });
  };

  const saveNewMenu = () => {
    // Creates a newMenuData object to hold the form data
    const newMenuData = {
      title: newMenuTitle,
      subtitles: newMenuSubtitles.map((subtitle) => ({
        text: subtitle.text,
        items: subtitle.items.map((item) => ({
          text: item.text,
          link: item.link,
        })),
      })),
    };

    // Log the form data to the console
    console.log("New Menu Data:", newMenuData);

    axiosClient.post('/menu',newMenuData)
    .then(({data}) => {
      setNotification("Menu has been Created")
      getMenu()
    })
    .catch((er) => console.error(er))

 
    closeCreateModal();
  };

  // Add these state variables
  const [newMenuSubtitles, setNewMenuSubtitles] = useState([
    {
      text: "",
      items: [{ text: "", link: "" }],
    },
  ]);

  // Update the addNewItem function
  const addNewItem = (subtitleIndex) => {
    setNewMenuSubtitles((prevSubtitles) => {
      const newSubtitles = [...prevSubtitles];
      newSubtitles[subtitleIndex].items.push({ text: "", link: "" });
      return newSubtitles;
    });
  };

  // Update the addNewSubtitle function
  const addNewSubtitle = () => {
    setNewMenuSubtitles((prevSubtitles) => [
      ...prevSubtitles,
      { text: "", items: [{ text: "", link: "" }] },
    ]);
  };

  // Update the updateSubtitle function
  const updateSubtitle = (subtitleIndex, newText) => {
    setNewMenuSubtitles((prevSubtitles) => {
      const newSubtitles = [...prevSubtitles];
      newSubtitles[subtitleIndex].text = newText;
      return newSubtitles;
    });
  };

  // Update the updateItem function
  const updateItem = (subtitleIndex, itemIndex, newValue, field) => {
    setNewMenuSubtitles((prevSubtitles) => {
      const newSubtitles = [...prevSubtitles];
      newSubtitles[subtitleIndex].items[itemIndex][field] = newValue;
      return newSubtitles;
    });
  };

  const removeItem = (subtitleIndex, itemIndex) => {
    setNewMenuSubtitles((prevSubtitles) => {
      const newSubtitles = [...prevSubtitles];
      newSubtitles[subtitleIndex].items.splice(itemIndex, 1);
      return newSubtitles;
    });
  };
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  console.log("Edit Content:", editContent);
  
  console.log("editValues:", editValues);



  const groupSubtitlesByItems = (subtitles) => {
    const subtitleGroups = {};
    
    subtitles.forEach((subtitle) => {
      const itemText = subtitle.items[0].text;
      if (!subtitleGroups[itemText]) {
        subtitleGroups[itemText] = [];
      }
      subtitleGroups[itemText].push(subtitle);
    });
    
    return subtitleGroups;
  };


  const handleCategoryChange = (subMenu, categoryId, newValue) => {
    setEditValues((prevValues) => {
      const updatedCategories = prevValues.data.Categories.map((category) => {
        if (category.subMenu === subMenu && category.id === categoryId) {
          return { ...category, categories: newValue };
        }
        return category;
      });
  
      return {
        ...prevValues,
        data: {
          ...prevValues.data,
          Categories: updatedCategories,
        },
      };
    });
  };
  
  
  return (
    <div className="flex">
      <div className="sidebar bg-gray-200 w-1/4 border border-gray-300 h-[100vh]">
        <Sidebar/>
      </div>
      <div className="main-content flex-1 bg-white h-[100vh] overflow-scroll p-4">
        <header>
          <div className="flex my-4 items-center">
            <h1 className="font-bold text-lg fontBold">Edit Menu </h1> &nbsp;
            <span className="bg-slate-400 w-5 h-5 rounded-full flex items-center justify-center text-white">
              <span>&#63;</span>
            </span>
          </div>
          <p className="text-sm text-slate-400">
            You've reached the editing dashboard homepage, where you can modify
            and personalize your dashboard experience
          </p>
            {
              notification && (
                <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
                  {notification}
                </div>)
            }
        </header>
        <div className="main-content flex-1 p-4">
          <div onClick={openCreateModal}>
            <Button text="Create new Menu" />
          </div>

          <div className="menu-structure">
          {editContent.map((menu, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md my-4">
          <div
            className="flex justify-between items-center"
            onClick={() => toggleDropdown(index)}
          >
            <span className="text-xl font-semibold">{menu.title}</span>
            <span className="text-xl font-semibold">Frontpage</span>
            <div className="flex">
            <span onClick={() => openDeleteModal2(menu.id)} className="mr-4">
                    <Button text="Delete" />
                  </span>
                  <span onClick={() => openEditModal1(menu.id)}>
                    <Button text="Edit" />
                  </span>
              <span className="text-4xl ml-4 cursor-pointer">&#8964;</span>
            </div>
          </div>
          {activeDropdown === index && (
            <div className="mt-2">
              {menu.subtitles.length > 0 ? (
                menu.subtitles.map((subtitle, subtitleIndex) => (
                  <div key={subtitleIndex} className="bg-white p-4 rounded-lg shadow-md my-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold">{subtitle.text}'s </span>
                    </div>
                    <ul>
                      {subtitle.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm">{item.text}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>Loading menu content...</p>
              )}
            </div>
          )}
        </div>
      ))}
            {/* <div className="bg-white p-4 rounded-lg shadow-md my-4">
              <div
                className="flex justify-between items-center"
                onClick={toggleDropdown2}
              >
                <span className="text-xl font-semibold">Gift</span>
                <span className="text-xl font-semibold">Frontpage</span>
                <div className="flex ">
                  <span onClick={openDeleteModal2} className="mr-4">
                    <Button text="Delete" />
                  </span>
                  <span onClick={openEditModal1}>
                    <Button text="Edit" />
                  </span>
                  <span className="text-4xl ml-4 cursor-pointer">&#8964;</span>
                </div>
              </div>
              {activeDropdown2 && (
                <div className="mt-2">
                  <ul className="my-4">
                    <h1> Men's New Arrivals</h1>
                    <li>Tops</li>
                    <li>Bottoms</li>
                    <li>Accessories</li>
                  </ul>
                  <ul>
                    <h1> Women's New Arrivals</h1>
                    <li>Tops</li>
                    <li>Bottoms</li>
                    <li>Accessories</li>
                  </ul>
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className="sidebar bg-gray-200 w-1/4 border border-gray-300 h-[100vh] overflow-scroll">
        <div>
          <div className="border-b border-gray-300 p-4 fontBold">
            <h2 className=" py-4 fontBold text-2xl">Order Actions</h2>
            <p></p>
          </div>
          <button className="bg-black text-white  m-4 p-2 ">
            Move to Trash
          </button>
        </div>
      </div> */}
    
      {showDeleteModal2 && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-slate-400 p-4 rounded-lg shadow-md">
            <p className="mb-4">Are you sure you want to delete this card?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 mr-2"
                onClick={deleteCard2}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2"
                onClick={closeDeleteModal2}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      

      {showEditModal1 && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay">
            <form
            id="formData"
              className="bg-white p-4 rounded-lg shadow-md overflow-scroll h-[70vh] w-[70vh]"
              onSubmit={saveEditedContent1}
            >
        <h2 className="text-lg font-semibold mb-4">Edit Cards Content</h2>
        {loadingEditValues ? (
          <p>Loading edit values...</p>
        ) : (
          editValues.data?.Categories && editValues.data.Categories.length > 0 ? (
            <div>
              {editValues.data.Categories.reduce((acc, category) => {
                const existingSubmenu = acc.find(
                  (item) => item.subMenu === category.subMenu
                );
                if (existingSubmenu) {
                  existingSubmenu.categories.push(category);
                } else {
                  acc.push({
                    subMenu: category.subMenu,
                    categories: [category],
                  });
                }
                return acc;
              }, []).map((submenu) => (
                <div
                  key={submenu.subMenu}
                  className="bg-white p-4 rounded-lg shadow-md my-4"
                >
                  <div
                    className="flex justify-between items-center"
                    onClick={() => toggleDropdown(submenu.subMenu)}
                  >
                    <span className="text-xl font-semibold">
                      {submenu.subMenu}
                    </span>
                  </div>
                  {activeDropdown === submenu.subMenu && (
                    <div className="mt-2">
                      <ul>
                                            {submenu.categories.map((category) => (
                        <div key={category.id}>
                          <input
                            className="border my-4"
                            type="text"
                            value={category.categories}
                            onChange={(e) =>
                              handleCategoryChange(submenu.subMenu, category.id, e.target.value)
                            }
                          />
                        </div>
                      ))} 
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No categories available.</p>
          )
        )}
        <div className="flex justify-end mt-4">
          <button
          form="formData"
            type="submit"
            className="bg-green-500 text-white px-4 py-2 mr-2"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2"
            onClick={closeEditModal1}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}













      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay w-[800px] h-[50vh] overflow-scroll">
            <form className="bg-slate-400 p-4 rounded-lg shadow-md">
              {/* ... */}

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Title:
                </label>
                <input
                  type="text"
                  className="border rounded w-full p-2"
                  value={newMenuTitle}
                  onChange={(e) => setNewMenuTitle(e.target.value)}
                />
              </div>

              {/* Add More Subtitles and Items */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Subtitles and Items:
                </label>
                {newMenuSubtitles.map((subtitle, subtitleIndex) => (
                  <div key={subtitleIndex} className="mb-2">
                    <input
                      type="text"
                      className="border rounded w-full p-2"
                      value={subtitle.text}
                      onChange={(e) =>
                        updateSubtitle(subtitleIndex, e.target.value)
                      }
                      placeholder={`Subtitle ${subtitleIndex + 1}`}
                    />
                    {subtitle.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="mb-2 flex mt-4">
                        <input
                          type="text"
                          className="border rounded w-full p-2"
                          value={item.text}
                          onChange={(e) =>
                            updateItem(
                              subtitleIndex,
                              itemIndex,
                              e.target.value,
                              "text"
                            )
                          }
                          placeholder={`Item ${itemIndex + 1}`}
                        />
                        <button
                          type="button"
                          className="bg-red-500 text-white px-2 py-1 ml-2"
                          onClick={() => removeItem(subtitleIndex, itemIndex)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="bg-green-500 text-white px-4 py-2 mt-2"
                      onClick={() => addNewItem(subtitleIndex)}
                    >
                      Add Item
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 mt-2"
                  onClick={addNewSubtitle}
                >
                  Add Subtitle
                </button>
              </div>
              {/* ... */}
              <div className="flex justify-end">
                <span onClick={saveNewMenu} className="mr-4">
                  <Button text="Create Menu" />
                </span>

                <span onClick={closeCreateModal}>
                  <Button text="Cancel" />
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
