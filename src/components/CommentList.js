import moment from 'moment';

const CommentList = ({ comments }) => {
  return (
    <div id="relpyList">
      <ol id="replyOL">
        {comments &&
          comments.map((comment) => {
            return (
              <li key={comment.id}>
                <p id="replyContents">{comment.contents}</p>
                <p id="replyUserTime">
                  네네 | {moment(comment.createdAt, moment.ISO_8601).add(9, 'h').format('YYYY-MM-DD HH:mm')}
                </p>
                <hr />
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default CommentList;
