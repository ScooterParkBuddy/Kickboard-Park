import '../styles/forum.css';
import ContentsModel from '../models/contentsModel';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import convertDateToString from '../utils/hooks/convertDateToString';
import moment from 'moment';

const BOARD_ID = 0;

function AccidentForum() {
  const navigate = useNavigate();
  const navigateToWrite = () => {
    navigate('/community/write', {
      state: {
        BOARD_ID: BOARD_ID,
      },
    });
  };

  useEffect(() => {
    const writeBtn = document.getElementById('writeBtn');

    writeBtn.addEventListener('click', () => {
      navigateToWrite();
    });
    const list = document.getElementById('list');
    while (list.firstChild) {
      console.log('삭제');
      list.removeChild(list.firstChild);
    }
    const getData = () => {
      console.log('getData');
      const promise = ContentsModel.gets(BOARD_ID);
      promise.then((data) => {
        for (let i = data.length - 1; i >= 0; i--) {
          const time = convertDateToString(data[i].updatedAt ? data[i].updatedAt : data[i].createdAt);
          const dl = document.createElement('dl');
          const dt = document.createElement('dt');
          const dd = document.createElement('dd');
          const info = document.createElement('dd');
          const hr = document.createElement('hr');
          const div = document.createElement('div');

          dt.innerText = data[i].title;
          dd.id = 'sumContent';
          dd.innerText = data[i].contents;
          div.innerText = `${time}`;
          div.id = 'info';
          info.id = 'infoArea';

          //글 클릭 이벤트
          dl.addEventListener('click', async () => {
            const newInfo = ContentsModel.get(data[i].id);
            if (newInfo !== undefined || newInfo !== null) {
              newInfo.then((data) => {
                const createdAt = moment(data.createdAt, moment.ISO_8601)
                  .add(9, 'h')
                  .format('YYYY-MM-DD HH:mm')
                  .toString();
                const updatedAt =
                  data.updatedAt !== data.createdAt && data.updatedAt
                    ? moment(data.updatedAt, moment.ISO_8601).add(9, 'h').format('YYYY-MM-DD HH:mm')
                    : null;
                console.log('time', createdAt, updatedAt);
                navigate(`/community/view/${data.id}`, {
                  state: {
                    id: data.id,
                    title: data.title,
                    contents: data.contents,
                    writerId: data.writerId,
                    boardId: data.boardId,
                    createdAt: createdAt,
                    updatedAt: updatedAt,
                    comments: data.comments,
                  },
                });
              });
            }
          });
          info.appendChild(div);
          dl.appendChild(dt);
          dl.appendChild(dd);
          dl.appendChild(info);
          list.appendChild(dl);
          list.appendChild(hr);
        }
      });
    };
    getData();
  }, []);

  return (
    <div id="forumWrapper">
      <h1 id="boardname">사건·사고 게시판</h1>
      <button type="button" id="writeBtn">
        글쓰기
      </button>
      <div id="list" />
    </div>
  );
}
export default AccidentForum;
