import '../styles/forum.css';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ContentsModel from '../models/contentsModel';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useIsFocused } from '../utils/hooks/use-is-focused';
import convertDateToString from '../utils/hooks/convertDateToString';
import moment from 'moment';

const BOARD_ID = 1;

function GeneralForum() {
  const isFocused = useIsFocused();

  const navigate = useNavigate();
  const navigateToWrite = () => {
    navigate('/community/write', {
      state: {
        BOARD_ID: BOARD_ID,
      },
    });
  };

  useEffect(() => {
    if (isFocused) console.log('Focused!!');
    const wrapper = document.getElementById('wrapper');
    const writeBtn = document.getElementById('writeBtn');

    writeBtn.addEventListener('click', () => {
      navigateToWrite();
    });
    const list = document.getElementById('list');

    const getData = () => {
      console.log('getData');
      const promise = ContentsModel.gets(BOARD_ID);
      promise.then((data) => {
        for (let i = data.length - 1; i >= 0; i--) {
          const time = convertDateToString(data[i].updatedAt ? data[i].updatedAt : data[i].createdAt);
          const nickname = '가나다';
          const dl = document.createElement('dl');
          const dt = document.createElement('dt');
          const dd = document.createElement('dd');
          const hr = document.createElement('hr');
          const div = document.createElement('div');
          // const fontawesome = document.createElement('FontAwesomeIcon');

          dt.innerText = data[i].title;
          dd.id = 'sumContent';
          dd.innerText = data[i].contents;
          div.innerText = `${time} | ${nickname}`;
          div.id = 'info';

          //글 클릭 이벤트
          dl.addEventListener('click', async () => {
            const newInfo = ContentsModel.get(data[i].id);
            if (newInfo !== undefined || newInfo !== null) {
              newInfo.then((data) => {
                const createdAt = moment(data.createdAt, moment.ISO_8601)
                  .add(9, 'h')
                  .format('YYYY-MM-DD HH:mm')
                  .toString();
                const updatedAt = data.updatedAt
                  ? moment(data.updatedAt, moment.ISO_8601).add(9, 'h').format('YYYY-MM-DD HH:mm').toString()
                  : null;
                console.log('time', createdAt, updatedAt);
                navigate('/community/view', {
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
          dd.appendChild(div);
          dl.appendChild(dt);
          dl.appendChild(dd);
          list.appendChild(dl);
          list.appendChild(hr);
        }
      });
    };
    getData();
  }, [isFocused]);
  return (
    <div id="wrapper">
      <h1 id="boardname">자유게시판</h1>
      <button type="button" id="writeBtn">
        글쓰기
      </button>
      <div id="list" />
    </div>
  );
}
export default GeneralForum;
