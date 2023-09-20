import '../styles/search.css';
import { useEffect } from 'react';

function Search(props) {
  // const lat = new Array();
  // const lng = new Array();

  const setLat = (num) => {
    props.getLat(num);
  };
  const setLng = (num) => {
    props.getLng(num);
  };
  useEffect(() => {
    const search = document.getElementById('searchForm');
    //const searchInput = document.getElementById('searchword');
    const ul = document.querySelector('ul');

    search.addEventListener('submit', (e) => {
      e.preventDefault();
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      const li = document.createElement('li');
      const b = document.createElement('b');
      const p = document.createElement('p');
      b.innerText = '서울역';
      p.innerText = '서울 강남구 강남대로 396';
      //   lat[i] = lat;
      //   lng[i] = lng;
      li.addEventListener('click', (e) => {
        setLat(37.5546788388674);
        setLng(126.970606927494);
        alert('click');
      });
      li.appendChild(b);
      li.appendChild(p);
      ul.appendChild(li);
      ul.classList.remove('hidden');
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
