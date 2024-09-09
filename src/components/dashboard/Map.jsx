import React from "react";
import "./Map-styling.css";
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const Map = () => {
  return (
    <div className="map">
      <h2>Mining Sites Map</h2>
      {/* Example for react-leaflet */}
      {/* <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[51.505, -0.09]} />
      </MapContainer> */}
      <div className="map-placeholder">Interactive Map Goes Here</div>
    </div>
  );
};

export default Map;
