/* eslint-disable no-undef */
import React, { useEffect, useRef } from 'react';
import useGeolocation from 'react-hook-geolocation';

const Map = function () {
  const geolocation = useGeolocation();

  const lat = geolocation.latitude;
  const lng = geolocation.longitude;
  const location = new naver.maps.LatLng(lat, lng);

  const mapElement = useRef(null);

  useEffect(() => {
    // let vh = 0;
    // vh = window.innerHeight * 0.01;
    // document.documentElement.style.setProperty('--vh', `${vh}px`);

    const { naver } = window;
    if (!mapElement.current || !naver) return;

    let mapOptions = {
      center: location,
      zoom: 20,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: naver.maps.MapTypeControlStyle.DROPDOWN,
      },
    };
    const map = new naver.maps.Map('map', mapOptions);
  }, [location]);
  return !geolocation.error ? (
    <div
      id="map"
      style={{
        flex: 0.8,
        height: 1200,
      }}
    >
      <div ref={mapElement}></div>
      <button id="bicycle" style={{ zIndex: 10 }}>
        자전거 도로
      </button>
    </div>
  ) : (
    <p>No geolocation, sorry.</p>
  );
};
export default Map;
