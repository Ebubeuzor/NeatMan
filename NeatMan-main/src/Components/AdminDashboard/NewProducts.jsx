import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Button from "../Button";
import Sidebar from "./Sidebar";
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from "../../../axoisClient";

export default function NewProducts() {
  
  const {id} = useParams();
  const [showSchedule, setShowSchedule] = useState(false);
  const {notification,setNotification,token,setToken,setUser,user} = useStateContext();
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [ugalleryImages, setUGalleryImages] = useState([]);
  const [imagesPre, setImagesPre] = useState([]);
  const [uimagesPre, setUImagesPre] = useState([]);
  const [frontImage, setFrontImage] = useState("");
  const [frontImage_Url, setFrontImage_Url] = useState(null);
  const [ufrontImage, setUFrontImage] = useState("");
  const [ufrontImage_Url, setUFrontImage_Url] = useState(null);
  const [alternateImage, setAlternateImage] = useState("");
  const [specifications, setspecifications] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [error, setError] = useState({__html: ""});

  const [formData, setFormData] = useState({
    title: "",
    details: "",
  });

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
  
  
  const getCategory = () => {
    axiosClient.get('/category')
    .then(({data}) => {
      console.log(data.data);
      setCategories(data.data)
    });
  }

  useEffect(()=>{
    getCategory()
  },[])
  

  
  if (id) {
    useEffect(() => {
      axiosClient.get(`/products/${id}`)
        .then(({ data }) => {
          setFormData(data.data);
          console.log(data);
          const imageUrls = data.data.image.map((imgObj) => imgObj.image);
          setGalleryImages(imageUrls);
        const categoryId = data.data.categories.map((catObj) => catObj.id);
        setSelectedCategory(categoryId);

      setFrontImage_Url(data.data.frontImage);
    }).catch((error) => {
      
      if (error.response && error.response.status === 422) {
        if (error.response.data.errors) {
          
          const finalError = Object.values(error.response.data.errors).reduce((accum,next) => [
            ...accum, ...next
          ], [])
          setError({__html: finalError.join("<br/>")});
            
        } else {
          const finalError = Object.values(error.response.data.message).reduce((accum,next) => [
            ...accum, ...next
          ], [])
          setError({__html: finalError.join("")});
        }
      }
      
    })
  }, []);
}

console.log(formData);
console.log(selectedCategory);


const handleCategoryChange = (event) => {
  const { value, checked } = event.target;
  
  if (checked) {
    setSelectedCategory([...selectedCategory, value]);
  } else {
    setSelectedCategory(selectedCategory.filter((category) => category !== value));
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      categories:selectedCategory,
      images:galleryImages,
      frontImage,
      frontImage_Url
    };
    console.log("Submitted data:", data);
    
    data.frontImage = data.frontImage_Url;
    
    if (galleryImages.length > 0) {
      data.images = galleryImages;
    } else {
      delete data.images;
      data.images = [];
    }
    let res;

    const data2 = {
      title: formData.title,
      details: formData.details,
      frontImage : ufrontImage,
      images: ugalleryImages,
      ufrontImage_Url
    }

    data2.frontImage = data2.ufrontImage_Url;

    if (ugalleryImages.length > 0) {
      data2.images = ugalleryImages;
    } else {
      delete data2.images;
      data2.images = [];
    }

    if (id) {
      res = axiosClient.patch(`/products/${id}`, data2);
    } else {
      res = axiosClient.post('/products', data);
    }

    res.then(({data}) => {
      if (id) {
        setNotification('Poduct was updated')
      } else {
        setNotification('Poduct has been added')
      }
    })
    .catch((error) => {
      
      if (error.response && error.response.status === 422) {
        if (error.response.data.errors) {

          const finalError = Object.values(error.response.data.errors).reduce((accum,next) => [
            ...accum, ...next
          ], [])
          setError({__html: finalError.join("<br/>")});
          
        } else {
          const finalError = Object.values(error.response.data.message).reduce((accum,next) => [
            ...accum, ...next
          ], [])
          setError({__html: finalError.join("")});
        }
      }

    })
    
    getCategory();
    setFormData({
      title: "",
      details: "",
    
      tags: "",
    });
    setCategories([]);
    setGalleryImages([]);
    setFrontImage("");
  
    setspecifications("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const handleMultipleImagesChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onload = () => {
        const imageUrl = reader.result;
  
        if (!imageUrl.startsWith('http://')) {
          imagesArray.push(imageUrl);
        }
  
        if (imagesArray.length === files.length) {
          if (!id) {
            setGalleryImages((prevImages) => [...prevImages, ...imagesArray]);
            setImagesPre((prevImages) => [...prevImages,...imagesArray])
          }else{
            setUGalleryImages((prevImages) => [...prevImages, ...imagesArray]);
            setUImagesPre((prevImages) => [...prevImages,...imagesArray])
          }
        }
  
        event.target.value = '';
      };
  
      reader.readAsDataURL(file);
    }
  };

  
  useEffect(() => {
    if (categories.includes(formData.categories)) {
      setSelectedCategory(formData.categories);
    }
  }, [categories, formData.categories]);
  

  return (
    <div className="flex">
      <div className="sidebar bg-gray-200 w-1/4 border border-gray-300 h-[100vh]">
        <Sidebar />
      </div>
      <div className="main-content flex-1 bg-white h-[100vh] p-4 ">
        <header>
          <div className="flex my-4 items-center">
            {!id && <h1 className="fontBold text-lg">Add New Products</h1>}
            {id && <h1 className="fontBold text-lg">Update Products</h1>}
          </div>
        </header>

        <div className="bg-slate-200 rounded-lg shadow-lg p-4">
          <form className="border border-gray-300 p-4" onSubmit={(ev) => handleSubmit(ev)}>
            
            {
              error.__html && (
                  <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>

                  </div>
              )
            } 

            {id && 
              <>
              <div>
                <label htmlFor="title" className="fontBold">
                  Product Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={formData.title}
                  onChange={handleChange}
                  className="border border-gray-300 w-full p-2"
                />
              </div>
              <div>
                <label htmlFor="details" className="fontBold">
                  Product Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows="4"
                  defaultValue={formData.details}
                  onChange={handleChange}
                  className="border border-gray-300 w-full p-2"
                ></textarea>
              </div>
              </>
            }

            {!id && 
              <>
              <div>
                <label htmlFor="title" className="fontBold">
                  Product Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-300 w-full p-2"
                />
              </div>
              <div>
                <label htmlFor="details" className="fontBold">
                  Product Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows="4"
                  value={formData.details}
                  onChange={handleChange}
                  className="border border-gray-300 w-full p-2"
                ></textarea>
              </div>
              </>
            }

            <Button text=" Add Product" />
          </form>
        </div>
        </div>

      <div className="sidebar bg-gray-200 w-1/4 border border-gray-300 h-[100vh] overflow-scroll">
        
        <div className="border-b border-gray-300 p-4 fontBold">
          <h2 className="border-b border-gray-300 py-4 fontBold text-2xl">
            Product Image
          </h2>
          <div>
            <label htmlFor="frontImage" className="fontBold">
              Front Image
            </label>
            {!id && <input
              type="file"
              id="frontImage"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = () =>{
                  setFrontImage(file);
                  setFrontImage_Url(reader.result)

                  event.target.value = '';
                }
                reader.readAsDataURL(file);
              }}
            />}
            {id && <input
              type="file"
              id="frontImage"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = () =>{
                  setUFrontImage(file);
                  setUFrontImage_Url(reader.result)

                  event.target.value = '';
                }
                reader.readAsDataURL(file);
              }}
            />}
          </div>

          <div className="image-preview flex my-4">
            {frontImage && (
              <img
                src={frontImage_Url}
                alt="Front Image"
                className="image h-14 mr-4 "
              />
            )}
            {formData.frontImage && (
              <img
                src={formData.frontImage}
                alt="Front Image"
                className="image h-14 mr-4 "
              />
            )}
            {ufrontImage && (
              <img
                src={ufrontImage_Url}
                alt="Front Image"
                className="image h-14 mr-4 "
              />
            )}
          </div>
        </div>

        <div className="border-b border-gray-300 p-4 fontBold">
          <h2 className="border-b border-gray-300 py-4 fontBold text-2xl">
            Product Gallery
          </h2>
          <div>
            {!id && <input
              type="file"
              multiple
              onChange={handleMultipleImagesChange}
            />}
            
            {id && <input
              type="file"
              multiple
              onChange={handleMultipleImagesChange}
            />}
          </div>
          <div className="gallery-images flex">
            {!id && galleryImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index}`}
                className="gallery-image h-16 mr-4 my-4"
              />
            ))}
            
            {id && galleryImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index}`}
                className="gallery-image h-16 mr-4 my-4"
              />
            ))}
          </div>
        </div>

        {!id && <div className="border-b border-gray-300 p-4 fontBold">
          <h2 className="border-b border-gray-300 py-4 fontBold text-2xl">
            Product Categories
          </h2>

          {categories.map((category) => (
            <div key={category.id}>
              <input
                type="checkbox"
                defaultChecked={selectedCategory.includes(category.id)}
                onChange={handleCategoryChange}
                value={category.id}
              />
              <label> 
                {`${category.name}` }
              </label>
            </div>
          ))}
        
        </div>}

      {
        notification && (
            <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
            {notification}
        </div>)
      }
      </div>
    </div>
  );
}
