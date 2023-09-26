import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment, { ISO_8601 } from 'moment';
import '../styles/contentView.css';
import ContentsModel from '../models/contentsModel';
import LoginModel from '../models/loginModel';
import loginAxios from '../lib/loginAxios';

const HIDDEN_CLASS = 'hidden';

function ContentsView() {
  const navigate = useNavigate();
  const location = useLocation();
  const prop = { ...location.state };
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const menuBtn = document.getElementById('btn');
    const hiddenArea = document.getElementById('hidden');
    const updateBtn = document.getElementById('updateBtn');
    const deleteBtn = document.getElementById('deleteBtn');

    menuBtn.addEventListener('click', () => {
      hiddenArea.classList.toggle(HIDDEN_CLASS);
      if (hiddenArea.className !== HIDDEN_CLASS) {
        updateBtn.addEventListener('click', () => {
          navigate('/community/update', {
            state: {
              postId: prop.id,
              title: prop.title,
              contents: prop.contents,
              boardId: prop.boardId,
              writerId: prop.writerId,
            },
          });
        });
        deleteBtn.addEventListener('click', () => {
          ContentsModel.deleteContent(prop.id, prop.boardId);
          if (prop.boardId === 0) {
            navigate('/community/accident');
          }
          if (prop.boardId === 1) {
            navigate('/community/general');
          }
        });
      }
    });

    if (prop.writerId !== Number(localStorage.getItem('userId'))) {
      console.log('id false', prop.writerId, localStorage.getItem('userId'));
      menuBtn.classList.add(HIDDEN_CLASS);
    }

    const wrapper = document.querySelector('div');
    const h1 = document.getElementById('titleArea');
    const infoArea = document.getElementById('infoArea');
    const contentsArea = document.getElementById('contentsArea');
    const writeReply = document.getElementById('writeReply');
    const replyArea = document.getElementById('replyArea');
    const reply = document.getElementById('reply');
    const ol = document.querySelector('ol');

    function removeListAll() {
      while (ol.firstChild) {
        ol.removeChild(ol.firstChild);
      }
    }

    function save(info) {
      h1.innerText = info.title;
      const time = info.updatedAt ? `${info.updatedAt} (수정됨)` : info.createdAt;
      infoArea.innerText = `${time} | ${info.id}`;
      contentsArea.innerText = info.contents;
      for (let i = 0; i < info.comments.length; i++) {
        const li = document.createElement('li');
        const now = info.comments[i];
        const commentCreatedAt = moment(now.createdAt, ISO_8601).add(9, 'h').format('YYYY-MM-DD HH:mm').toString();
        li.innerText = `${now.contents} | ${now.replyMemberId} | ${commentCreatedAt}`;
        ol.appendChild(li);
      }
    }
    save(prop);
    writeReply.addEventListener('submit', (e) => {
      e.preventDefault();
      removeListAll();
      const status = ContentsModel.postReply(prop.id, userId, reply.value);
      status.then((data) => {
        save(data);
      });
      reply.value = '';
    });
  }, []);

  return (
    <div style={{ marginTop: 80 }}>
      <div id="contentArea">
        <button id="btn"></button>
        <span id="hidden" className="hidden">
          <span id="contentMenu">
            <button id="updateBtn">수정</button>
            <button id="deleteBtn">삭제</button>
          </span>
        </span>
      </div>
      <h1 id="titleArea" />
      <div id="infoArea" />
      <div id="contentsArea" />
      <hr />
      <div id="replyArea">
        <form id="writeReply">
          <input type="text" id="reply" placeholder="댓글을 입력하세요" />
          <input type="submit" value="완료" />
        </form>
        <ol id="relpyList" />
      </div>
    </div>
  );
}
export default ContentsView;
