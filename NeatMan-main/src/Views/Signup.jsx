import React, { useRef, useState } from "react";
import Header from "../Components/Navigation/Header";
import Hamburger from "../Components/Navigation/Hamburger";
import { Link } from "react-router-dom";
import rightArrow from "../assets/line-angle-right-icon.svg";
import axiosClient from "../../axoisClient";
import { useStateContext } from "../context/ContextProvider";

import { Navigate, useNavigate } from "react-router-dom";

export default function Signup() {
  const {setUser,setToken,token} = useStateContext();
  const [loginUrl, setLoginUrl] = useState(null);
  const [loading,setLoading] = useState(false);

  if(token){
    return <Navigate to={"/"}/>
  }

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const dobRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState({__html: ""});

  const onSubmit = (ev) => {
    ev.preventDefault();

    setLoading(true);
    const payload = {
      first_name: firstnameRef.current.value,
      last_name: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    axiosClient.post('/signup',payload)
    .then(({data}) => {
      
      setLoading(false);
      setUser(data.user)
      setToken(data.token)
      location.reload();
    })
    .catch((error) => {
      setLoading(false);
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
    <div>
      <div className="bg-gray-100 min-h-screen">
        <div className="md:w-[90%] md:mx-auto p-4">
          <div className="clearfix py-9 bg-slate-200 my-2 p-10 hidden lg:block">
            <div className="breadcrumb">
              <div className="breadcrumb__position flex items-center">
                <Link to="/" className="text-sm">
                  Home
                </Link>
                <span className="mx-4">
                  <img src={rightArrow} className="w-2" alt="" />
                </span>
              </div>
            </div>
          </div>

          <div className="main-content">
            <div className="main-container md:w-3/4 my-20 mx-auto">
              <div>
                <div className="login-page">
                  <h1 className="text-center text-3xl my-5">Create an Account</h1>

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
                        <span>Signing in...</span>
                      </div>
                    )
                  }

                  {!loading && <div className="login-wr">
                    <div className="content-login md:w-2/5 mx-auto">
                      <form onSubmit={onSubmit}>
                        {
                          error.__html && (
                              <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>

                              </div>
                          )
                        }

                        <div className="mb-4">
                          <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="text"
                            ref={firstnameRef}
                            name="text"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                          Last Name
                          </label>
                          <input
                            type="text"
                            ref={lastnameRef}
                            id="text"
                            name="text"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <input
                            type="email"
                            ref={emailRef}
                            id="email"
                            name="email"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <input
                            type="password"
                            ref={passwordRef}
                            id="password"
                            name="password"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>

                       

                        <button
                          type="submit"
                          className="bg-green-800 text-white rounded-md p-2 w-full font-medium text-lg"
                        >
                          Sign In
                        </button>
                      </form>
                    </div>
                  </div>}

                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
