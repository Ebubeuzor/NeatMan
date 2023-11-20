import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import ProductPage from "./Views/ProductPage";
import Cart from "./Views/Cart";
import MarketPlace from "./Views/MarketPlace";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import Account from "./Components/UserDashboard/Account";
import AccountOrder from "./Components/UserDashboard/AccountOrder";
import AccountSettings from "./Components/UserDashboard/AccountSettings";
import AccountAddress from "./Components/UserDashboard/AccountAddress";
import EditHomepage from "./Components/AdminDashboard/EditHomepage";
import MenuEditor from "./Components/AdminDashboard/MenuEditor";
import EditCategories from "./Components/AdminDashboard/EditCategories";
import Products from "./Components/AdminDashboard/Products";
import NewProducts from "./Components/AdminDashboard/NewProducts";
import { ContextProvider } from "./context/ContextProvider";
import Verify from "./Views/Verify";
import Forgot from "./Views/Forgot";
import FAQ from "./Views/faq";
import About from "./Views/About";
import Services from "./Views/Services";
import ContactUs from "./Views/ContactUs";
function App() {
  return (
    <Router>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProductPage/:id" element={<ProductPage />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/MarketPlace" element={<MarketPlace />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Verify" element={<Verify />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/About" element={<About />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/AccountOrder" element={<AccountOrder />} />
          <Route path="/AccountSettings" element={<AccountSettings />} />
          <Route path="/AccountAddress" element={<AccountAddress />} />
          <Route path="/EditHomepage" element={<EditHomepage />} />
          <Route path="/MenuEditor" element={<MenuEditor />} />
          <Route path="/EditCategories" element={<EditCategories />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/NewProducts/:id?" element={<NewProducts />} />

        </Routes>
      </ContextProvider>
    </Router>
  );
}

export default App;
