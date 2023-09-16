/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
import React, { useEffect, createContext } from 'react';
import '../styles/map.css';
import useGeolocation from 'react-hook-geolocation';
import axios from 'axios';

export const MapContext = createContext();
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
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: naver.maps.MapTypeControlStyle.DROPDOWN,
      },
    };
    const map = new naver.maps.Map('map', mapOptions);

    //마커
    let markers = [];
    let infoWindows = [];
    //const getParkingInfoList = () => {
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
    //};
    //getParkingInfoList();

    naver.maps.Event.addListener(map, 'idle', function () {
      updateMarkers(map, markers);
    });
    naver.maps.Event.addListener(map, 'zoom_changed', function () {
      updateMarkers(map, markers);
    });

    naver.maps.Event.addListener(map, 'dragend', function () {
      updateMarkers(map, markers);
    });

    function updateMarkers(map, markers) {
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
    function getClickHandler(seq) {
      return function (e) {
        console.log('marker click', seq);
        const marker = markers[seq];
        const infoWindow = infoWindows[seq];
        if (infoWindow.getMap()) {
          console.log('닫아라');
          infoWindow.close();
        } else {
          console.log('열어라');
          infoWindow.open(map, marker);
        }
      };
    }
    // const bound = document.getElementById('map');
    // bound.addEventListener('click', () => {
    //   console.log('click');
    //   for (let i = 0, ii = markers.length; i < ii; i++) {
    //     naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
    //   }
    // });

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
      } else {
        btn.classList.remove('control-on');
      }
    });
  }, []);

  return !geolocation.error ? (
    <div id="map">
      <button id="bicycle" style={{ position: 'absolute', zIndex: 100, margin: 10, borderRadius: 10 }}>
        자전거 도로
      </button>
    </div>
  ) : (
    <p>No geolocation, sorry.</p>
  );
};
export default Map;
