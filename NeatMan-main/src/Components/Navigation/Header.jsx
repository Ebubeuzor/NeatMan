import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profileIcon from "../../assets/profile-girl-icon.png";
import searchIcon from "../../assets/search-line-icon.png";
import shoppingCartIcon from "../../assets/shopping-cart-icon.png";
import arrowDownIcon from "../../assets/line-angle-down-icon.svg";
import CategoryNavigation from "./CategoryNavigation";
import cancelBtn from "../../assets/close-round-line-icon.svg"
import closeBtn from "../../assets/close-line-icon.svg"
import Logo from "../../assets/Neatman-01.png"
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../../axoisClient";
const productsData = [
  {
    name: "Product 1",
    price: "$49.99",
    image:
      "https://images.pexels.com/photos/8105118/pexels-photo-8105118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with actual image URL
  },
  {
    name: "Product 2",
    price: "$29.99",
    image:
      "https://images.pexels.com/photos/8105118/pexels-photo-8105118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with actual image URL
  },
  {
    name: "Product 3",
    price: "$39.99",
    image:
      "https://images.pexels.com/photos/8105118/pexels-photo-8105118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Replace with actual image URL
  },
];



export default function Header() {
  const cartCount = 5; // Replace with your actual cart count
  const [cartVisible, setCartVisible] = useState(false);

  const openCart = () => {
    setCartVisible(true);
  };

  const closeCart = () => {
    setCartVisible(false);
  };

  const removeItemFromCart = (itemIndex) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(itemIndex, 1);
    setCartItems(updatedCartItems);
  };

  const {token,setUser,user} = useStateContext();

  const [existingCategories, setExistingCategories] = useState([]);

  
  const getCategories = () => {
    axiosClient.get("category")
    .then(({data}) => {
      setExistingCategories(data.data);
    })
    .catch(e => console.log(e))
  }

  useEffect(() => getCategories(),[])
  
  const userData = () => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }

  useEffect(() => {
    userData()
  }, []);

  const [searchItem, setSearchItem] = useState("");

  const setSearchValue = (ev) => {
    setSearchItem(ev.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    window.location.href = `/MarketPlace/?search=${encodeURIComponent(searchItem)}`;
  };

  
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search'); 

  return (
    <div>
      <div className="hidden md:block">
        <div className="header-inner mt-3">
          <div className="row flex flex-col ">
            <div className="flex justify-between items-center py-10">
              <div className="logo-container text-3xl uppercase font-semibold">
                <Link to="/">
                <img src={Logo} className="w-20 " alt="" />
                </Link>
              </div>
              <div className="search-bar border w-3/5 px-5 p-2 items-center h-12 bg-gray-200 rounded-full flex justify-between">
                {search == null && <form method="get" onSubmit={handleSubmit} className="flex justify-between w-full">
                <input
                  type="text"
                  onChange={setSearchValue}
                  value={searchItem}
                  placeholder="Search products"
                  className="outline-none bg-gray-200 w-full"
                />
                <img src={searchIcon} className="w-5 h-5" alt="" />

                </form>}
                {search != null &&<form method="get" onSubmit={handleSubmit} className="flex justify-between w-full">
                <input
                  type="text"
                  onChange={setSearchValue}
                  defaultValue={search}
                  placeholder="Search products"
                  className="outline-none bg-gray-200 w-full"
                />
                <img src={searchIcon} className="w-5 h-5" alt="" />

                </form>}
              </div>
              <div className="header-cart-container flex space-x-5">
               <Link to="/Signup">
               <div className="top-currency cursor-pointer">
                  {token == null && <img src={profileIcon} className="w-7 h-7" alt="" />}
                  {token != null && <div>{user.first_name}</div>}
                </div>
               </Link>

                {user.admin === "Admin" &&
                  <div className="relative">
                  <Link to={"/NewProducts"}>Admin</Link>
                </div>}
              </div>
            </div>
            <div className="menu-main-home flex justify-between bg-green-800 text-white px-4 py-4">
              <div className="menu-top">
                <ul className="navbar-nav flex space-x-10">
                  <li className="flex items-center space-x-2 cursor-pointer">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="flex items-center space-x-2 cursor-pointer relative group">
                    <span>Shop</span>
                    <img src={arrowDownIcon} className="w-2 h-2 ml-1" alt="" />
                    <ul className="absolute text-black hidden mt-2 py-2 bg-white border w-max border-gray-300 rounded shadow-lg group-hover:block top-4 z-10 p-4">
                      {existingCategories && existingCategories.map((e) => (
                        <li key={e.id}>
                          <a 
                          href={`/MarketPlace/?category=${encodeURIComponent(e.name)}`}
                          >{e.name}</a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="flex items-center space-x-2 cursor-pointer relative group">
                    <span>Products</span>
                    <img src={arrowDownIcon} className="w-2 h-2 ml-1" alt="" />
                    <div className="absolute w-max text-black hidden mt-2 py-2 bg-white border border-gray-300 rounded shadow-lg group-hover:block top-4 z-10 p-4 ">
                      <ul className="">
                        <div className="md:flex md:justify-between md:space-x-5 mt-7">
                          <div>
                            <ul className="font-normal">
                              <h1 className="font-medium"> SHOP</h1>
                              <li className="py-2"><a href="/MarketPlace"> All Collections</a></li>
                              <li className="py-2"><a href="/MarketPlace?newArrival=newArrival"> New Products</a></li>
                            </ul>
                          </div>
                       
                        </div>
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-center space-x-2 cursor-pointer relative group">
                    <span>Pages</span>
                    <img src={arrowDownIcon} className="w-2 h-2 ml-1" alt="" />
                    <ul className="absolute text-black hidden mt-2 py-2 w-max bg-white border border-gray-300 rounded shadow-lg group-hover:block top-4 z-10 w-[500px] p-4">
                      <li>
                        <a href="/About">About Us</a>
                      </li>
                      <li>
                        <a href="/Services">Services</a>
                      </li>
                      <li>
                        <a href="/faq">Faq</a>
                      </li>
                      <li>
                        <a href="/ContactUs">Contact Us</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="menu-text-right">
                <div className="custom-content">
                  <strong>Customer Service</strong>: 080-5936-0753
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cartVisible && (
        <div className="fixed right-0 top-0 h-full w-full bg-opacity-75 bg-black z-50 "            
        >
          <div className="bg-white p-4 h-full w-[35%] absolute right-0  shadow-lg">
            <button
              onClick={closeCart}
              className="close-cart absolute top-5 right-5 text-red-500"
            >
             <img src={closeBtn} className="w-5" alt="" />
            </button>
            <div className="dropdown-cart mt-7">
              <div className="continue-shopping my-7">
                <span className="uppercase font-medium text-xl">my cart</span>
              </div>

              <div className="mini_cart_header">
                <ul className="cart-list h-[60vh] overflow-scroll example">
                  {cartItems.map((item, index) => (
                    <li className="item flex items-center my-4 border-b-[1px] pb-4" key={index}>
                      <Link to="/" className="w-28 h-28">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover"
                          alt={item.name}
                        />
                      </Link>
                      <div className="product-inner space-y-3 w-full ml-4">
                        <div className="product-name">
                          <Link to="/" className="font-medium text-xl">{item.name}</Link>
                        </div>
                        <div className="option">
                          <div className="cart-collateral flex">
                            <span className="qty-cart text-slate-300 mr-4">
                              Qty: {item.quantity}
                            </span>
                            <div className="price font-light">{item.price}</div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItemFromCart(index)}
                        className="remove-item ml-4 text-red-500"
                      >
                        <img src={cancelBtn} className="w-8" alt="" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
                      <hr />
              <div className="wrap-btcart flex flex-col">
                <div className="summary ">
                  <div className="total flex justify-between py-4 text-xl">
                    <div className="label">
                      Total:
                    </div>
                    <div className="price">
                      $1,700
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <div className="view-cart my-2">
                    <Link to="/Cart" className="flex justify-center border-2 p-3 uppercase">
                      View Cart
                    </Link>
                  </div>
                  <button className="flex mx-auto  w-full justify-center py-3 my-3 uppercase bg-green-800 text-white">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
