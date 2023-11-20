import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axoisClient";



export default function RandomItems() {

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
      <div className="text-center"></div>

      <div className="flex justify-center  mt-6">
        <div className="flex justify-center flex-wrap gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 flex  md:justify-between items-center w-full md:w-fit  p-4 shadow-md"
            >
              <div className="promobox-image-video relative">
                <img
                  src={item.frontImage}
                  className="w-48 h-48 md:h-52 rounded-xl object-cover hover:transform hover:scale-110 transition-transform duration-300 ease-in-out"
                  alt=""
                />
              </div>
              <div className="flex flex-col pl-2 ml-4  mx-auto">
                <div className="text-xl mb-2 font-bold uppercase">{item.title}</div>
                <Link
                  to={`ProductPage/${item.id}`}
                  className="uppercase underline-offset-4 underline font-light"
                >
                  Shop Now!
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
