import React, { useState } from "react";
import Header from "../Navigation/Header";
import Hamburger from "../Navigation/Hamburger";
import Footer from "../Navigation/Footer";

export default function AccountAddress() {
  const initialAddress = {
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    contactNumber: "",
  };

  const [address, setAddress] = useState({ ...initialAddress });

  const handleSave = () => {
    // Perform save action here (e.g., send data to the server)
    // You can also add validation logic before saving the data
    // For now, this example just displays the data in the console
    console.log("Address Data:", address);
  };

  const handleInputChange = (fieldName, value) => {
    setAddress({ ...address, [fieldName]: value });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="md:w-[90%] md:mx-auto p-4">
        <div>
          <Header />
          <Hamburger />
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Account Address</h1>
        <form onSubmit={handleSave}>
          {/* Input fields and labels (styled with Tailwind CSS classes) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              First Name:
            </label>
            <input
              type="text"
              value={address.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Last Name:
            </label>
            <input
              type="text"
              value={address.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Address Line 1:
            </label>
            <input
              type="text"
              value={address.addressLine1}
              onChange={(e) =>
                handleInputChange("addressLine1", e.target.value)
              }
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Address Line 2:
            </label>
            <input
              type="text"
              value={address.addressLine2}
              onChange={(e) =>
                handleInputChange("addressLine2", e.target.value)
              }
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              City:
            </label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              State:
            </label>
            <input
              type="text"
              value={address.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Zip Code:
            </label>
            <input
              type="text"
              value={address.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Contact Number:
            </label>
            <input
              type="text"
              value={address.contactNumber}
              onChange={(e) =>
                handleInputChange("contactNumber", e.target.value)
              }
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-green-800 text-white rounded-md p-2 w-full font-medium text-lg"
          >
            Save
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
