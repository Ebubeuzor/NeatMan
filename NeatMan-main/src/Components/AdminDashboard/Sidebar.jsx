import React from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../../axoisClient';
import { useStateContext } from '../../context/ContextProvider';

export default function Sidebar() {
  
  const {setToken,setUser} = useStateContext();
  const logOut = (ev) => {
    ev.preventDefault();
    
    axiosClient.get('/logout')
    .then((res) =>{
      setUser({});
      setToken(null);
      location.reload();
    });
  }

  return (
    <div> <ul className="px-4">
    <li>
      <div className="font-extrabold text-2xl my-4">Welcome Admin</div>
    </li>
    <li>
      <div className="p-4 hover:bg-slate-300 border-b">
        <Link to="/EditHomepage" className="text-black  ">
          <div>EditHomepage</div>
        </Link>
      </div>
      <div className="p-4  border-b hover:bg-slate-300 ">
        <Link to="/EditCategories" className="text-black  ">
          <div>Categories</div>
        </Link>
      </div>
    </li>
    {/* <li>
      <div className="p-4  hover:bg-slate-300 border-b">
        <Link to="/EditOrder" className="text-black active">
          <div>Edit Order</div>
        </Link>
      </div>
    </li> */}
    <li>
      <div className="p-4  hover:bg-slate-300 border-b">
        <Link to="/Products" className="text-black ">
          <div>Products</div>
        </Link>
      </div>
    </li>
    <li>
      <div className="p-4  hover:bg-slate-300 border-b">
        <Link to="/NewProducts" className="text-black ">
          <div>New Products</div>
        </Link>
      </div>
    </li>
    {/* <li>
      <div className="p-4  hover:bg-slate-300 border-b">
        <Link to="/Order" className="text-black ">
          <div>Order</div>
        </Link>
      </div>
    </li> */}
    <li>
      <div className="p-4  hover:bg-slate-300 border-b">
        <Link onClick={logOut} className="text-black ">
          <div>Logout</div>
        </Link>
      </div>
    </li>
  </ul></div>
  )
}
