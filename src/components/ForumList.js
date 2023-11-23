import convertDateToString from '../utils/hooks/convertDateToString';

const ForumList = ({ contents, getContentHiddenToggle, getContentId }) => {
  const onClick = (event) => {
    getContentHiddenToggle();
    getContentId(event.currentTarget.id);
  };
  return (
    <div id="list">
      {[...contents].reverse().map((data) => {
        // let nickname;
        // //console.log(data.writerId);
        // async function getNickname(id) {
        //   nickname = await LoginModel.getNickName(id);
        // }
        // getNickname(data.writerId);
        return (
          <div key={data.id}>
            <dl id={data.id} onClick={onClick}>
              <dt>{data.title}</dt>
              <dd id="sumContent">{data.contents}</dd>
              <dd id="infoArea">
                <div id="info">{convertDateToString(data.updatedAt ? data.updatedAt : data.createdAt)}</div>
              </dd>
            </dl>
            <div id="forumhr" />
          </div>
        );
      })}
    </div>
  );
};

export default ForumList;
