import { useEffect } from 'react';
import ContentsModel from '../models/contentsModel';
import { useNavigate, useLocation } from 'react-router-dom';
function WriteContents() {
  const navigate = useNavigate();
  const location = useLocation();
  const promise = { ...location.state };
  useEffect(() => {
    const inputTitle = document.getElementById('title');
    const inputContents = document.getElementById('contents');
    const writeForm = document.getElementById('writeForm');
    const boardSelect = document.getElementById('boardId');
    const option = document.querySelectorAll('option');
    for (let i = 0; i < option.length; i++) {
      if (Number(option[i].value) === promise.BOARD_ID) {
        option[i].selected = true;
      }
    }

    writeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const boardId = boardSelect.value;
      const title = inputTitle.value;
      const contents = inputContents.value;

      ContentsModel.post(title, contents, 1, Number(boardId));

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
      <div>글 작성하기</div>
      <form id="writeForm">
        <select id="boardId">
          <option value="none">게시판을 선택해 주세요</option>
          <option value="0">사건·사고 게시판</option>
          <option value="1">자유 게시판</option>
        </select>
        <input id="title" type="text" placeholder="제목을 입력해 주세요" />
        <input id="contents" type="text" placeholder="내용을 입력해 주세요" />
        <input type="submit" value="작성 완료" />
      </form>
    </>
  );
}
export default WriteContents;
