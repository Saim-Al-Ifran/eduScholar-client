import React from 'react'
import Banner from './sections/Banner'
import { Helmet } from "react-helmet";
import TopScholarship from './sections/TopScholarship';
import ContactUs from './sections/ContactUs';
import Review from './sections/Review';
 
const Home = () => {
  return (
    <>
    <Helmet>
        <title>Home</title>
    </Helmet>
      <Banner/>
      <TopScholarship/>
      <Review/>
 
      <ContactUs/>
    </>
  )
}

export default Home