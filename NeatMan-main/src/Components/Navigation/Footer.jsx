import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white pt-10 pb-20 px-4">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4">
          <h3 className="text-xl font-semibold">Information</h3>
          <ul className="mt-2">
            <li><a href="/About"> About Us</a></li>
            <li><a href="/Services">Our Services</a> </li>
          </ul>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4">
          <h3 className="text-xl font-semibold">Services</h3>
          <ul className="mt-2">
            <li><a href="/Faq">FAQ</a></li>
            <li><a href="/ContactUs"> Contact Us</a></li>
          </ul>
        </div>
        
      </div>
    </footer>
  );
}
