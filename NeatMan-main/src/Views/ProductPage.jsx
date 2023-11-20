import React, { useEffect, useRef, useState } from "react";
import Header from "../Components/Navigation/Header";
import Hamburger from "../Components/Navigation/Hamburger";
import RelatedProducts from "../Components/RelatedProducts";
import Footer from "../Components/Navigation/Footer";
import axiosClient from "../../axoisClient";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import Cookies from "js-cookie";

export default function ProductPage() {
  const {id} = useParams();
  const [product,setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(
    ""
  );
  const [showChooseMethodModal, setShowChooseMethodModal] = useState(false);

  const navigate = useNavigate();

  const {notification,setNotification,token,setToken,setUser,user} = useStateContext();
  const [ironOreInfo,setProductimage] = useState([]);
  
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    
    setLoading(true);
    axiosClient.get(`/products/${id}`)
      .then(({ data }) => {
        setProduct(data.data)
        console.log(data);
        setMainImage(data.data.frontImage)
        setProductimage(data.data.image)
        setLoading(false);
      })
    },[]);

    console.log(product);
    

  const tabData = {
    description: {
      label: "DESCRIPTION",
      content: (
        <p className="text-slate-500">
          {product != null ? product.details : "loading..."}
        </p>
      ),
    },
  };

  const handleInquirySubmit = (event) => {
    event.preventDefault();
    if (token != null) {
      setShowChooseMethodModal(true);
    }else{
      Cookies.set("redirectPath", `/Productpage/${id}`);
      return navigate('/login');
    }
  };

  const handleMethodSelect = (method) => {
    // Perform actions based on the selected communication method
    if (method === "whatsapp") {
      // Implement WhatsApp communication
      console.log("Sending inquiry via WhatsApp");
    } else if (method === "email") {
      setLoading(true);
      console.log(inquiryMessage);
      const data = {
        "message" : inquiryMessage
      }
      axiosClient.post("/makeInquiry",data)
      .then(() => { 
        setLoading(false)
        setShowMessage(true)
      })
      .catch((e) => console.log(e))
      
    }

    // Close the choose method modal
    setShowChooseMethodModal(false);
  };
  const [activeTab, setActiveTab] = useState("description");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [inquiryMessage, setInquiryMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Define the handleImageClick function
  const handleImageClick = (imageSrc) => {
    // Set the clicked image as the main image
    setMainImage(imageSrc);
  };

  const handleWeightChange = (event) => {
    const newWeight = parseFloat(event.target.value);
    setSelectedWeight(newWeight);
  };

  const calculatePrice = () => {
    const basePrice = 4000; // Replace with your base price

    // Check if selectedWeight is a valid number; otherwise, default to 1 kg
    const weight = isNaN(selectedWeight) ? 1 : parseFloat(selectedWeight);

    return basePrice * weight;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="md:w-[90%] md:mx-auto p-4">
        <div>
          <Header />
          <Hamburger />
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

        {!loading && <div className="product-page md:flex mx-auto p-">
          <div className="product-image md:w-3/6">
            <div className=" md:p-4">
              <div className=" p-1">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
            <div className="p-1 md:p-4">
              <div className="flex flex-wrap space-x-2 gap-2 ">
                {ironOreInfo.map((ore, index) => (
                  <img
                    key={index}
                    src={ore.image}
                    onClick={() => handleImageClick(ore.image)}
                    className="w-20 h-20 md:w-32 md:h-32 border cursor-pointer transform transition-transform hover:scale-105"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="product-shop md:my-14 md:w-2/4">
            <div>
              <div className="fixed-product">
                <div className="product-title">
                  <h1 className="text-3xl">Iron Ore</h1>
                </div>
              </div>
              <section>
              <form onSubmit={handleInquirySubmit}>
                  <div className="mt-4">
                    <label
                      htmlFor="inquiryInput"
                      className="block text-sm text-gray-600"
                    >
                      Make an Inquiry:
                    </label>
                    <textarea
                      type="text"
                      id="inquiryInput"
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full h-48 my-2 p-2"
                      required
                    />
                  </div>

                  <div className="w-full mt-4">
                    <button
                      type="submit"
                      className="bg-green-800 w-full uppercase text-white px-4 py-2"
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              </section>
              {showChooseMethodModal && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-10 relative rounded shadow-lg">
    <button
        onClick={() => setShowChooseMethodModal(false)}
        className="absolute top-2 right-2 text-gray-600 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <p className="text-lg font-semibold mb-4">
        Choose Communication Method:
      </p>
      <Link to={`https://wa.me/+2348059360753?text=${inquiryMessage}`}>
      <button
        onClick={() => handleMethodSelect("whatsapp")}
        className="bg-green-700 text-white p-2 rounded mr-2"
      >
        WhatsApp
      </button>
      </Link>
      <button
        onClick={() => handleMethodSelect("email")}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Email
      </button>
    
    </div>
  </div>
)}
              {showMessage && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50">
                  <div className="bg-white p-4 rounded shadow-lg">
                    <p>
                      Your message has been sent successfully! You can expect a response within the next 24 hours.
                    </p>
                    <button onClick={() => setShowMessage(false)} className="mt-5 bg-green-700 p-2 text-white">Close</button>
                  </div>
                </div>
              )}
              <section className="tabs mt-32">
                <div className="flex flex-wrap text-sm md:border-b-2 ">
                  {Object.keys(tabData).map((tabKey) => (
                    <button
                      key={tabKey}
                      onClick={() => handleTabClick(tabKey)}
                      className={`tab-button ${
                        activeTab === tabKey ? "active-tab bg-green-600 text-white" : ""
                      } py-2 px-4 focus:outline-none`}
                    >
                      {tabData[tabKey].label}
                    </button>
                  ))}
                </div>
                <div className="p-4">{tabData[activeTab].content}</div>
              </section>
            </div>
          </div>
        </div>}
        <div>
          <RelatedProducts />
        </div>
      </div>
      <Footer />
    </div>
  );
}
