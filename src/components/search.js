import '../styles/search.css';
import { useEffect } from 'react';
import axios from 'axios';

function Search(props) {
  // const lat = new Array();
  // const lng = new Array();

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
    const search = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchword');
    const ul = document.querySelector('ul');

    search.addEventListener('submit', (e) => {
      e.preventDefault();
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      console.log(searchInput.value);
      axios({
        method: 'get',
        url: 'search/keyword',
        params: {
          keyword: `'${searchInput.value}'`,
        },
      })
        .then((res) => {
          const result = res.data;
          const li = document.createElement('li');
          const b = document.createElement('b');
          const p = document.createElement('p');
          const lat = document.createElement('p');
          const lng = document.createElement('p');
          // for (let i = 0; i < result.length; i++) {
          b.innerText = result.placeName;
          p.innerText = result.address;
          lat.innerText = result.lat;
          lng.innerText = result.lng;
          lat.className = 'hidden';
          lng.className = 'hidden';
          //}
          li.addEventListener('click', (e) => {
            setLat(lat.innerText);
            setLng(lng.innerText);
            setUrl(url);
          });
          li.appendChild(b);
          li.appendChild(p);
          li.appendChild(lat);
          li.appendChild(lng);
          ul.appendChild(li);
          ul.classList.remove('hidden');
        })
        .catch((error) => {
          alert(error);
        });
    });
  }, []);
  return (
    <div id="searchArea">
      <form id="searchForm">
        <input id="searchword" type="text" />
        <input type="submit" id="submitBtn" value="검색" />
      </form>
      <ul className="hidden"></ul>
    </div>
  );
}
export default Search;
