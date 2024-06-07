// MapComponent.tsx
import axios from 'axios';
import { APIProvider, Map, InfoWindow, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useEffect, useState, useRef } from 'react';
import CategoryDropdown from './Categories';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapComponent = () => {
  interface MarkerData {
    lat: number;
    lng: number;
    BEZEICHNUNG: string;
    STRASSE?: string;
    PLZ?: string;
    ORT?: string;
    TELEFON?: string;
    EMAIL?: string;
    TRAEGER?: string;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [kindergartenMarkers, setKindergartenMarkers] = useState<MarkerData[]>([]);
  const [socialChildProjectMarkers, setSocialChildProjectMarkers] = useState<MarkerData[]>([]);
  const [socialTeenProjectMarkers, setSocialTeenProjectMarkers] = useState<MarkerData[]>([]);
  const [schoolMarkers, setSchoolMarkers] = useState<MarkerData[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 50.8357, lng: 12.9253 });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isOpen, setIsOpen] = useState(false);
  const mapContainerRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  

  useEffect(() => {
    const fetchKindergartens = async () => {
      try {
        const response = await axios.get('http://localhost:3000/kindergardens');
        if (Array.isArray(response.data)) {
          const mappedMarkers = response.data.map((item) => ({
            lat: item.Y,
            lng: item.X,
            BEZEICHNUNG: item.BEZEICHNUNG,
            ...item
          }));
          setKindergartenMarkers(mappedMarkers);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSchools = async () => {
      try {
        const response = await axios.get('http://localhost:3000/schools');
        if (Array.isArray(response.data)) {
          const mappedMarkers = response.data.map((item) => ({
            lat: item.Y,
            lng: item.X,
            BEZEICHNUNG: item.BEZEICHNUNG,
            ...item
          }));
          setSchoolMarkers(mappedMarkers);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSocialTeenProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/socialTeenProjects');
        if (Array.isArray(response.data)) {
          const mappedMarkers = response.data.map((item) => ({
            lat: item.Y,
            lng: item.X,
            BEZEICHNUNG: item.BEZEICHNUNG,
            ...item
          }));
          setSocialTeenProjectMarkers(mappedMarkers);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSocialChildProjects = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/socialChildProjects?_=${Date.now()}`);
        if (Array.isArray(response.data)) {
          const mappedMarkers = response.data.map((item) => ({
            lat: item.Y,
            lng: item.X,
            BEZEICHNUNG: item.BEZEICHNUNG,
            ...item
          }));
          setSocialChildProjectMarkers(mappedMarkers);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchools();
    fetchKindergartens();
    fetchSocialTeenProjects();
    fetchSocialChildProjects();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };


  const renderMarkers = (markers: MarkerData[], pinProps: any) => {
    return markers.map((marker, index) => (
      <AdvancedMarker
        key={index}
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick={() => setSelectedMarker(marker)}
      >
        <Pin {...pinProps}></Pin>
      </AdvancedMarker>
    ));
  };

 
  return (
    <div className="relative h-[70vh] w-full">
    <div className="mb-4 flex justify-center">
        <CategoryDropdown selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} isOpen={isOpen} toggleDropdown={toggleDropdown} />
      </div>
      <div className="h-full w-full ">
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
          <Map defaultZoom={13} defaultCenter={mapCenter} mapId='64f4a8e4ea039f39' style={{ height: '100%' }}>
            {(selectedCategory === 'all' || selectedCategory === 'kindergartens') && renderMarkers(kindergartenMarkers, { background: "#228B22", borderColor: "#478778", glyphColor: "#C1E1C1" })}
            {(selectedCategory === 'all' || selectedCategory === 'schools') && renderMarkers(schoolMarkers, {})}
            {(selectedCategory === 'all' || selectedCategory === 'socialChildProjects') && renderMarkers(socialChildProjectMarkers, { background: "#0047AB", borderColor: "#5F9EA0", glyphColor: "#00008B" })}
            {(selectedCategory === 'all' || selectedCategory === 'socialTeenProjects') && renderMarkers(socialTeenProjectMarkers, { background: "#5D3FD3", borderColor: "#CF9FFF", glyphColor: "#CBC3E3" })}

            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <h3>Description: {selectedMarker.BEZEICHNUNG}</h3>
                  <p>Coordinates: {selectedMarker.lat}, {selectedMarker.lng}</p>
                  <p>Address: {selectedMarker.STRASSE}, {selectedMarker.PLZ} {selectedMarker.ORT}</p>
                  <p>Phone: {selectedMarker.TELEFON}</p>
                  <p>Carrier: {selectedMarker.TRAEGER}</p>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};


export default MapComponent;