import React, { useEffect, useState } from 'react';
import fourSquareIcon from "../../assets/four-squares-line-icon.svg";
import { Link } from 'react-router-dom';
import axiosClient from '../../../axoisClient';

export default function CategoryNavigation() {
  
  const [categories,setCategories] = useState([]);
  
  const getCategories = () => {
    axiosClient.get("category")
    .then(({data}) => {
      console.log(data.data);
      setCategories(data.data);
    })
    .catch(e => console.log(e))
  }
  
  useEffect(() => getCategories(),[])
  
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Shuffle the categories array
const shuffledCategories = shuffleArray(categories);

// Take the first 4 categories
const categoriesToShow = shuffledCategories.slice(0, 4);

  return (
    <div>
      <div>
        <div className="parent-title flex items-center space-x-3 p-4 bg-black">
          <img src={fourSquareIcon} className='w-4 h-4' alt="" />
          <span className='text-white uppercase'>Categories</span>
        </div>
        <div className="vertical-menu">
          <ul className="navbar-nav">
            {categoriesToShow.map((category, index) => (
                  <a href={`/MarketPlace/?category=${encodeURIComponent(category.name)}`} key={index} >
              <li className='bg-green-800 hover:bg-green-400 text-white p-4 border-t-2 cursor-pointer'>
              {category.name}
              </li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
