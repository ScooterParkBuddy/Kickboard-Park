/* eslint-disable no-restricted-globals */
import axios from 'axios';

async function get(postId) {
  console.log('get');
  const data = await axios({
    method: 'get',
    url: `/posts/${postId}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  return data;
}

async function gets(boardId) {
  console.log('gets');
  const data = await axios({
    method: 'get',
    url: '/posts',
    params: { boardId: boardId },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}

async function post(title, contents, writerId, boardId) {
  console.log('post');
  const status = await axios({
    method: 'post',
    url: '/posts/new',
    data: {
      title: title,
      contents: contents,
      writerId: writerId,
      boardId: boardId,
    },
  })
    .then((res) => {
      return gets(boardId);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return status;
  //멤버 확인
  //messageCount 초기값 1 => id로 쓰임
  //[POST] title, contents, writerId, createdAt?
  //async await
}

async function update(title, contents, writerId, boardId, postId) {
  console.log('update');
  const status = await axios({
    method: 'put',
    url: `/posts/${postId}`,
    data: {
      title: title,
      contents: contents,
      writerId: writerId,
      boardId: boardId,
    },
  })
    .then((res) => {
      return gets(boardId);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return status;
}

async function postReply(postId, replyWriterId, contents) {
  const data = await axios({
    method: 'post',
    url: `/posts/${postId}/comment/new`,
    data: {
      replyWriterId: replyWriterId,
      contents: contents,
    },
  })
    .then((res) => {
      return get(postId);
    })
    .catch((error) => {
      return error;
    });
  return data;
}
async function deleteContent(postId, boardId) {
  axios({
    method: 'delete',
    url: `/posts/${postId}`,
  })
    .then((res) => {
      gets(boardId);
    })
    .catch((error) => {
      console.log(error);
    });
}

const ContentsModel = {
  gets,
  get,
  post,
  postReply,
  update,
  deleteContent,
};
export default ContentsModel;
