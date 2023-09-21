/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import '../styles/map.css';
//import useGeolocation from 'react-hook-geolocation';
import axios from 'axios';
import Bicycle from './bicycle';
import Search from './search';

const Map = (props) => {
  // const geolocation = useGeolocation();

  // const lat = geolocation.latitude;
  // const lng = geolocation.longitude;
  let lat = props.lat;
  let lng = props.lng;
  let url = props.url;

  const [newLat, setLat] = useState(lat);
  const [newLng, setLng] = useState(lng);
  const [newUrl, setUrl] = useState(url);

  const getLat = (value) => {
    setLat(value);
  };
  const getLng = (value) => {
    setLng(value);
  };
  const getUrl = (value) => {
    setUrl(value);
  };
  lat = newLat;
  lng = newLng;
  url = newUrl;

  const location = new naver.maps.LatLng(lat, lng);
  useEffect(() => {
    console.log('useEffect');
    const { naver } = window;
    if (!naver) return;

    const mapOptions = {
      center: location,
      zoom: 13,
    };
    const map = new naver.maps.Map('map', mapOptions);

    //마커
    let markers = [];
    let infoWindows = [];
    let axi;
    if (url === '/search') {
      axi = axios({
        method: 'get',
        url: url,
        params: {
          x: lng,
          y: lat,
        },
      });
    } else {
      axi = axios({
        method: 'get',
        url: url,
      });
    }
    axi
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          const parking = res.data;
          const position = new naver.maps.LatLng(parking[i].latitude, parking[i].longitude);
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
          infoWindows.push(infoWindow);
          markers.push(marker);
        }
      })
      .catch((error) => {
        console.log(error);
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
  }, [lat, lng]);

  return !props.error ? (
    <div id="map">
      <Search getLat={getLat} getLng={getLng} getUrl={getUrl} newLat={newLat} newLng={newLng} newUrl={newUrl} />
      <Bicycle />
    </div>
  ) : (
    <p>No geolocation, sorry.</p>
  );
};
export default Map;
