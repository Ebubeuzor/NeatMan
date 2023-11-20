import React from 'react'
import Header from '../Components/Navigation/Header'
import CategoryNavigation from '../Components/Navigation/CategoryNavigation'
import SliderComponent from '../SliderComponent'
import RandomItems from '../Components/RandomItems'
import FeaturedProducts from '../Components/FeaturedProducts'
import Hamburger from '../Components/Navigation/Hamburger'
import Footer from '../Components/Navigation/Footer'
export default function Home() {
  return (
    <div>
    <div className='md:w-[90%] md:mx-auto p-4'>
      <div>
          <Hamburger/>
      </div>
        <Header/>
        <div className="shopify-section mt-4">
          <div className="builder">
            <div className="inner">
              <div className="row flex  gap-2">
                <div className="navigation hidden lg:block md:w-1/5">
                  <CategoryNavigation />
                </div>
                <div className="hero-slider lg:w-10/12 w-full">
                    <SliderComponent/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RandomItems/>
        <FeaturedProducts/>

    </div>
        <Footer/>
    </div>
  )
}
