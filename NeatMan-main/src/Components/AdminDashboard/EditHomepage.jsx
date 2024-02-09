import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ImageUpload from "../../assets/ImageUpload.png";
import Button from "../Button";
import axiosClient from "../../../axoisClient";
import Sidebar from "./Sidebar";
import { useStateContext } from "../../context/ContextProvider";


export default function EditHomepage() {
 
  
  const [loading,setLoading] = useState(false);
  const {notification,setNotification,token,setToken,setUser,user} = useStateContext();
  const [slides, setSlides] = useState([
    {
      title: "",
      subtext: "",
      imageFile: null,
      imageFileUrl: null,
    },
    {
      title: "",
      subtext: "",
      imageFile: null,
      imageFileUrl: null,
    },
  ]);

  
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
  

  const handleSlideSubmit = (index) => (event) => {
    event.preventDefault();
    setLoading(true);
    const slide = slides[index];
    const slideData = {
      [`Section${index + 1}ImageUrl`]: slide.imageFileUrl,
      [`Section${index + 1}Image`]: slide.imageFile,
      [`Subtext${index + 1}`]: slide.subtext,
      [`title${index + 1}`]: slide.title,
    };
    slideData[`Section${index + 1}Image`] = slideData[`Section${index + 1}ImageUrl`];
    console.log(`Slide ${index + 1} submitted:`, slideData);
    axiosClient.post('/homepage',slideData)
    .then(({data}) => {
      console.log(data);
      setNotification("Your homepage has been modified");
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    })
  };
  

  const handleSlideImageUpload = (index) => (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64Image = reader.result.split(',')[1]; // Get base64 image data
  
      setSlides((prevSlides) => {
        const updatedSlides = [...prevSlides];
        updatedSlides[index].imageFile = file; // Store Blob object
        updatedSlides[index].imageFileUrl = reader.result; // Store Blob object
        return updatedSlides;
      });
    };
  
    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL (base64-encoded string)
    }
  };
  
  
  

  const handleSlideTitleChange = (index) => (event) => {
    const title = event.target.value;
    setSlides((prevSlides) => {
      const updatedSlides = [...prevSlides];
      updatedSlides[index].title = title;
      return updatedSlides;
    });
  };

  const handleSlideSubtextChange = (index) => (event) => {
    const subtext = event.target.value;
    setSlides((prevSlides) => {
      const updatedSlides = [...prevSlides];
      updatedSlides[index].subtext = subtext;
      return updatedSlides;
    });
  };

  
  return (
    <div className="flex">
      <div className="sidebar bg-gray-200 w-1/4 border border-gray-300 h-[100vh]">
       <Sidebar/>
      </div>
      <div className="main-content flex-1 p-4">
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
          {!loading && slides.map((slide, index) => (
            <form key={index} onSubmit={handleSlideSubmit(index)} encType="multipart/form-data">
              <section className="in-page__cell bg-slate-200 rounded-lg shadow-lg p-4">
                <h1 className="fontBold">Slide {index + 1}</h1>
                <div className="my-4">
                  <label htmlFor={`titleInput${index}`} className="font-bold text-sm flex">
                    Title &nbsp;
                    <span className="bg-slate-400 w-5 h-5 rounded-full flex items-center justify-center text-white pb-1">
                      <span>&#161;</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id={`titleInput${index}`}
                    value={slide.title}
                    onChange={handleSlideTitleChange(index)}
                    maxLength={20}
                    className="border border-gray-300 p-2 mt-2 w-full"
                  />
                  <p className="text-sm text-slate-400">
                    Do not exceed 20 characters when entering the product title
                  </p>
                </div>
                <div className="my-4">
                  <label htmlFor={`subtextInput${index}`} className="font-bold text-sm flex">
                    Subtext &nbsp;
                    <span className="bg-slate-400 w-5 h-5 rounded-full flex items-center justify-center text-white pb-1">
                      <span>&#161;</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id={`subtextInput${index}`}
                    value={slide.subtext}
                    onChange={handleSlideSubtextChange(index)}
                    maxLength={100}
                    className="border border-gray-300 p-2 mt-2 w-full"
                  />
                  <p className="text-sm text-slate-400">
                    Do not exceed 100 characters when entering the subtext
                  </p>
                </div>
                <div className="my-4">
                  <label htmlFor={`imageUpload${index}`} className="font-bold block">
                    <div className="bg-white border border-gray-300 p-2 mt-2  text-center">
                      {!slide.imageFile && (
                        <span className="text-slate-500 font-bold text-sm">
                          Click here to browse{" "}
                          <img src={ImageUpload} className="w-32 m-auto" alt="" />
                        </span>
                      )}
                      {slide.imageFile && (
                        <img
                          src={URL.createObjectURL(slide.imageFile)}
                          className="w-32"
                          alt="Uploaded"
                        />
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id={`imageUpload${index}`}
                    accept="image/*"
                    onChange={handleSlideImageUpload(index)}
                    className="hidden"
                  />
                  <Button text={`Submit Slide ${index + 1}`} />
                </div>
              </section>
            </form>
          ))}
        </div>

        
      {
        notification && (
            <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
            {notification}
        </div>)
      }

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
    </div>
  );
}
