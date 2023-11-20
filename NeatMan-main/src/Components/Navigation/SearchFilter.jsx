import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axoisClient';

const SearchFilter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(''); // You can set default filter value

  const handleSearch = (ev) => {
    ev.preventDefault();
    window.location.href = `/MarketPlace/?search=${encodeURIComponent(searchQuery)}`;
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedFilter(value);
    window.location.href = `/MarketPlace/?category=${encodeURIComponent(value)}`;
  };

  const [existingCategories, setExistingCategories] = useState([]);

  
  const getCategories = () => {
    axiosClient.get("category")
    .then(({data}) => {
      setExistingCategories(data.data);
    })
    .catch(e => console.log(e))
  }

  useEffect(() => getCategories(),[])

  
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category'); 
  const search = queryParams.get('search'); 

  return (
    <div className="flex flex-wrap space-y-5 md:space-y-0   justify-between items-center py-4 ">
      <form onSubmit={handleSearch} className="flex items-center md:hidden space-x-4">
        {search == null && <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 md:w-72 rounded"
        />}

        {search != null && <input
          type="text"
          placeholder="Search products..."
          defaultValue={search}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 md:w-72 rounded"
        />}
        <button  className="bg-green-700 text-white p-2 rounded">
          Search
        </button>
      </form>
      <div>
        <label htmlFor="filter" className="mr-2">
          Filter:
        </label>
        {category == null && <select
          id="filter"
          value={selectedFilter}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          {existingCategories && existingCategories.map((e) => (
            <option value={`${e.name}`}>{e.name}</option>
          ))}
          {/* Add more options based on your mineral types */}
        </select>}
        
        {category != null && <select
          id="filter"
          defaultValue={category}
          onChange={handleFilterChange}
          className="border p-2 rounded"
          >
          <option value="all">All</option>
          {existingCategories && existingCategories.map((e,index) => (
            <option key={index} value={`${e.name}`}>{e.name}</option>
          ))}
          {/* Add more options based on your mineral types */}
        </select>}
      </div>
    </div>
  );
};

export default SearchFilter;
