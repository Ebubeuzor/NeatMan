import React from "react";
import Hamburger from "../Components/Navigation/Hamburger";
import Header from "../Components/Navigation/Header";
import Footer from "../Components/Navigation/Footer";

export default function Services() {
  return (
    <div>
      <div className="md:w-[90%] md:mx-auto p-4">
        <div>
          <Hamburger />
          <Header />
        </div>
        <div className="my-16">
          <h1 className="text-3xl font-bold mb-14">Our Services</h1>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">1. Copper Export</h2>
            <p>
              We specialize in the export of high-grade copper, meeting the demands of industries worldwide. Our commitment to quality ensures that our copper products adhere to international standards.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">2. Lead Export</h2>
            <p>
              Exporting lead of various grades, we contribute to industries requiring this essential metal. Our lead products undergo strict quality control measures to meet the diverse needs of our clients.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">3. Lithium Export</h2>
            <p>
              Supplying lithium, a crucial component in modern technology, we cater to the growing demand for sustainable energy solutions. Our lithium products adhere to the highest quality standards.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">4. Spodumene Export</h2>
            <p>
              Exporting spodumene, a key source of lithium, we contribute to the renewable energy sector. Our commitment to responsible sourcing ensures sustainable and eco-friendly practices.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">5. Lepidolite Export</h2>
            <p>
              Specializing in the export of lepidolite, we provide a unique source of lithium. Our lepidolite products are carefully processed to meet the specific requirements of our clients.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">6. Hibiscus Export</h2>
            <p>
              Exporting high-quality hibiscus, we cater to the herbal tea and culinary industries. Our hibiscus products are carefully harvested and processed to preserve their natural flavors and benefits.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">7. Garlic Export</h2>
            <p>
              Supplying premium-grade garlic, we contribute to the culinary world. Our garlic products undergo rigorous quality checks to ensure freshness, flavor, and nutritional value.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">8. Ginger Export</h2>
            <p>
              Exporting high-quality ginger, we meet the demands of the global spice market. Our ginger products are sourced from reliable farms and processed to preserve their natural qualities.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">9. Processed Wood Export</h2>
            <p>
              Specializing in the export of processed wood, we provide sustainable and high-quality materials for various industries. Our processed wood products meet international standards for durability and eco-friendliness.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">10. Charcoal Export</h2>
            <p>
              Exporting premium-grade charcoal, we cater to various industries, including grilling and manufacturing. Our charcoal products are produced using sustainable practices, ensuring high quality and minimal environmental impact.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
