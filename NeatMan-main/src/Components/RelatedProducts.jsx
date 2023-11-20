import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axiosClient from '../../axoisClient';
import { Link } from 'react-router-dom';

// Sample related product data
const relatedProducts = [
  { name: 'Related Product 1', price: '₦75', image: 'https://images.pexels.com/photos/751374/pexels-photo-751374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { name: 'Related Product 2', price: '₦60', image: 'https://images.pexels.com/photos/47047/gold-ingots-golden-treasure-47047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { name: 'Related Product 3', price: '₦80', image: 'https://images.pexels.com/photos/8105118/pexels-photo-8105118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { name: 'Related Product 4', price: '₦90', image: 'https://images.pexels.com/photos/8105118/pexels-photo-8105118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];

export default function RelatedProducts() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
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
        <h1 className="text-3xl font-semibold">Related Products</h1>
      </div>
      
      <div className='bg-blue-400 h-[1px] w-3/12 mx-auto mt-2'></div>
      <div className='md:hidden'>
        <div className="flex justify-center mt-8">
        <div className="w-full md:w-3/4">
          <Slider {...settings}>
            {data.map((product, index) => (
              
            <Link key={index} to={`/ProductPage/${product.id}`} onClick={
              () => location.reload()
            }>
              <div className="rounded-lg p-4 flex flex-col relative group">
                <div className="relative">
                <div className="relative">
                <img
                  src={product.frontImage}
                  alt={product.title}
                  className="w-full h-48 object-cover" // Set a fixed height for the image
                />
              </div>
                </div>
                <div className="mt-2">
                  <div className="text-lg font-normal">{product.title}</div>
                </div>
              </div>
            </Link>
              
            ))}
          </Slider>
        </div>
      </div>
        </div>
      <div className="flex justify-center mt-8">
     <div className='hidden md:block'>
     <div className="  grid grid-cols-2 md:grid-cols-4 w-full  ">
          {data.map((product, index) => (
            
            <Link key={index} to={`/ProductPage/${product.id}`} onClick={
              () => location.reload()
            }>
              <div
              className=" rounded-lg p-4 flex flex-col relative group"
            >
              <div className="relative">
                <img
                  src={product.frontImage}
                  alt={product.title}
                  className="w-full h-28 md:h-48 object-cover"
                />
              </div>
              <div className="mt-2">
                <div className="text-lg font-normal">{product.title}</div>
              </div>
            </div>
            </Link>
            
          ))}


        </div>
     </div>
      
      </div>
    </div>
  );
}
