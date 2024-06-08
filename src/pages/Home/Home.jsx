import React from 'react'
import Banner from './sections/Banner'
import { Helmet } from "react-helmet";
import TopScholarship from './sections/TopScholarship';
const Home = () => {
  return (
    <>
    <Helmet>
        <title>Home</title>
    </Helmet>
      <Banner/>
      <TopScholarship/>
    </>
  )
}

export default Home