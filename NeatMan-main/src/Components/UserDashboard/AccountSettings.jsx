import React, { useState } from 'react';
import Header from '../Navigation/Header';
import Hamburger from '../Navigation/Hamburger';
import Footer from '../Navigation/Footer';

export default function AccountSettings() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = (e) => {
    e.preventDefault(); // Prevent the form from submitting (since we're handling it in JS)
    
    // Perform save action here (e.g., send data to the server)
    // You can also add validation logic before saving the data
    // For now, this example just displays the data in the console
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Country:', country);
    console.log('Date of Birth:', dateOfBirth);
    console.log('Email:', email);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="md:w-[90%] md:mx-auto p-4">
        <div>
          <Header />
          <Hamburger />
        </div>
        <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Country:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Date of Birth (dd/mm/yyyy):</label>
            <input
              type="text"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
      <Footer/>
    </div>
  );
}
