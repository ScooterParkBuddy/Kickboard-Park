import { useEffect } from 'react';
import ContentsModel from '../models/contentsModel';
import { useNavigate, useLocation } from 'react-router-dom';

function UpdateContents() {
  const navigate = useNavigate();
  const location = useLocation();
  const prop = { ...location.state };

  useEffect(() => {
    const inputTitle = document.getElementById('title');
    const inputContents = document.getElementById('contents');
    const writeForm = document.getElementById('writeForm');
    const boardSelect = document.getElementById('boardId');
    const option = document.querySelectorAll('option');
    for (let i = 0; i < option.length; i++) {
      if (Number(option[i].value) === prop.boardId) {
        option[i].selected = true;
      }
    }

    inputTitle.value = prop.title;
    inputContents.value = prop.contents;
    writeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const boardId = boardSelect.value;
      const title = inputTitle.value;
      const contents = inputContents.value;
      const userId = localStorage.getItem('userId');
      ContentsModel.update(title, contents, userId, Number(boardId), prop.postId);
      if (Number(boardId) === 0) {
        navigate('/community/accident');
      }
      if (Number(boardId) === 1) {
        navigate('/community/general');
      }
    });
  }, []);
  return (
    <>
      <div style={{ height: 100 }} />
      <div>글 수정하기</div>
      <form id="writeForm">
        <select id="boardId">
          <option value="none">게시판을 선택해 주세요</option>
          <option value="0">사건·사고 게시판</option>
          <option value="1">자유 게시판</option>
        </select>
        <input id="title" type="text" placeholder="제목을 입력해 주세요" />
        <input id="contents" type="text" placeholder="내용을 입력해 주세요" />
        <input type="submit" value="수정" />
      </form>
    </>
  );
}
export default UpdateContents;
