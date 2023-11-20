import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import coats from "../../assets/coats.jpeg";
import Pagination from "../Navigation/Pagination";
import Button from "../Button";
import axiosClient from "../../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";
import Sidebar from "./Sidebar";

export default function Products() {
  const [loading,setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDataCheck, setSelectedDataCheck] = useState(false);
  const {notification,setNotification,token,setToken,setUser,user} = useStateContext();
  const [meta,setMeta] = useState({});
  const [categories, setCategories] = useState([]);
  const [products,setProducts] = useState([]);
  const [editContent, setEditContent] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStockStatus, setSelectedStockStatus] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");

  
  const userData = () => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }

  useEffect(() => {
    userData()
  }, []);
  
  
  if (user.admin == null) {
    return <Navigate to="/"/>
  }

  const logOut = (ev) => {
    ev.preventDefault();
    
    axiosClient.get('/logout')
    .then((res) =>{
      setUser({});
      setToken(null);
      location.reload();
    });
  }
  

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);

    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checked;
    });
  };

  
  const getMenu = () => {
    axiosClient.get('/menu')
      .then(({ data }) => {
        console.log(data);

        const transformedData = data.data.map(menuItem => ({
          title: menuItem.Title,
          subtitles: menuItem.Categories.map(category => ({
            text: category.categories,
            items: [
              {
                text: category.subMenu,
                link: null // You might need to handle this part based on your actual data
              }
            ]
          }))
        }));

        console.log("Transformed Data:", transformedData);
        setEditContent(transformedData);
      })
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    getMenu()
  }, []);


  const getProduct = (url) => {
    setLoading(true)
    url = url || '/products'
    axiosClient.get(url)
    .then(({data}) => {
      console.log(data.data);
      setMeta(data.meta);
      setProducts(data.data);
      setLoading(false)
    });
  }

  
  const getCategory = () => {
    axiosClient.get('/category')
    .then(({data}) => {
      console.log(data.data);
      setCategories(data.data)
    });
  }
  
  useEffect(()=>{
    getCategory()
  },[])

  const onDelete = (product) => {

    axiosClient.delete(`/products/${product.id}`)
    .then(() => {
      setNotification("Product was successfully deleted")
      getProduct();
    })
  }

  useEffect(()=>{
    getProduct()
  },[])
  
  
  const onPageClick = (link) => {
    axiosClient.get(`/products?page=${link}`)
    .then(({data}) => {
      setMeta(data.meta);
      setProducts(data.data);
    })
  }
  
  const submitData = (ev) => {
    ev.preventDefault();

    const selectedValues = {
      category: selectedMenu,
    };


    axiosClient.post('/rearrange',selectedValues)
    .then(({data}) => {
      console.log(data);
      setSelectedData(data.data);
      setSelectedDataCheck(true);
    })
    .catch((e) => console.log(e))
  }

  
  const [existingCategories, setExistingCategories] = useState([]);
  
  const getCategories = () => {
    axiosClient.get("category")
    .then(({data}) => {
      setExistingCategories(data.data);
    })
    .catch(e => console.log(e))
  }

  useEffect(() => getCategories(),[]);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3 bg-gray-200 h-[100vh]">
        <Sidebar/>
      </div>
      <div className="col-span-9 bg-white h-[100vh] overflow-scroll">
        <div className="p-4">
          <header>
            <div className=" my-4 items-center">
              <h1 className="font-bold text-lg block fontBold">Products</h1>
            <div className="block">
              <p className="fontThin">Review and manage the details of all orders placed by customers.
</p>
            <Link to="/NewProducts">
            <Button  text="Add New"/>

            </Link>
            </div>

            </div>
          </header>
          <form className="bg-slate-200 rounded-lg shadow-lg p-4" method="post" onSubmit={submitData} >
            <div className="flex flex-wrap mb-4 mt-4 items-center">
              
              <div className="m-4">
                <select 
                  className="px-2 py-1 border border-gray-300 rounded"
                  onChange={(e) => setSelectedMenu(e.target.value)}
                  value={selectedMenu}
                >
                  <option>Choose Category</option>
                  {existingCategories.map((cat) => (                    
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))

                  }

                </select>
              </div>
              <div className="m-4">
              </div>
              
              <div className="m-4">
                <button className="px-4 py-2 text-white bg-black rounded" type="submit">
                  Apply
                </button>
              </div>
            </div>
          </form>
          <table className="w-full border border-gray-300 bg-slate-200 rounded-lg shadow-lg p-4 mt-6">
            <thead>
              <tr>
                <th className="font-bold bg-slate-500 p-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
                <th className="fontBold bg-slate-500  text-white p-4">Image</th>
                <th className="fontBold bg-slate-500  text-white p-4">Name</th>
                <th className="fontBold bg-slate-500  text-white p-4">Categories</th>
                <th className="fontBold bg-slate-500  text-white p-4">Published</th>
              </tr>
            </thead>
            <tbody className="p-5 ">
              {
                loading && (<div className="flex justify-center items-center mt-10">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16v3a5 5 0 010 10v3a8 8 0 000 16 4 4 0 110-8 4 4 0 004-4v-3a5 5 0 010-10v-3z"></path>
                </svg>
                <span>Loading...</span>
                </div>)
              }

              {!loading && selectedDataCheck && selectedData && selectedData.map((product)=> (
                <tr key={product.id} className="p-5">
                <td className="text-center p-4 bg-white">
                  <input type="checkbox" />
                </td>
                <td className="text-center p-4 bg-white">
                  <img src={product.frontImage} alt="Product" className="w-16 h-16 mx-auto my-3" />
                </td>
                <td className="text-center p-4 bg-white">
                  <Link to="/">{product.title}</Link>
                  <div className="hover:visible">
                    <button onClick={ev => onDelete(product)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                    <Link to={"/NewProducts/"+ product.id} className=" hover:underline ml-4">
                      View
                    </Link>
                  </div>
                </td>
                <td className="text-center p-4 bg-white">
                  {
                    product.categories.map((category)=> (
                      `${category.name} ,`
                    ))
                  }
                </td>
                <td className="text-center p-4 bg-white">{product.created_at}</td>
              </tr>
              ))}

              {!loading && !selectedDataCheck && products.map((product)=> (
                <tr key={product.id} className="p-5">
                  <td className="text-center p-4 bg-white">
                    <input type="checkbox" />
                  </td>
                  <td className="text-center p-4 bg-white">
                    <img src={product.frontImage} alt="Product" className="w-16 h-16 mx-auto my-3" />
                  </td>
                  <td className="text-center p-4 bg-white">
                    <Link to="/">{product.title}</Link>
                    <div className="hover:visible">
                      <button onClick={ev => onDelete(product)} className="text-red-500 hover:underline">
                        Delete
                      </button>
                      <Link to={"/NewProducts/"+ product.id} className=" hover:underline ml-4">
                        View
                      </Link>
                    </div>
                  </td>
                  <td className="text-center p-4 bg-white">
                    {
                      product.categories.map((category)=> (
                        `${category.name} ,`
                      ))
                    }
                  </td>
                  <td className="text-center p-4 bg-white">{product.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <div className="my-14">
            {Object.keys(meta) != 0 && <Pagination meta={meta} onPageChange={onPageClick}/>}
         </div>
      </div>

      {
        notification && (
            <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
            {notification}
        </div>)
      }
    </div>
  );
}
