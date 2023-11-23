import CommentList from './CommentList';
import moment from 'moment';
import LoginModel from '../models/loginModel';
import ContentsModel from '../models/contentsModel';
import { useState } from 'react';

const Post = ({ post, getPost }) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    await ContentsModel.postReply(post.id, userId, e.target.reply.value);
    e.target.reply.value = '';
    getPost();
  };
  let nickname = '네네';
  async function getNickname() {
    nickname = await LoginModel.getNickName(post.writerId);
  }
  const time = post.updatedAt ? post.updatedAt : post.createdAt;
  const updateMessage = post.updatedAt !== post.createdAt ? '(수정됨)' : '';
  getNickname();
  return (
    <>
      <div id="profileInfoArea">
        <img id="profile" />
        <div id="contentInfoArea">
          <b>{nickname}</b>
          <p>
            {moment(time, moment.ISO_8601).add(9, 'h').format('YYYY-MM-DD HH:mm')} {updateMessage}
          </p>
        </div>
      </div>
      <h2 id="titleArea">{post.title}</h2>
      <div id="contentsArea">{post.contents}</div>
      <div id="replyArea">
        <form id="writeReply" onSubmit={onSubmit}>
          <input type="text" id="replyInput" name="reply" placeholder="댓글을 입력하세요" />
          <input type="submit" id="replySubmit" value="완료" />
        </form>
        <div id="relpyList">
          <ol id="replyOL">{post.comments && <CommentList comments={post.comments} />}</ol>
        </div>
      </div>
    </>
  );
};
export default Post;
