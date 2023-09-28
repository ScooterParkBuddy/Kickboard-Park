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
  const postId = prop.id;
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const menuBtn = document.getElementById('btn');
    const hiddenArea = document.getElementById('hidden');
    const updateBtn = document.getElementById('updateBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const h1 = document.getElementById('titleArea');
    const infoArea = document.getElementById('contentInfoArea');
    const contentsArea = document.getElementById('contentsArea');
    const writeReply = document.getElementById('writeReply');
    const reply = document.getElementById('replyInput');
    const ol = document.querySelector('ol');

    function removeListAll() {
      while (ol.firstChild) {
        ol.removeChild(ol.firstChild);
      }
    }

    const newInfo = ContentsModel.get(postId);
    if (newInfo !== undefined || newInfo !== null) {
      newInfo.then((data) => {
        const createdAt = moment(data.createdAt, moment.ISO_8601).add(9, 'h').format('YYYY-MM-DD HH:mm');
        const updatedAt =
          data.updatedAt !== data.createdAt && data.updatedAt
            ? moment(data.updatedAt, moment.ISO_8601).add(9, 'h').format('YYYY-MM-DD HH:mm')
            : null;

        menuBtn.addEventListener('click', () => {
          hiddenArea.classList.toggle(HIDDEN_CLASS);
          if (hiddenArea.className !== HIDDEN_CLASS) {
            updateBtn.addEventListener('click', () => {
              navigate('/community/update', {
                state: {
                  postId: data.id,
                  title: data.title,
                  contents: data.contents,
                  boardId: data.boardId,
                  writerId: data.writerId,
                },
              });
            });
            deleteBtn.addEventListener('click', () => {
              ContentsModel.deleteContent(data.id, data.boardId);
              if (prop.boardId === 0) {
                window.location.replace('/community/accident');
              }
              if (prop.boardId === 1) {
                window.location.replace('/community/general');
              }
            });
          }
        });
        if (data.writerId !== Number(localStorage.getItem('userId'))) {
          menuBtn.classList.add(HIDDEN_CLASS);
        }

        const b = document.createElement('b');
        const p = document.createElement('p');
        loginAxios({
          method: 'get',
          url: '/my/nickname',
          params: {
            userId: data.writerId,
          },
        })
          .then((res) => {
            console.log(res.data);
            b.innerText = res.data;
          })
          .catch((error) => {
            console.log(error);
          });

        h1.innerText = data.title;
        const time = updatedAt ? `${updatedAt} (수정됨)` : createdAt;
        p.innerText = `${time}`;
        infoArea.appendChild(b);
        infoArea.appendChild(p);
        contentsArea.innerText = data.contents;
        save(data);

        writeReply.addEventListener('submit', (e) => {
          e.preventDefault();
          if (reply.value === null || reply.value === '' || reply.value === undefined) {
            alert('댓글을 입력해 주세요');
          } else {
            removeListAll();
            ContentsModel.postReply(data.id, userId, reply.value);
            reply.value = '';
            window.location.replace(`/community/view/${data.id}`);
          }
        });
      });
    }

    //댓글 불러오는 함수
    async function save(info) {
      for (let i = 0; i < info.comments.length; i++) {
        const li = document.createElement('li');
        const replyUserTime = document.createElement('p');
        const replyContents = document.createElement('p');
        const hr = document.createElement('hr');
        replyUserTime.id = 'replyUserTime';
        replyContents.id = 'replyContents';
        const now = info.comments[i];
        const commentCreatedAt = moment(now.createdAt, ISO_8601).add(9, 'h').format('YYYY-MM-DD HH:mm');
        loginAxios({
          method: 'get',
          url: '/my/nickname',
          params: {
            userId: now.replyMemberId,
          },
        })
          .then((res) => {
            console.log(res.data);
            replyUserTime.innerText = `${res.data} | ${commentCreatedAt}`;
          })
          .catch((error) => {
            console.log(error);
          });
        replyContents.innerText = now.contents;

        li.appendChild(replyContents);
        li.appendChild(replyUserTime);
        li.appendChild(hr);
        ol.appendChild(li);
      }
    }
  }, []);

  return (
    <div id="contentWrapper" style={{ marginTop: 10 }}>
      <div id="UDButtonArea">
        <button id="btn"></button>
        <span id="hidden" className="hidden">
          <span id="contentMenu">
            <button id="updateBtn">수정</button>
            <button id="deleteBtn">삭제</button>
          </span>
        </span>
      </div>
      <div>
        <img id="profile" />
        <div id="contentInfoArea" />
      </div>
      <h2 id="titleArea" />
      <div id="contentsArea" />
      <hr />
      <div id="replyArea">
        <form id="writeReply">
          <input type="text" id="replyInput" placeholder="댓글을 입력하세요" />
          <input type="submit" id="replySubmit" value="완료" />
        </form>
        <div id="relpyList">
          <ol id="replyOL" />
        </div>
      </div>
    </div>
  );
}
export default ContentsView;
