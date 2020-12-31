import React, { useState, useEffect } from "react";
import { Comment, fetchCommentList } from "./comment";

type Props = {
  url: string;
};

export function FediverseCommentSection(props: Props) {
  const [comments, setComments] = useState<Comment[]>();
  useEffect(() => {
    (async () => {
      if (!comments) {
        setComments(await fetchCommentList(props.url));
      }
    })();
  });
  return (
    <div>
      {comments
        ? comments.map((c) => {
            return <CommentCard comment={c} />;
          })
        : "Loading comments"}
    </div>
  );
}

type CardProps = {
  comment: Comment;
};
function CommentCard(props: CardProps) {
  const comment = props.comment;
  console.log(`avater: ${comment.avaterUrl}`)
  return (
    <div className="fediverse-commeent">
      <img src={comment.avaterUrl} />
      <span className="display-name">
        {comment.userDisplayName}
      </span>
      <a className="created-at" href={comment.commentUrl}>{comment.createdAt}</a>
      <p
        className="comment-content"
        dangerouslySetInnerHTML={{
          __html: comment.content,
        }}
      ></p>
    </div>
  );
}
