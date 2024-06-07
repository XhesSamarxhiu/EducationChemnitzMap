import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MapComponent from '../components/MapComponent';

const Home = () => (

  <div className="home min-h-screen flex flex-col">
    <Header />
    <main className="main-content flex-grow">
      <MapComponent />
    </main>
    <Footer />
  </div>
);

export default Home;