import '../styles/search.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const HIDDEN_CLASS = 'hidden';
function Search({ getLat, getLng, getUrl }) {
  const [loading, setLoading] = useState(false);

  let longitude;
  let latitude;
  const url = '/search';

  const propsFunc = (lat, lng) => {
    getLat(lat);
    getLng(lng);
    getUrl(url);
    console.log(lat, lng, url);
  };

  useEffect(() => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchword');
    const ul = document.querySelector('ul');
    const listArea = document.getElementById('listArea');
    const listInfo = document.getElementById('listInfo');
    const placeName = document.getElementById('placeName');
    const address = document.getElementById('address');
    const startBtn = document.getElementById('startBtn');
    const destinationBtn = document.getElementById('destinationBtn');
    const estimateArea = document.getElementById('estimateArea');
    const startForm = document.getElementById('startForm');
    const destinationForm = document.getElementById('destinationForm');
    const startInput = document.getElementById('startInput');
    const destinationInput = document.getElementById('destinationInput');
    const estimateBtn = document.getElementById('estimateBtn');
    const closeBtn = document.getElementById('closeBtn');
    const estimateResultArea = document.getElementById('estimateResultArea');
    const resultCloseBtn = document.getElementById('resultCloseBtn');
    const time = document.getElementById('time');
    const distance = document.getElementById('distance');
    const dayAvg = document.getElementById('dayAvg');

    // listArea.addEventListener('click', (e) => {
    //   handleClickArea();
    // });
    function convertMinutes(time) {
      if (time.indexOf('시간') != -1) {
        const first = time.split('시간');
        const htoM = Number(first[0]) * 60;
        const last = first[1].split('분');
        return htoM + Number(last[0]);
      } else {
        const result = time.split('분');
        return result[0];
      }
    }
    function dayCalculate(time) {
      return Math.round(Number(time) * 160.6 + 800.7);
    }
    closeBtn.addEventListener('click', () => {
      listArea.classList.add(HIDDEN_CLASS);
    });
    resultCloseBtn.addEventListener('click', () => {
      estimateResultArea.classList.add(HIDDEN_CLASS);
    });

    const estimateBtnClick = (estimateArea, startForm, destinationForm) => {
      estimateArea.classList.remove(HIDDEN_CLASS);
      searchForm.classList.add(HIDDEN_CLASS);
      listArea.classList.add(HIDDEN_CLASS);

      startForm.addEventListener('submit', (e) => {
        e.preventDefault();
        setEstimate(e, startForm.firstChild.value);
      });
      destinationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        setEstimate(e, destinationForm.firstChild.value);
      });
    };
    const keywordSearch = (value) => {
      axios({
        method: 'get',
        url: '/search/keyword',
        params: {
          keyword: `'${value}'`,
        },
      })
        .then((res) => {
          listArea.classList.remove(HIDDEN_CLASS);

          const result = res.data;
          placeName.innerText = result.placeName;
          address.innerText = result.address;
          latitude = result.lat;
          longitude = result.lng;

          listInfo.addEventListener('click', (e) => {
            propsFunc(latitude, longitude, url);
          });
        })
        .catch((error) => {
          alert('정확한 명칭을 입력해 주세요');
          console.log(error.response);
        });
    };

    const setEstimate = (e, value) => {
      e.preventDefault();
      keywordSearch(value);

      startBtn.addEventListener('click', () => {
        startInput.value = listInfo.firstChild.innerText;
        propsFunc(latitude, longitude, url);
        estimateBtnClick(estimateArea, startForm, destinationForm);
      });
      destinationBtn.addEventListener('click', () => {
        destinationInput.value = listInfo.firstChild.innerText;
        propsFunc(latitude, longitude, url);
        estimateBtnClick(estimateArea, startForm, destinationForm);
      });
      ul.classList.remove(HIDDEN_CLASS);
    };

    searchForm.addEventListener('submit', (e) => {
      setEstimate(e, searchInput.value);
    });

    estimateBtn.addEventListener('click', () => {
      if (startInput.value === destinationInput.value) {
        alert('출발지와 목적지가 같습니다.');
      } else {
        setLoading(true);
        axios({
          method: 'get',
          url: '/estimate',
          params: {
            start: startInput.value,
            destination: destinationInput.value,
          },
        })
          .then((res) => {
            time.innerText = res.data.time;
            distance.innerText = res.data.distance;
            const timeToMinutes = convertMinutes(res.data.time);
            const day = dayCalculate(timeToMinutes);
            dayAvg.innerText = `주간 평균: ${day.toLocaleString()}원`;
            setLoading(false);
            estimateResultArea.classList.remove(HIDDEN_CLASS);
          })
          .catch((e) => console.log(e));
      }
    });
  }, []);

  return (
    <>
      {loading ? <Loading /> : null}
      <div id="searchArea">
        <form id="searchForm">
          <input id="searchword" type="text" />
          <input type="submit" id="submitBtn" value="검색" />
        </form>
        <div id="estimateArea" className="hidden">
          <form id="startForm">
            <input id="startInput" type="text" className="estimateInput" placeholder="출발지를 입력하세요" />
            <input type="submit" className="hidden" />
          </form>
          <form id="destinationForm">
            <input id="destinationInput" type="text" className="estimateInput" placeholder="목적지를 입력하세요" />
            <input type="submit" value="" className="hidden" />
          </form>
          <button id="estimateBtn">소요 시간·금액 검색</button>
        </div>
        <div id="listArea" className="hidden">
          <ul>
            <li className="closeArea">
              <button id="closeBtn" />
            </li>
            <li id="listInfo">
              <b id="placeName" />
              <p id="address" />
            </li>
            <li className="btnArea">
              <button id="startBtn">출발</button>
              <button id="destinationBtn">도착</button>
            </li>
          </ul>
        </div>
        <div id="estimateResultArea" className="hidden">
          <ul>
            <li className="closeArea">
              <button id="resultCloseBtn" />
            </li>
            <li id="time" />
            <li id="distance" />
            <li id="dayAvg" className="avg" />
          </ul>
        </div>
      </div>
    </>
  );
}
export default Search;
