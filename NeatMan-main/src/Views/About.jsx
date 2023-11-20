import React from "react";
import Hamburger from "../Components/Navigation/Hamburger";
import Header from "../Components/Navigation/Header";
import Footer from "../Components/Navigation/Footer";

export default function About() {
  return (
    <div>
      <div className="md:w-[90%] md:mx-auto p-4">
        <div>
          <Hamburger />
          <Header />
        </div>
        <div className=" my-20">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p>
            Welcome to Neatman, your trusted source for high-quality mineral resources. We specialize in providing a wide range of minerals, including but not limited to iron ore, gold, and more. Our commitment is to deliver top-notch products to meet the diverse needs of industries worldwide.
          </p>
          <p>
            At Neatman, we take pride in our extensive experience in the mining industry. With a team of dedicated professionals and state-of-the-art facilities, we ensure the extraction and processing of minerals adhere to the highest standards of quality and environmental responsibility.
          </p>
          <h2 className="text-xl font-bold mt-4 mb-2">Our Products</h2>
          <p>
            Embark on a journey of unparalleled quality and diversity as we present our extensive range of solid mineral stones and diverse commodities, meticulously curated for global export. From the robust elegance of copper and the essential versatility of lead to the cutting-edge applications of lithium, spodumene, and lepidolite in various grades and types, our offerings are a testament to precision, reliability, and sustainability.

            Dive into the world of minerals with us, where each product is carefully sourced and processed to not only meet but exceed the exacting standards of international markets. But our commitment doesn't stop there; we extend our export portfolio to include a rich array of commodities, from the vibrant and aromatic Hibiscus to the culinary essentials of garlic and ginger. Further, our dedication to sustainability is showcased in the export of processed wood and premium-grade charcoal, products that echo our responsibility towards the environment.

            At NeatMan, we don't just export minerals and commodities; we export a legacy of quality, integrity, and a promise to deliver the best of nature to industries worldwide. Explore the richness of our offerings and experience the unparalleled excellence that defines us.
          </p>
          <h2 className="text-xl font-bold mt-4 mb-2">Product Inquiries</h2>
          <p>
            We understand the importance of accurate information when making decisions about mineral resources. If you have inquiries about our products, such as pricing, weight, or any other specifications, feel free to reach out to our dedicated customer support team. We are here to provide you with the information you need to make informed choices for your business.
          </p>
          <p>
            Neatman is committed to transparency and customer satisfaction. We believe in fostering long-term relationships with our clients, built on trust and reliability.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
