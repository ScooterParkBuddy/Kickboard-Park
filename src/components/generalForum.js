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

const BOARD_ID = 1;

function GeneralForum() {
  const navigate = useNavigate();
  const navigateToWrite = () => {
    navigate('/community/write', {
      state: {
        BOARD_ID: BOARD_ID,
      },
    });
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    const wrapper = document.getElementById('wrapper');
    const writeBtn = document.getElementById('writeBtn');

    writeBtn.addEventListener('click', () => {
      navigateToWrite();
    });
    const list = document.getElementById('list');

    const getData = () => {
      const promise = ContentsModel.gets(BOARD_ID);
      promise.then((data) => {
        console.log('data', data);
        for (let i = data.length - 1; i >= 0; i--) {
          const time = convertDateToString(data[i].createdAt);
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
          dl.addEventListener('click', async () => {
            const newInfo = ContentsModel.get(data[i].id);
            if (newInfo !== undefined || newInfo !== null) {
              newInfo.then((data) => {
                navigate('/community/view', {
                  state: {
                    id: data.id,
                    title: data.title,
                    contents: data.contents,
                    writerId: data.writerId,
                    boardId: data.boardId,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    comments: data.comments,
                  },
                });
              });
            }
          });
          dl.appendChild(dt);
          dl.appendChild(dd);
          dd.appendChild(div);
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
