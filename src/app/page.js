"use strict";
"use client";
import { useRef, useCallback, useState, useEffect } from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Layout from "../components/Layout";
import CitySelector from "../components/ControlPanel";
import CityDetails from "../components/CityDetails";
import CITIES from "../../public/data/cities.json";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function HomePage() {
  const mapRef = useRef(null);
  const [currentCity, setCurrentCity] = useState(null); // Start with no city selected

  const onSelectCity = useCallback((selectedCity) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedCity.longitude, selectedCity.latitude],
        duration: 2000,
      });
    }
    setCurrentCity(selectedCity); // Update selected city
  }, []);

  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      console.error("Mapbox token is missing");
    }
  }, []);

  return (
    <Layout>
      <div className="flex flex-col h-screen relative">
        {/* City Selector */}
        <CitySelector onSelectCity={onSelectCity} />

        {/* Map */}
        <div className="flex-grow">
          <Map
            ref={mapRef}
            initialViewState={{
              latitude: CITIES[0].latitude,
              longitude: CITIES[0].longitude,
              zoom: 11,
              bearing: 0,
              pitch: 0,
            }}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            className="w-full h-full"
          />
        </div>

        <CityDetails city={currentCity} />
      </div>
    </Layout>
  );
}
