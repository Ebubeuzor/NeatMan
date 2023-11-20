import React from "react";
import Hamburger from "../Components/Navigation/Hamburger";
import Header from "../Components/Navigation/Header";
import Footer from "../Components/Navigation/Footer";

export default function FAQ() {
  return (
    <div>
      <div className="md:w-[90%] md:mx-auto p-4">
        <div>
          <Hamburger />
          <Header />
        </div>
        <div className="my-20">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions (FAQ)</h1>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">1. How can I inquire about a product?</h2>
            <p>
              To inquire about a specific product, kindly visit the product page and find the relevant contact information. You can then reach out to us with your inquiry, and our team will promptly assist you.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">2. Can I make inquiries about multiple products?</h2>
            <p>
              Certainly! Feel free to inquire about multiple products. Ensure to include detailed information about each product of interest in your inquiry to help us assist you more efficiently.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">3. How do I track the availability of a product?</h2>
            <p>
              For real-time product availability, please use the inquiry form on the respective product page. Our team will provide you with the latest information and guide you through the inquiry process.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">4. What payment methods are accepted for inquiries?</h2>
            <p>
              We accept a variety of payment methods for inquiries, including credit/debit cards, PayPal, and bank transfers. The available options will be communicated to you during the inquiry process.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">5. How can I make changes to my inquiry?</h2>
            <p>
              To modify or cancel an inquiry, please get in touch with our dedicated customer support team at the earliest opportunity. Keep in mind that once an inquiry has progressed, certain changes may have limitations.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
