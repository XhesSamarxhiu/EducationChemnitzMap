import axios from 'axios';
import { APIProvider, Map, InfoWindow, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useEffect, useState, useRef } from 'react';
import FilterSidebar from './FilterSidebar';
import { Button } from '@nextui-org/react';
import {FaStar} from 'react-icons/fa'; 

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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

interface MapComponentProps {
  onFavoriteMarkerChange: (marker: MarkerData) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onFavoriteMarkerChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [kindergartenMarkers, setKindergartenMarkers] = useState<MarkerData[]>([]);
  const [socialChildProjectMarkers, setSocialChildProjectMarkers] = useState<MarkerData[]>([]);
  const [socialTeenProjectMarkers, setSocialTeenProjectMarkers] = useState<MarkerData[]>([]);
  const [schoolMarkers, setSchoolMarkers] = useState<MarkerData[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 50.8357, lng: 12.9253 });
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [favoriteMarker, setFavoriteMarker] = useState<MarkerData | null>(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kindergartenResponse, schoolResponse, socialTeenResponse, socialChildResponse] = await Promise.all([
          axios.get('http://localhost:3000/kindergardens'),
          axios.get('http://localhost:3000/schools'),
          axios.get('http://localhost:3000/socialTeenProjects'),
          axios.get('http://localhost:3000/socialChildProjects'),
        ]);

        const mappedKindergartenMarkers = kindergartenResponse.data.map((item: any) => ({
          lat: item.Y,
          lng: item.X,
          BEZEICHNUNG: item.BEZEICHNUNG,
          ...item,
        }));
        setKindergartenMarkers(mappedKindergartenMarkers);

        const mappedSchoolMarkers = schoolResponse.data.map((item: any) => ({
          lat: item.Y,
          lng: item.X,
          BEZEICHNUNG: item.BEZEICHNUNG,
          ...item,
        }));
        setSchoolMarkers(mappedSchoolMarkers);

        const mappedSocialTeenMarkers = socialTeenResponse.data.map((item: any) => ({
          lat: item.Y,
          lng: item.X,
          BEZEICHNUNG: item.BEZEICHNUNG,
          ...item,
        }));
        setSocialTeenProjectMarkers(mappedSocialTeenMarkers);

        const mappedSocialChildMarkers = socialChildResponse.data.map((item: any) => ({
          lat: item.Y,
          lng: item.X,
          BEZEICHNUNG: item.BEZEICHNUNG,
          ...item,
        }));
        setSocialChildProjectMarkers(mappedSocialChildMarkers);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
    setFavoriteMarker(marker);
    onFavoriteMarkerChange(marker);
  };
  const handleFavoriteClick = (marker: MarkerData) => {
    onFavoriteMarkerChange(marker);
  };

  const renderMarkers = (markers: MarkerData[], pinProps: any) => {
    return markers
      .filter((marker) => {
        if (selectedFilters.includes('all')) return true;
        if (selectedFilters.includes('kindergarten') && marker.FILTER_CATEGORY.toLowerCase().includes('kindergarten')) return true;
        if (selectedFilters.includes('schools') && marker.FILTER_CATEGORY.toLowerCase().includes('school')) return true;
        if (selectedFilters.includes('social-teen-projects') && marker.FILTER_CATEGORY.toLowerCase().includes('teen_projects')) return true;
        if (selectedFilters.includes('social-child-projects') && marker.FILTER_CATEGORY.toLowerCase().includes('child_projects')) return true;
        return false;
      })
      .map((marker, index) => (
        <AdvancedMarker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => handleMarkerClick(marker)}
        >
          <Pin {...pinProps}></Pin>
        </AdvancedMarker>
      ));
  };

  return (
    <div className="flex h-[70vh]">
      <div className="w-64 bg-gray-100 p-4">
        <FilterSidebar onFilterChange={handleFilterChange} />
      </div>
      <div className="flex-1">
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
          <Map
            defaultZoom={13}
            defaultCenter={mapCenter}
            mapId='64f4a8e4ea039f39'
            style={{ height: '100%' }}
          >
            {renderMarkers(kindergartenMarkers, { background: "#228B22", borderColor: "#478778", glyphColor: "#C1E1C1" })}
            {renderMarkers(schoolMarkers, {})}
            {renderMarkers(socialChildProjectMarkers, { background: "#0047AB", borderColor: "#5F9EA0", glyphColor: "#00008B" })}
            {renderMarkers(socialTeenProjectMarkers, { background: "#5D3FD3", borderColor: "#CF9FFF", glyphColor: "#CBC3E3" })}

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
                  <FaStar
                    className="text-yellow-500 cursor-pointer"
                    onClick={() => handleFavoriteClick(selectedMarker)}
                  />
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