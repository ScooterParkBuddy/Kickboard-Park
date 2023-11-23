import { useEffect } from 'react';
import ContentsModel from '../models/contentsModel';
import { useLocation } from 'react-router-dom';
import '../styles/writeContent.css';
function UpdatePost() {
  const location = useLocation();
  const prop = { ...location.state };
  useEffect(() => {
    const inputTitle = document.getElementById('writeTitle');
    const inputContents = document.getElementById('writeContents');
    const writeForm = document.getElementById('writeForm');
    const boardSelect = document.getElementById('boardId');
    const option = document.querySelectorAll('option');
    for (let i = 0; i < option.length; i++) {
      if (Number(option[i].value) === prop.post.boardId) {
        option[i].selected = true;
      }
      if (Number(option[i].value) !== prop.post.boardId) {
        option[i].disabled = true;
      }
    }

    inputTitle.value = prop.post.title;
    inputContents.value = prop.post.contents;
    writeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const boardId = boardSelect.value;
      const title = inputTitle.value;
      const contents = inputContents.value;
      const userId = localStorage.getItem('userId');
      ContentsModel.update(title, contents, userId, Number(boardId), prop.post.id);
      window.location.replace('/community');
    });
  }, []);
  return (
    <div id="writeWraper">
      <h2 id="viewTitle">글 수정하기</h2>
      <form id="writeForm">
        <select id="boardId">
          <option value="none">게시판을 선택해 주세요</option>
          <option value="0">사건·사고 게시판</option>
          <option value="1">자유 게시판</option>
        </select>
        <input id="writeTitle" type="text" placeholder="제목을 입력해 주세요" />
        <br />
        <textarea id="writeContents" type="text" placeholder="내용을 입력해 주세요" />
        <input type="submit" id="complete" value="수정" />
      </form>
    </div>
  );
}
export default UpdatePost;
