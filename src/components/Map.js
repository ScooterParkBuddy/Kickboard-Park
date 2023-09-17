/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import '../styles/map.css';
import useGeolocation from 'react-hook-geolocation';
import axios from 'axios';
import Bicycle from './bicycle';

const Map = () => {
  const geolocation = useGeolocation();

  const lat = geolocation.latitude;
  const lng = geolocation.longitude;

  const location = new naver.maps.LatLng(37.5176412282367, 127.041673152472);

  useEffect(() => {
    console.log('useEffect');
    const { naver } = window;
    if (!naver) return;

    const mapOptions = {
      center: location,
      zoom: 15,
    };
    const map = new naver.maps.Map('map', mapOptions);

    //마커
    let markers = [];
    let infoWindows = [];
    axios.get('/dummy/parkingData.json').then((res) => {
      for (let i = 0; i < res.data.park.length; i++) {
        const parking = res.data.park;
        const position = new naver.maps.LatLng(parking[i].lat, parking[i].lng);
        const marker = new naver.maps.Marker({
          map: map,
          position: position,
          title: parking[i].address,
        });
        const infoWindow = new naver.maps.InfoWindow({
          content: `<div style="width:auto; text-align:center; font-size:75%; padding:10px;"><b>${parking[i].placeName}</b><br /><p>${parking[i].address}</p></div>`,
        });
        marker.addListener('click', () => {
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);
          }
        });
        markers.push(marker);
        infoWindows.push(infoWindow);
      }
    });

    naver.maps.Event.addListener(map, 'idle', function () {
      updateMarkers(map, markers);
    });

    function updateMarkers(map, markers) {
      console.log('update');
      const mapBounds = map.getBounds();

      for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        const position = marker.getPosition();
        if (mapBounds.hasLatLng(position)) {
          showMarker(map, marker);
        } else {
          hideMarker(map, marker);
        }
      }
    }
    function showMarker(map, marker) {
      console.log(marker);
      if (marker.setMap()) return;
      marker.setMap(map);
    }

    function hideMarker(map, marker) {
      if (!marker.setMap()) return;
      marker.setMap(null);
    }

    //자전거도로 레이어
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
        btn.classList.remove('control-off');
      } else {
        btn.classList.remove('control-on');
        btn.classList.add('control-off');
      }
    });
  }, []);

  return !geolocation.error ? (
    <div id="map">
      <Bicycle />
    </div>
  ) : (
    <p>No geolocation, sorry.</p>
  );
};
export default Map;
