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

  const location = new naver.maps.LatLng(lat, lng);

  useEffect(() => {
    const { naver } = window;
    if (!naver) return;

    const mapOptions = {
      center: location,
      zoom: 20,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: naver.maps.MapTypeControlStyle.DROPDOWN,
      },
    };
    const map = new naver.maps.Map('map', mapOptions);

    //마커
    const markers = [];
    const getParkingInfoList = () => {
      axios.get('/dummy/parkingData.json').then((res) => {
        for (let i = 0; i < res.data.park.length; i++) {
          const parking = res.data.park;
          const position = new naver.maps.LatLng(parking[i].lat, parking[i].lng);
          const marker = new naver.maps.Marker({
            map: map,
            position: position,
            title: parking[i].address,
          });
          markers.push(marker);
        }
      });
    };
    console.log('markers', markers);
    getParkingInfoList();
    // const marker = new naver.maps.Marker({
    //   position: location,
    //   map: map,
    // });
    // const infoWindow = new naver.maps.InfoWindow({
    //   content: `<box style="width:400px; text-align:center; padding:10px;">내 위치</box>`,
    // });
    // infoWindow.open(map, marker);

    updateMarkers(map, markers);
    naver.maps.Event.addListener(map, 'zoom_changed', function () {
      updateMarkers(map, markers);
    });

    naver.maps.Event.addListener(map, 'dragend', function () {
      updateMarkers(map, markers);
    });
    function updateMarkers(map, markers) {
      console.log('update');
      const mapBounds = map.getBounds();

      for (var i = 0; i < markers.length; i++) {
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
      if (marker.getMap()) return;
      marker.setMap(map);
    }

    function hideMarker(map, marker) {
      if (!marker.getMap()) return;
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
      } else {
        btn.classList.remove('control-on');
      }
    });
  }, [location]);

  return !geolocation.error ? (
    <div id="map">
      <button id="bicycle" style={{ position: 'absolute', zIndex: 100, margin: 10 }}>
        자전거 도로
      </button>
    </div>
  ) : (
    <p>No geolocation, sorry.</p>
  );
};
export default Map;
