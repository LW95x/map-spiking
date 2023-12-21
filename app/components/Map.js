import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';

const mapContainer = {
  width: '90vw',
  height: '90vh'
};

function Map() {
  const [currentLocation, setCurrentLocation] = useState({lat: 51.50200406538629, lng: -0.1401473595779586})
  const [mapLoaded, setMapLoaded] = useState(false);
  const treasureLocation = { lat: 52.53586438136404, lng:-2.1914365598596186}
  const treasureRadius = 30;
  const [customIcon, setCustomIcon] = useState(null);
  const [customIcon2, setCustomIcon2] = useState(null);

  useEffect( () => {
      navigator.geolocation.getCurrentPosition( (position) => {
        setCurrentLocation( {
          lat: 52.53558686378447,
          lng: -2.191289864510902
        })
      })
    }, []);
    
  useEffect( () => {
    if (currentLocation && mapLoaded) {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
        new google.maps.LatLng(treasureLocation.lat, treasureLocation.lng)
      );
      
        if (distance <= treasureRadius) {
          console.log("Treasure found!");
        }
    }
  }, [currentLocation, mapLoaded])

  useEffect( () => {
    if (mapLoaded) {    
      setCustomIcon({
        url: '/pT7rLkkac.png',
        scaledSize: new window.google.maps.Size(50,50)
      })
  
      setCustomIcon2({
        url: '/1466301.png',
        scaledSize: new window.google.maps.Size(100,100)
      })
    }
  }, [mapLoaded])


  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={["geometry"]}
      onLoad={ () => setMapLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={mapContainer}
        center={currentLocation}
        zoom={10}
      >
        <Marker position={currentLocation} icon={customIcon2}/>
        <Marker position={{lat: 52.5347836302865, lng: -2.190541826966205}} icon={customIcon}/>
        <Circle center={{lat: 52.5347836302865, lng: -2.190541826966205}} radius={100}/>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;