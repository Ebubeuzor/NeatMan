import React, { useRef, useState } from "react";
import Header from "../Components/Navigation/Header";
import Hamburger from "../Components/Navigation/Hamburger";
import { Link, useNavigate } from "react-router-dom";
import rightArrow from "../assets/line-angle-right-icon.svg";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axoisClient";
import Cookies from "js-cookie";

export default function Login() {
  const {token,setToken,setUser} = useStateContext();
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  if(token){
    return navigate("/")
  }

  const [error, setError] = useState({__html: ""});
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const onSubmit = (ev) => {
    ev.preventDefault();
  
    setLoading(true);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
  
    axiosClient.post('/login', payload)
      .then(({ data }) => {
        
        setLoading(false);
        setUser(data.user);
        setToken(data.token);
  
        // Check if there's a previous URL stored in the cookie
        const redirectPath = Cookies.get("redirectPath");
  
        // If there's a previous URL, navigate to it and remove the cookie
        if (redirectPath) {
          navigate(redirectPath);
          Cookies.remove("redirectPath");
        } else {
          // If there's no previous URL, navigate to the root page or any other desired page
          navigate('/');
        }
      })
      .catch((error) => {
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
      <div className="bg-gray-100 min-h-screen">
        <div className="md:w-[90%] md:mx-auto p-4">
          <div>
            <Header />
            <Hamburger />
          </div>

          <div className="main-content">
            <div className="main-container md:w-3/4 my-20 mx-auto">
              <div>
                <div className="login-page">
                  <h1 className="text-center text-3xl my-5">Sign In</h1>

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
                            id="password"
                            ref={passwordRef}
                            name="password"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>

                        <div className="mb-4 text-sm">
                          <Link to="/Forgot" className="text-blue-500 hover:underline">
                            Forgot Password
                          </Link>
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
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                      Create Account
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
