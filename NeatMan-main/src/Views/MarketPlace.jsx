import React, { useEffect, useState } from "react";
import Hamburger from "../Components/Navigation/Hamburger";
import Header from "../Components/Navigation/Header";
import Pagination from "../Components/Navigation/Pagination";
import { Link } from "react-router-dom";
import rightArrow from "../assets/line-angle-right-icon.svg";
import Footer from "../Components/Navigation/Footer";
import dropdown from "../assets/descending-icon.svg";
import axiosClient from "../../axoisClient";
import SearchFilter from "../Components/Navigation/SearchFilter";

export default function MarketPlace() {
  const [priceFilter, setPriceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]); // Initialize an empty cart
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // State for the filter modal
  const [meta,setMeta] = useState({});

  const [products,setProducts] = useState([]);
  
  const [loading,setLoading] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category'); 
  const search = queryParams.get('search'); 
  const newArrival = queryParams.get('newArrival'); 

  console.log(newArrival);

  const getProduct = (url) => {
    setLoading(true);
    url = url || 'products'
    axiosClient.get(url)
    .then(({data}) => {
      console.log(data.meta);
      setMeta(data.meta);
      setProducts(data.data);
      setLoading(false);
    });
  }

 

  useEffect(() => {
    if (category !== null && category !== undefined) {
      getProduct(`/selectProducts?category=${category}`);
    } 
    else if (search !== null && search !== undefined) {
      getProduct(`/search?search=${search}`);
    } 
    else if (newArrival) {
      getProduct(`/newArrival`);
    } 
    else {
      getProduct();
    }
  }, [category, search]);
  

  
  const onPageClick = (link) => {
    axiosClient.get(`/products?page=${link}`)
    .then(({data}) => {
      setMeta(data.meta);
      setProducts(data.data);
    })
  }

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
    // Fetch and update products based on the selected filter
  };

  console.log(meta);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="md:w-[90%] md:mx-auto p-4">
        <div>
          <Header />
          <Hamburger />
        </div>

        {
          loading && (
            <div className="flex justify-center items-center mt-10 mb-100">
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
              <div className="h-[50vh] flex items-center">Loading...</div>
            </div>
          )
        }


        {!loading && <div className="marketplace">
          <div className="main-content  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-1 col-span-2">
              <div className="shoppify-section">
              <SearchFilter />

                <div className="display-toolbar">
                  <div className="showing text-2xl my-4">
                    All Product (S) ({products.length})
                  </div>
                </div>

                <div className="product-grid  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:flex lg:flex-wrap     gap-1">
                  {products.map((product) => (
                    <div className="collection-product" key={product.id}>
                      <div className="grid-item relative">
                      <Link to={`/ProductPage/${product.id}`} 
                        className="block group rounded-lg p-2">

                          <img
                            src={product.frontImage}
                            alt={product.title}
                            className="product-image w-full md:w-56 h-40 md:h-64  object-cover"
                          />
                          <div className="product-name text-lg font-semibold mt-2">
                            {product.title}
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-1 col-span-">
</div>
          </div>
          {products.length < 1 && 
            <div className="text-center w-full text-green-600 h-[40vh] flex justify-center it">No Product on this yet...</div>
          }
          <div className="my-20">
            {Object.keys(meta) != 0 && <Pagination meta={meta} onPageChange={onPageClick}/>}
          </div>
        </div>}
      </div>
      <Footer />
    </div>
  );
}
