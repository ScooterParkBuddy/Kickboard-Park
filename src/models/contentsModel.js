import axios from '../lib/postAxios';

async function get(postId) {
  const data = await axios({
    method: 'get',
    url: `/${postId}`,
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      return error;
    });
  return data;
}

async function gets(boardId) {
  const data = await axios({
    method: 'get',
    url: '',
    params: { boardId: boardId },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return data;
}

async function post(title, contents, writerId, boardId) {
  const status = await axios({
    method: 'post',
    url: '/new',
    data: {
      title: title,
      contents: contents,
      writerId: writerId,
      boardId: boardId,
    },
  })
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      return error.response;
    });
  return status;
}

async function update(title, contents, writerId, boardId, postId) {
  const status = await axios({
    method: 'put',
    url: `/${postId}`,
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
      return error.response;
    });
  return status;
}

async function postReply(postId, replyWriterId, contents) {
  const data = await axios({
    method: 'post',
    url: `/${postId}/comment/new`,
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
    url: `/${postId}`,
  })
    .then((res) => {
      gets(boardId);
    })
    .catch((error) => {
      console.log(error.response);
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
