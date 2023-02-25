import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGF5ZGFyeWxkcm0iLCJhIjoiY2xland2bWJiMGZyejQ0cXNsc2hjaGRhZSJ9.SXlWTSp3NcGvWnPtaqEbGw';

function Map() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    if (mapRef.current) return; // initialize map only once
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    // Create a Marker and add it to the map
    markerRef.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(mapRef.current);
  });

  useEffect(() => {
    // When component unmounts, remove the marker and map
    return () => {
      markerRef.current.remove();
      mapRef.current.remove();
    };
  }, []);

  const handleMapClick = (e) => {
    // Move the marker to the clicked location
    markerRef.current.setLngLat(e.lngLat);
   
    console.log(e.lngLat.lat);
    console.log(e.lngLat.lng);
  };

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.on('click', handleMapClick);

    return () => {
      mapRef.current.off('click', handleMapClick);
    };
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
}

export default Map;
