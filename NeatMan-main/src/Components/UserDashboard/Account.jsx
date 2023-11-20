import React, { useState } from "react";
import Header from "../Navigation/Header";
import Hamburger from "../Navigation/Hamburger";
import { Link } from "react-router-dom";
import Footer from "../Navigation/Footer";
import cancelBtn from "../../assets/close-round-line-icon.svg"

export default function Account() {

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

      const removeItemFromCart = (itemIndex) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(itemIndex, 1);
        setCartItems(updatedCartItems);
      };
  return (
    <div>
      {" "}
      <div className="bg-gray-100 min-h-screen">
        <div className="md:w-[90%] md:mx-auto p-4">
          <div>
            <Header />
            <Hamburger />
          </div>
          <h1 className="text-xl my-10 uppercase font-bold ">Welcome User name</h1>

          <div className="grid md:grid-cols-2">
            
       <section>

       <div className="mini_cart_header">
        <h1 className="text-xl my-4 uppercase">wishlists</h1>
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
       </section>
        <section className="accountOptions">
          <div className="my-account-options flex  mt-7 mx-4 text-center flex-wrap justify-center">
            <Link to="/AccountOrder" className="m-6">
              <div>
                <div className="link-my-account-options">
                  <span className="fontBold">My Orders</span>
                </div>
                <div className="description-my-account-option">
                  Manage and edit your orders
                </div>
              </div>
            </Link>

            <Link to="/AccountSettings" className="m-6">
              <div>
                <div className="link-my-account-options">
                  <span className="fontBold">Account Settings</span>
                </div>
                <div className="description-my-account-option">
                  Manage profile and preferences.
                </div>
              </div>
            </Link>

            <Link to="/AccountAddress" className="m-6">
              <div>
                <div className="link-my-account-options">
                  <span className="fontBold">Address Book</span>
                </div>
                <div className="description-my-account-option">
                  Manage shipping & billing addresses.
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
