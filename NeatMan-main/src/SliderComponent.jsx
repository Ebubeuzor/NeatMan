import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import axiosClient from "../axoisClient";

const divStyle = {
  height: "48vh", // Set the height to 100% of the viewport height
  display: "flex",
  alignItems: "center",
  // justifyContent: "center",
  backgroundSize: "cover",
  paddingLeft:"40px",
};

const Slideshow = () => {
  
  const [homepageData, setHomepageData] = useState("");
  
  useEffect(() => {
    axiosClient.get('/homepage')
    .then(({data}) => {
      console.log(data);
      data.data.map((d) => (
        setHomepageData(d)
      ))
  
    })
  }, []);
  
  const slideImages = [
    
    {
      url: homepageData.Section1Image,
      caption: (
        <div className="text-white ml-4">
          <h2 className="text-xl my-1 md:text-3xl">{homepageData.title1}</h2>
         <div>
         <p className="text-xl">{homepageData.Subtext1}</p>
         </div>
         <div className="mt-10">
         <a href="#shop-now" className="shop-button bg-green-800  p-4 ">
            SHOP NOW
          </a>
         </div>
        </div>
      ),
    },

    {
      url: homepageData.Section2Image,
      caption: (
        <div className="text-white ml-4">
          <h2 className="text-xl my-1 md:text-3xl">{homepageData.title2}</h2>
         <div>
         <p className="text-xl">{homepageData.Subtext2}</p>
         </div>
         <div className="mt-10">
         <a href="#shop-now" className="shop-button bg-green-800  p-4 ">
            SHOP NOW
          </a>
         </div>
        </div>
      ),
    },
  ];
  

  return (
    <div className="slide-container">
      <Slide images={slideImages.map((slideImage) => slideImage.url)}>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            >
              {slideImage.caption}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
