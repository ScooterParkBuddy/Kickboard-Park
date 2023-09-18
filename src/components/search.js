import '../styles/search.css';
import { useEffect } from 'react';

function Search() {
  useEffect(() => {
    const search = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchword');
    const list = document.querySelector('ul');
    search.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(searchInput.value);
      list.classList.remove('hidden');
    });
  }, []);
  return (
    <div id="searchArea">
      <form id="searchForm">
        <input id="searchword" type="text" maxLength={13} />
        <input type="submit" id="submitBtn" value="검색" />
      </form>
      <ul className="hidden">
        <li>
          <b>강남역</b>
          <p>서울 강남구 강남대로 396</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
        <li>
          <b>하나은행 삼성센터지점</b>
          <p>서울 서초구 서초대로74길 11 삼성전자 서초사옥 지하1층 B109호</p>
        </li>
      </ul>
    </div>
  );
}
export default Search;
