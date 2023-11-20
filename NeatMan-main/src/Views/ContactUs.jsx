
import React, { useRef, useState } from 'react';
import Hamburger from '../Components/Navigation/Hamburger';
import Header from '../Components/Navigation/Header';
import Footer from '../Components/Navigation/Footer';
import axiosClient from '../../axoisClient';
import { useStateContext } from '../context/ContextProvider';

const ContactUs = () => {
  
  const [loading,setLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  
  const {notification,setNotification} = useStateContext();

  const [error, setError] = useState({__html: ""});
  const onSubmit = (ev) => {
    ev.preventDefault();
    const data = {
      name : nameRef.current.value,
      email : emailRef.current.value,
      message : messageRef.current.value
    };
    
    setLoading(true);
    axiosClient.post("contactUs",data)
    .then(() => {
      setLoading(false);
      setNotification("Message has been delivered")
    }).catch((error) => {
      setLoading(false);
      if (error.response && error.response.status === 422) {
        if (error.response.data.errors) {
          const finalError = Object.values(error.response.data.errors).reduce((accum, next) => [
            ...accum, ...next
          ], []);
          setError({ __html: finalError.join("<br/>") });
        } else {
          const finalError = Object.values(error.response.data.message).reduce((accum, next) => [
            ...accum, ...next
          ], []);
          setError({ __html: finalError.join("") });
        }
      }
    });
  }

  return (
    <div>
      <div className="md:w-[90%] md:mx-auto p-4">
        <div>
          <Hamburger />
          <Header />
        </div>
        <div className="my-16">
        <p className="text-lg mb-4">
          Have a question, comment, or suggestion? We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
        </p>

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

        {!loading && <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6">
          {
            error.__html && (
                <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>

                </div>
            )
          }
          <div>
            <label htmlFor="name" className="text-sm">Your Name</label>
            <input ref={nameRef} type="text" id="name" name="name" className="w-full p-2 border rounded mt-2" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm">Your Email</label>
            <input ref={emailRef} type="email" id="email" name="email" className="w-full p-2 border rounded mt-2" />
          </div>
          <div>
            <label htmlFor="message" className="text-sm">Your Message</label>
            <textarea ref={messageRef} id="message" name="message" rows="4" className="w-full p-2 border rounded mt-2"></textarea>
          </div>
          <button type="submit" className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 mt-4">
            Submit
          </button>
        </form>}

          {
            notification && (
                <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
                {notification}
            </div>)
          }
      
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
