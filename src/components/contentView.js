import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import Post from './Post';
import '../styles/contentView.css';
import ContentsModel from '../models/contentsModel';
const HIDDEN_CLASS = 'hidden';

function ContentView({ postId, contentHidden, getContentHiddenToggle, getContentHidden }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [post, setPost] = useState([]);
  const onClickUpdate = () => {
    navigate('/community/update', {
      state: {
        post: post,
        contentHidden: contentHidden,
      },
    });
    getContentHidden(false);
  };

  const onClickDelete = (e) => {
    ContentsModel.deleteContent(postId);
    getContentHiddenToggle();
    window.location.replace('/community');
  };
  async function getPost() {
    const post = await ContentsModel.get(postId);
    setPost(post);
    console.log(post);
  }

  useEffect(() => {
    const menuBtn = document.getElementById('UDBtn');
    const hiddenArea = document.getElementById('hidden');
    const backIcon = document.getElementById('backIcon');
    backIcon.addEventListener('click', () => {
      console.log('back');
      getContentHiddenToggle();
    });
    menuBtn.addEventListener('click', () => {
      console.log('click');
      hiddenArea.classList.toggle(HIDDEN_CLASS);
    });
    getPost();
    if (userId === post.writerId) menuBtn.classList.remove(HIDDEN_CLASS);
  }, []);

  return (
    <div id="contentViewWrapper">
      <ArrowBackIcon id="backIcon" />
      <div id="contentWrapper">
        <div id="UDButtonArea">
          <button id="UDBtn" />
          <span id="hidden" className="hidden">
            <span id="contentMenu">
              <button id="updateBtn" onClick={onClickUpdate}>
                수정
              </button>
              <button id="deleteBtn" onClick={onClickDelete}>
                삭제
              </button>
            </span>
          </span>
        </div>
        <Post post={post} getPost={getPost} />
      </div>
    </div>
  );
}
export default ContentView;
