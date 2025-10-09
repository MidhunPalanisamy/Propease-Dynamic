import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './CSS/Map.css';
import Button from './Button';
import L from 'leaflet';
import icon from '../Assets/marker.png';
import Shadow from 'leaflet/dist/images/marker-shadow.png';
import MainNavBar from "./MainNavBar";
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon,
  shadowUrl: Shadow,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -50],
  shadowSize: [60, 50],
});

const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const Map = () => {
  const defaultCenter = [20.5937, 78.9629]; // India coordinates or default center
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/allProperty")
      .then(res => {
        setLocations(res.data);
      })
      .catch(err => console.error("Failed to load properties", err));
  }, []);

  const handleSearch = () => {
    const found = locations.find(loc =>
      loc.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (found) {
      setMapCenter([found.latitude, found.longitude]);
    } else {
      alert("Location not found");
    }
  };

  return (
    <div>
      <MainNavBar />
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='search' onClick={handleSearch}><Button text='Search' /></button>
      </div>

      <MapContainer className="Map-Cont" center={mapCenter} zoom={5}>
        <ChangeMapCenter center={mapCenter} />
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map(loc => (
          <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
            <Popup>{loc.address}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
