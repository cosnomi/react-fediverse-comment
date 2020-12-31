import React, { useState, useEffect } from "react";
import { Comment, fetchCommentList } from "./comment";
import DOMPurify from "dompurify";

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
  return (
    <div>
      <span>{DOMPurify.sanitize(comment.userDisplayName)}</span>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(comment.content),
        }}
      ></p>
    </div>
  );
}
