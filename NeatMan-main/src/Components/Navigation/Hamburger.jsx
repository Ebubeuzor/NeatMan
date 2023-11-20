import React, { useEffect, useState } from "react";
import profileIcon from "../../assets/profile-girl-icon.png";
import searchIcon from "../../assets/search-line-icon.png";
import shoppingCartIcon from "../../assets/shopping-cart-icon.png";
import HamburgerMenu from "react-hamburger-menu";
import closeX from "../../assets/close-line-icon.svg";
import dropdown from "../../assets/line-angle-down-icon.svg";
import { Link } from "react-router-dom";
import cancelBtn from "../../assets/close-round-line-icon.svg"
import closeBtn from "../../assets/close-line-icon.svg"
import Logo from "../../assets/Neatman-01.png"
import axiosClient from "../../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";


export default function Hamburger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartCount = 5;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDropdown = (event) => {
    event.target.nextElementSibling.classList.toggle("hidden");
  };

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
  const [cartItems, setCartItems] = useState([
    {
      name: "Product 1",
      price: "$49.99",
      image:
        "https://images.pexels.com/photos/8105118/pexels-photo-8105118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      quantity: 3,
    },
    {
      name: "Product 2",
      price: "$49.99",
      image:
        "https://images.pexels.com/photos/8105118/pexels-photo-8105118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      quantity: 33,
    },

    {
      name: "Product 3",
      price: "$49.99",
      image:
        "https://images.pexels.com/photos/8105118/pexels-photo-8105118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      quantity: 5,
    },

    {
      name: "Product 4",
      price: "$49.99",
      image:
        "https://images.pexels.com/photos/8105118/pexels-photo-8105118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      quantity: 9,
    },

    {
      name: "Product 4",
      price: "$49.99",
      image:
        "https://images.pexels.com/photos/8105118/pexels-photo-8105118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      quantity: 9,
    },

    {
      name: "Product 4",
      price: "$49.99",
      image:
        "https://images.pexels.com/photos/8105118/pexels-photo-8105118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      quantity: 9,
    },
  ]);

  
  const {token,inCart,setIncart,setUser,setToken,user} = useStateContext();

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

  console.log(user);

  return (
    <div>
      <div className="md:hidden">
        <div className="header-inner mt-3">
          <div className="row flex flex-col">
            <div className="flex  items-center">
              <div className="flex  space-x-4 items-center">
                <div className="hamburger-menu" onClick={toggleModal}>
                  <HamburgerMenu
                    isOpen={isModalOpen}
                    menuClicked={toggleModal}
                    width={20}
                    height={20}
                    strokeWidth={2}
                    rotate={0}
                    color="black"
                    borderRadius={0}
                    animationDuration={0.5}
                  />
                </div>
                {/* <img src={searchIcon} className="w-7 h-7" alt="" /> */}
              </div>
              <div className="logo-container text-2xl uppercase font-semibold w-3/4 text-center">
              <Link to="/">
                <img src={Logo} className="w-20 mx-auto" alt="" />
                </Link>              </div>

              <div className="flex w-3/12 justify-end space-x-3">
              {token == null && <Link to="/signup">
              <img src={profileIcon} className="w-7 h-7" alt="" />
              </Link>}
              {token != null && <div>{user.first_name}</div>}

                <div className="header-cart-container flex ">
                  <div className="top-currency"></div>
                  <div className="header-cart relative">
                    {user.admin === "Admin" &&
                      <div className="relative">
                      <Link to={"/NewProducts"}>Admin</Link>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-30 flex items-center justify-center">
          <div
            className={`modal-overlay absolute inset-0 ${
              isModalOpen ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          ></div>
          <div className="modal-container absolute pt-20 left-0 w-2/3 h-screen bg-white p-4 transform transition-transform">
            <button onClick={toggleModal} className="mb-10">
              <img src={closeX} className="w-4" alt="" />
            </button>
            <div className="sidebar">
              <ul className="space-y-5">
                <li className="text-xl">
                  <Link to="/">Home</Link>
                </li>
                <li className="relative group text-xl">
                  <Link
                    to="#"
                    onClick={toggleDropdown}
                    className="group hover:bg-gray-100 flex items-center"
                  >
                    Products <img src={dropdown} className="w-3 ml-2" alt="" />
                  </Link>
                  <ul className="dropdown hidden">  
                    <li className="py-2"><a href="/MarketPlace"> All Collections</a></li>
                    <li className="py-2"><a href="/MarketPlace?newArrival=newArrival"> New Products</a></li>
                  </ul>
                </li>
                <li className="relative group text-xl">
                  <Link
                    to="#"
                    onClick={toggleDropdown}
                    className="group hover:bg-gray-100 flex items-center"
                  >
                    Pages <img src={dropdown} className="w-3 ml-2" alt="" />
                  </Link>
                  <ul className="dropdown hidden">
                    <li className="text-base">
                        <a href="/About">About Us</a>
                    </li>
                    <li className="text-base">
                      <a href="/Services">Services</a>
                    </li>
                    <li className="text-base">
                      <a href="/faq">Faq</a>
                    </li>
                    <li className="text-base">
                      <a href="/ContactUs">Contact Us</a>
                    </li>
                  </ul>
                </li>
                <li className="relative group text-xl">
                  <Link
                    to="#"
                    onClick={toggleDropdown}
                    className="group hover:bg-gray-100  flex items-center"
                  >
                    Categories{" "}
                    <img src={dropdown} className="w-3 ml-2" alt="" />
                  </Link>
                  <ul className="dropdown hidden">
                    {existingCategories && existingCategories.map((e) => (
                      <li>
                        <a 
                        href={`/MarketPlace/?category=${encodeURIComponent(e.name)}`}
                        >{e.name}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="custom-content mt-5 fixed bottom-0 p-10">
              <p className="text-gray-600">
                <strong>Customer Service:</strong> 080-5936-0753
              </p>
            </div>
          </div>
        </div>
      )}

      {cartVisible && (
        <div className="fixed right-0 top-0 h-full w-full bg-opacity-75 bg-black z-50 ">
          <div className="bg-white p-4 h-full w-[90%] absolute right-0  shadow-lg">
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
                <ul className="cart-list h-[40vh] overflow-scroll">
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
                          <Link to="/">{item.name}</Link>
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
                    <div className="label">Total:</div>
                    <div className="price">$1,700</div>
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
