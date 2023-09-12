/* eslint-disable no-undef */
import React, { useEffect, useRef } from 'react';
import '../styles/map.css';
import useGeolocation from 'react-hook-geolocation';

const Map = function () {
  const geolocation = useGeolocation();

  const lat = geolocation.latitude;
  const lng = geolocation.longitude;
  const location = new naver.maps.LatLng(lat, lng);

  const mapElement = useRef(null);

  useEffect(() => {
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
    const bicycleLayer = new naver.maps.BicycleLayer();

    const btn = document.getElementById('bicycle');

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bicycleLayer.getMap()) {
        bicycleLayer.setMap(null);
      } else {
        bicycleLayer.setMap(map);
      }
    });

    naver.maps.Event.addListener(map, 'bicycleLayer_changed', (bicycleLayer) => {
      if (bicycleLayer) {
        btn.classList.add('control-on');
      } else {
        btn.classList.remove('control-on');
      }
    });
  }, [location]);

  return !geolocation.error ? (
    <div id="map">
      <div ref={mapElement}></div>
      <button id="bicycle" style={{ position: 'absolute', zIndex: 100, margin: 10 }}>
        자전거 도로
      </button>
    </div>
  ) : (
    <p>No geolocation, sorry.</p>
  );
};
export default Map;
