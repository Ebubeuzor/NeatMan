import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../../axoisClient";
import Hamburger from "../Components/Navigation/Hamburger";
export default function Forgot() {
  
  const [error, setError] = useState({__html: ""});
  const navigate = useNavigate();
  const emailRef = useRef();
  const submitForm = (ev) => {
    ev.preventDefault();
    const data = {
      email : emailRef.current.value
    }
    console.log(data);
    axiosClient.post("/password/reset",data)
    .then(({data}) => {
      console.log(data);
      navigate('/Verify');
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
  }

  return (
    <div className="flex flex-col h-screen">
      <Hamburger color="black" />
      <div className="flex flex-col items-center justify-center flex-grow mt-14">
        <h2 className="text-2xl font-bold mb-4 fontBold">Forgot Password</h2>
        <form 
          onSubmit={submitForm}
          className="w-64" 
          method="post">
            {
              error.__html && (
                  <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>

                  </div>
              )
            } 
          <label htmlFor="email" className="mb-2 block fontBold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="border border-gray-300 rounded px-2 py-1 mb-4 w-full"
          />

        

          <div className="flex flex-col justify-between">
            <button
              type="submit"
              className="bg-black hover:bg-black-700 text-white rounded px-4 py-2 uppercase"
            >
              Send Verification 
            </button>

         
            {/* <Link
              to="/"
              className="text-black hover:text-blue-700 block fontBold"
            >
              Forgot Password?
            </Link> */}
            <p className="text-sm  mt-4 fontBold">
              Don't have an account?
              <Link
                to="/signup"
                className="text-blue-700 hover:text-blue-900 fontBold"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
