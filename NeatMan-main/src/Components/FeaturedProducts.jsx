import React, { useEffect, useState } from "react";
import axiosClient from "../../axoisClient";
import { Link } from "react-router-dom";

// Sample product data for different categories
const products = {
  gold: [
    {
      name: "Coal ",
      price: "₦100",
      image:
        "https://images.pexels.com/photos/46801/coal-briquette-black-46801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Home Used Coal",
      price: "₦150",
      image:
        "https://media.istockphoto.com/id/1189704213/photo/male-hand-with-coal-on-the-background-of-a-heap-of-coal-coal-mining-in-an-open-pit-quarry.jpg?s=2048x2048&w=is&k=20&c=Ha2_8ayhMgEagA-8LO7YG8WwwyhtygSiHhrvr67aBzs=",
    },
    {
      name: "Black Coal",
      price: "₦150",
      image:
        "https://media.istockphoto.com/id/540522616/photo/black-coal.jpg?s=2048x2048&w=is&k=20&c=_8jZefrC9FYEK1yY1jGO7ZZ6JiwmAIS6lGvkgUyyvqM=",
    },
    {
      name: "Coal",
      price: "₦100",
      image:
        "https://media.istockphoto.com/id/451567987/photo/coal.jpg?s=2048x2048&w=is&k=20&c=aOnIRZ3tLSVM2iFgU5p4RsyWq26hArdbqA4F5wq-eL0=",
    },
  ],
  aluminium: [
    {
      name: "aluminium",
      price: "₦50",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Aluminium-4.jpg/640px-Aluminium-4.jpg",
    },
    {
      name: "Aluminium ",
      price: "₦50",
      image:
        "https://i0.wp.com/geologyscience.com/wp-content/uploads/2023/04/indir-1.png?fit=1870%2C933&ssl=1",
    },
    {
      name: "Bauxite",
      price: "₦50",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/11/Bauxite_h%C3%A9rault.JPG",
    },
  ],
  copper: [
    {
      name: "Copper",
      price: "₦100",
      image:
        "https://geology.com/minerals/photos/copper-230.jpg",
    },
    { name: "Kombat Copper", price: "₦30", image: "https://www.miningreview.com/wp-content/uploads/2017/12/copper.jpg" },
  ],
};

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState([]);

  const handleTabClick = (category) => {
    setActiveTab(category);
  };

  const handleAddToCart = (productName) => {
    // You can implement the logic to add the product to the cart here
    alert(`Added ${productName} to cart`);
  };

  
  const [data, setData] = useState([]);

  const getRandomProduct = () => {
    axiosClient.get("getProductsRandom")
    .then(({data}) => {
      console.log(data);
      setData(data.data);
    })
    .catch(e => console.log(e))
  }


  useEffect(() => getRandomProduct(),[])

  return (
    <div className="py-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Featured Products</h1>
      </div>
      <div className="bg-green-400 h-[1px] w-3/12 mx-auto mt-2"></div>
      <div className="flex justify-center mt-6">
        <div className="space-x-4">
          {data && data.map((d) => (
            <button
            onClick={() => handleTabClick("gold")}
            className={`tab-button ${activeTab === "gold" ? "active" : ""}`}
          >
            {d.title}
          </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 w-full">
          {data.map((product, index) => (

            <Link to={`/ProductPage/${product.id}`}>
              <div
                key={index}
                className="bg-white rounded-lg p-4 flex flex-col relative group"
              >
                <div className="relative">
                  <img
                    src={product.frontImage}
                    alt={product.title}
                    className={`w-48 h-28 md:h-48 md:w-56 object-cover ${
                      activeTab === "gold" || activeTab === "aluminium"
                        ? "fixed-width"
                        : ""
                    }`}
                  />
                </div>
                <div className="mt-2">
                  <div className="text-xl font-bold">{product.title}</div>
                </div>
              </div>
            </Link>
            
          ))}
        </div>
      </div>
    </div>
  );
}
