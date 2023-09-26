import React from 'react';
import '../styles/loading.css';
import Spinner from '../assets/images/spinner.gif';

function Loading() {
  return (
    <div id="background">
      <div id="loadingText">잠시만 기다려 주세요.</div>
      <img src={Spinner} alt="로딩중" width="5%" />
    </div>
  );
}

export default Loading;
