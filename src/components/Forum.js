import '../styles/forum.css';
import ContentsModel from '../models/contentsModel';
import ForumList from './ForumList';
import { useEffect, useState } from 'react';
const HIDDEN_CLASS = 'hidden';

function Forum({ boardId, getContentHiddenToggle, contentsHidden, getContentId }) {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const wrapper = document.getElementById('forumWrapper');

    contentsHidden ? wrapper.classList.add(HIDDEN_CLASS) : wrapper.classList.remove(HIDDEN_CLASS);
    async function getContentsData() {
      const data = await ContentsModel.gets(boardId);
      setContents(data);
    }
    getContentsData();
  }, [boardId, contentsHidden]);

  return (
    <div id="forumWrapper">
      <ForumList contents={contents} getContentHiddenToggle={getContentHiddenToggle} getContentId={getContentId} />
    </div>
  );
}
export default Forum;
