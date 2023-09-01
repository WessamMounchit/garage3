import React from 'react'
import ServicesSection from '../components/UI/ServicesSection';
import AboutSection from '../components/UI/AboutSection';
import TestimonialSection from '../components/UI/TestimonialSection';
import HeroSlider from '../components/UI/HeroSlider';
import FormContact from '../components/UI/FormContact';
import CarsHome from '../components/UI/CarsHome';


const Home = () => {
  return (
    <>
      <section className="p-0 hero__slider-section">
        <HeroSlider />
      </section>
      <ServicesSection />
      <CarsHome />
      <TestimonialSection />
      <AboutSection />
      <FormContact />
    </>
  )
}

export default Home