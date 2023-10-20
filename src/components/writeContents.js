import '../styles/writeContent.css';
import { useEffect } from 'react';
import ContentsModel from '../models/contentsModel';
import { useLocation } from 'react-router-dom';
function WriteContents() {
  const location = useLocation();
  const promise = { ...location.state };
  useEffect(() => {
    const inputTitle = document.getElementById('writeTitle');
    const inputContents = document.getElementById('writeContents');
    const writeForm = document.getElementById('writeForm');
    const boardSelect = document.getElementById('boardId');
    const option = document.querySelectorAll('option');
    for (let i = 0; i < option.length; i++) {
      if (Number(option[i].value) === promise.BOARD_ID) {
        option[i].selected = true;
      }
      if (Number(option[i].value) !== promise.BOARD_ID) {
        option[i].disabled = true;
      }
    }

    writeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const boardId = boardSelect.value;
      const title = inputTitle.value;
      const contents = inputContents.value;
      if (title === null || title === '' || title === undefined) {
        alert('제목을 작성해 주세요');
      }
      if (contents === null || contents === '' || contents === undefined) {
        alert('내용을 입력해 주세요');
      } else {
        const writerId = localStorage.getItem('userId');

        ContentsModel.post(title, contents, writerId, Number(boardId));
        window.location.replace('/community');
      }
    });
  }, [promise]);
  return (
    <div id="writeWraper">
      <h2 id="viewTitle">글 작성하기</h2>
      <form id="writeForm">
        <select id="boardId">
          <option value="none">게시판을 선택해 주세요</option>
          <option value="0">사건·사고 게시판</option>
          <option value="1">자유 게시판</option>
        </select>
        <input id="writeTitle" type="text" placeholder="제목을 입력해 주세요" />
        <textarea id="writeContents" type="text" placeholder="내용을 입력해 주세요" />
        <input type="submit" id="complete" value="작성 완료" />
      </form>
    </div>
  );
}
export default WriteContents;
