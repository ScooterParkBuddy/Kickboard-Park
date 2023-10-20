/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import '../styles/map.css';
import axios from 'axios';
import Bicycle from './bicycle';
import Search from './search';
import AccidentTable from './accidentTable';

const Map = ({ lat, lng, url }) => {
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
  // lat = newLat;
  // lng = newLng;
  // url = newUrl;
  const location = new naver.maps.LatLng(newLat, newLng);
  useEffect(() => {
    const { naver } = window;
    if (!naver) return;

    const mapOptions = {
      center: location,
      zoom: 15,
    };
    const map = new naver.maps.Map('map', mapOptions);

    //사고다발구간 원, 위험도에 따른 색 구분 필요
    let circles = [];
    const color = ['gold', 'darkorange', 'tomato'];
    axios({
      method: 'get',
      url: '../dummy/accidentData.json',
    })
      .then((res) => {
        const data = res.data;
        for (let i = 0; i < data.length; i++) {
          const circle = new naver.maps.Circle({
            map: map,
            center: new naver.maps.LatLng(data[i].LAT, data[i].LNG),
            radius: 100,
            strokeWeight: 0.5,
            strokeOpacity: 0.2,
            strokeColor: 'black',
            fillColor: color[data[i].RISK - 1],
            fillOpacity: 0.3,
          });
          circles.push(circle);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });

    //주차공간 마커 search에서 값이 넘어올 시, 위치 변경, 반경 2km내의 주차공간만 표시
    // let markers = [];
    // let infoWindows = [];
    // let axi;
    // if (newUrl === '/search') {
    //   axios({
    //     method: 'get',
    //     url: newUrl,
    //     params: {
    //       x: lng,
    //       y: lat,
    //     },
    //   })
    //     .then((res) => {
    //       for (let i = 0; i < res.data.length; i++) {
    //         const parking = res.data;
    //         const position = new naver.maps.LatLng(parking[i].lat, parking[i].lng);
    //         const marker = new naver.maps.Marker({
    //           map: map,
    //           position: position,
    //           title: parking[i].address,
    //         });
    //         const infoWindow = new naver.maps.InfoWindow({
    //           content: `<div style="width:auto; text-align:center; font-size:75%; padding:10px;"><b>${parking[i].placeName}</b><br /><p>${parking[i].address}</p></div>`,
    //         });
    //         marker.addListener('click', () => {
    //           if (infoWindow.getMap()) {
    //             infoWindow.close();
    //           } else {
    //             infoWindow.open(map, marker);
    //           }
    //         });
    //         infoWindows.push(infoWindow);
    //         markers.push(marker);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error.response);
    //     });
    // } else {
    //   axios({
    //     method: 'get',
    //     url: url,
    //   })
    //     .then((res) => {
    //       for (let i = 0; i < res.data.length; i++) {
    //         const parking = res.data;
    //         const position = new naver.maps.LatLng(parking[i].latitude, parking[i].longitude);
    //         const marker = new naver.maps.Marker({
    //           map: map,
    //           position: position,
    //           title: parking[i].address,
    //         });
    //         const infoWindow = new naver.maps.InfoWindow({
    //           content: `<div style="width:auto; text-align:center; font-size:75%; padding:10px;"><b>${parking[i].placeName}</b><br /><p>${parking[i].address}</p></div>`,
    //         });
    //         marker.addListener('click', () => {
    //           if (infoWindow.getMap()) {
    //             infoWindow.close();
    //           } else {
    //             infoWindow.open(map, marker);
    //           }
    //         });
    //         infoWindows.push(infoWindow);
    //         markers.push(marker);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error.response);
    //     });
    // }

    // naver.maps.Event.addListener(map, 'idle', function () {
    //   updateMarkers(map, markers);
    // });

    // function updateMarkers(map, markers) {
    //   console.log('update');
    //   const mapBounds = map.getBounds();

    //   for (let i = 0; i < markers.length; i++) {
    //     const marker = markers[i];
    //     const position = marker.getPosition();
    //     if (mapBounds.hasLatLng(position)) {
    //       showMarker(map, marker);
    //     } else {
    //       hideMarker(map, marker);
    //     }
    //   }
    // }
    // function showMarker(map, marker) {
    //   if (marker.setMap()) return;
    //   marker.setMap(map);
    // }

    // function hideMarker(map, marker) {
    //   if (!marker.setMap()) return;
    //   marker.setMap(null);
    // }

    // //자전거도로 레이어
    // const bicycleLayer = new naver.maps.BicycleLayer();
    // const btn = document.getElementById('bicycle');

    // btn.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   if (bicycleLayer.getMap()) {
    //     bicycleLayer.setMap(null);
    //   } else {
    //     bicycleLayer.setMap(map);
    //   }
    // });

    // naver.maps.Event.addListener(map, 'bicycleLayer_changed', (bicycleLayer) => {
    //   if (bicycleLayer) {
    //     btn.classList.add('control-on');
    //     btn.classList.remove('control-off');
    //   } else {
    //     btn.classList.remove('control-on');
    //     btn.classList.add('control-off');
    //   }
    // });
  }, []);

  return (
    <div id="map">
      <Search getLat={getLat} getLng={getLng} getUrl={getUrl} newLat={newLat} newLng={newLng} newUrl={newUrl} />
      <Bicycle />
      <AccidentTable />
    </div>
  );
};
export default Map;
