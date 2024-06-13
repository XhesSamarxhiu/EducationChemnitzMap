import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MapComponent from '../components/MapComponent';
import { useState } from 'react';


interface MarkerData {
  lat: number;
  lng: number;
  BEZEICHNUNG: string;
  LEISTUNGEN: string;
  STRASSE?: string;
  PLZ?: string;
  ORT?: string;
  TELEFON?: string;
  EMAIL?: string;
  TRAEGER?: string;
  FILTER_CATEGORY: string;
  _id: string;
}


const Home = () => {
  const [favoriteMarker, setFavoriteMarker] = useState(null);

  const handleFavoriteMarkerChange = (marker: MarkerData) => {
    setFavoriteMarker(marker);
  };

  return (
    <div className="home min-h-screen flex flex-col">
      <Header />
      <main className="main-content flex-grow">
        <MapComponent onFavoriteMarkerChange={handleFavoriteMarkerChange} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;