import '../styles/search.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './loading';

const HIDDEN_CLASS = 'hidden';
function Search(props) {
  // const lat = new Array();
  // const lng = new Array();
  const [loading, setLoading] = useState(false);

  const setLat = (num) => {
    props.getLat(num);
  };
  const setLng = (num) => {
    props.getLng(num);
  };
  const setUrl = (num) => {
    props.getUrl(num);
  };
  const url = '/search';
  useEffect(() => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchword');
    const ul = document.querySelector('ul');
    const listArea = document.getElementById('listArea');
    function removeList() {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
    }
    function estimateBtnClick(estimateArea, startForm, destinationForm) {
      estimateArea.classList.remove(HIDDEN_CLASS);
      searchForm.classList.add(HIDDEN_CLASS);
      listArea.classList.add(HIDDEN_CLASS);

      startForm.addEventListener('submit', (e) => {
        e.preventDefault();
        keywordSearch(startForm.firstChild.value);
      });
      destinationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        keywordSearch(destinationForm.firstChild.value);
      });
    }
    function keywordSearch(value) {
      removeList();
      axios({
        method: 'get',
        url: 'search/keyword',
        params: {
          keyword: `'${value}'`,
        },
      }).then((res) => {
        console.log('res', res);
        const result = res.data;
        const li = document.createElement('li');
        const placeName = document.createElement('b');
        const address = document.createElement('p');
        const lat = document.createElement('p');
        const lng = document.createElement('p');

        placeName.innerText = result.placeName;
        address.innerText = result.address;
        lat.innerText = result.lat;
        lng.innerText = result.lng;
        lat.className = HIDDEN_CLASS;
        lng.className = HIDDEN_CLASS;

        li.addEventListener('click', (e) => {
          setLat(lat.innerText);
          setLng(lng.innerText);
          setUrl(url);
          listArea.classList.add(HIDDEN_CLASS);
          removeList();
        });
        li.id = 'listInfo';
        li.appendChild(placeName);
        li.appendChild(address);
        li.appendChild(lat);
        li.appendChild(lng);
        ul.appendChild(li);
        listArea.classList.remove(HIDDEN_CLASS);
      });
    }

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      keywordSearch(searchInput.value);
      const btnArea = document.createElement('li');

      btnArea.className = 'btnArea';
      btnArea.innerHTML = '<button id="startBtn" >출발</button><button id="destinationBtn" >도착</button>';
      ul.appendChild(btnArea);

      const estimateArea = document.getElementById('estimateArea');
      const startBtn = document.getElementById('startBtn');
      const destinationBtn = document.getElementById('destinationBtn');
      const startForm = document.getElementById('startForm');
      const destinationForm = document.getElementById('destinationForm');
      const startInput = document.getElementById('startInput');
      const destinationInput = document.getElementById('destinationInput');
      const estimateBtn = document.getElementById('estimateBtn');
      estimateBtn.addEventListener('click', () => {
        setLoading(true);
        axios({
          method: 'get',
          url: '/estimate',
          params: {
            start: startInput.value,
            destination: destinationInput.value,
          },
        }).then((res) => {
          setLoading(false);
          console.log(res.data);
        });
      });

      startBtn.addEventListener('click', () => {
        const info = document.getElementById('listInfo');
        startInput.value = info.firstChild.innerText;
        estimateBtnClick(estimateArea, startForm, destinationForm);
      });
      destinationBtn.addEventListener('click', () => {
        const info = document.getElementById('listInfo');
        destinationInput.value = info.firstChild.innerText;
        estimateBtnClick(estimateArea, startForm, destinationForm);
      });

      ul.classList.remove(HIDDEN_CLASS);
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
            <input id="startInput" type="text" />
            <input type="submit" className="hidden" />
          </form>
          <form id="destinationForm">
            <input id="destinationInput" type="text" />
            <input type="submit" value="" className="hidden" />
          </form>
          <button id="estimateBtn">소요 시간·금액 검색</button>
        </div>
        <div id="listArea" className="hidden">
          <ul></ul>
        </div>
      </div>
    </>
  );
}
export default Search;
