// @ts-nocheck 
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = "pk.eyJ1IjoiYXNpeWFhc2hhIiwiYSI6ImNseWtsMmh1YjB6NmkybHNhc2VtNW8ybXAifQ.5dm-jS9jkx0hs_WFdw8rgw";

// Add your Mapbox access token here
mapboxgl.accessToken = MAPBOX_TOKEN;

export const MapComponent = ({ long, lat, zoom }) => {
    const mapContainerRef = useRef(null);

    // Define an array of marker objects with latitude, longitude, and description
    const markers = [
        { id: 1, longitude: long, latitude: lat, description: 'Asha' },
        { id: 2, longitude: -74.006, latitude: 40.7128, description: 'John' },
        { id: 3, longitude: -0.1276, latitude: 51.5074, description: 'Otto' },
    ];

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef?.current,
            style: 'mapbox://styles/mapbox/streets-v11', // Map style
            center: [markers[0].longitude, markers[0].latitude], // Initial map center
            zoom: 2, // Initial zoom level
        });

        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add markers to map
        markers.forEach((marker) => {
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(marker.description);

            new mapboxgl.Marker()
                .setLngLat([marker.longitude, marker.latitude])
                .setPopup(popup)
                .addTo(map);
        });

        // Clean up on unmount
        return () => map.remove();
    }, []);

    return <div ref={mapContainerRef} style={{ height: '100vh', width: '100%' }} />;
};

export default MapComponent;