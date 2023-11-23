import '../styles/community.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Forum from './Forum';
import ContentView from './ContentView';

function Community() {
  const location = useLocation();
  const prop = { ...location.state };
  const [boardId, setBoardId] = useState(0);
  const [contentHidden, setContentHidden] = useState(prop.contentHidden === false ? prop.contentHidden : true);
  const [contentsHidden, setContentsHidden] = useState(prop.contentHidden === false ? !prop.contentHidden : false);
  const [postId, setPostId] = useState();

  const getBoardId = (value) => {
    setBoardId(value);
    setContentHidden(true);
    setContentsHidden(false);
  };
  const getContentHiddenToggle = () => {
    setContentHidden((prev) => !prev);
    setContentsHidden((prev) => !prev);
  };
  const getContentHidden = (value) => {
    setContentHidden(value);
    setContentsHidden(!value);
  };
  const getPostId = (value) => {
    setPostId(value);
  };

  return (
    <div id="community">
      <Sidebar getBoardId={getBoardId} boardId={boardId} />
      {contentHidden ? (
        <Forum
          boardId={boardId}
          getContentHiddenToggle={getContentHiddenToggle}
          contentsHidden={contentsHidden}
          getContentId={getPostId}
        />
      ) : (
        <ContentView
          postId={postId}
          contentHidden={contentHidden}
          getContentHiddenToggle={getContentHiddenToggle}
          getContentHidden={getContentHidden}
        />
      )}
    </div>
  );
}

export default Community;
