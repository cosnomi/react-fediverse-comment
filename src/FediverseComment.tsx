import React, { useState, useEffect } from "react";
import { Comment, fetchCommentList } from "./comment";

type Props = {
  apiRootEndpoint: string;
  authorId: string;
  articleUrl: string;
};

export function FediverseCommentSection(props: Props) {
  const [comments, setComments] = useState<Comment[]>();
  useEffect(() => {
    (async () => {
      if (!comments) {
        const comments = await fetchCommentList(
          props.apiRootEndpoint,
          props.authorId,
          props.articleUrl
        );
        //.filter((c) => c.visibility === "public");
        setComments(comments);
      }
    })();
  });
  if (comments) {
    if (comments.length > 0) {
      return (
        <div>
          {comments.map((c) => {
            return <CommentCard comment={c} />;
          })}
        </div>
      );
    } else {
      return <div>No comments.</div>;
    }
  } else {
    return (
      <div>
        Loading comments (if it takes so long, there's something wrong in
        fetching comments.)
      </div>
    );
  }
}

type CardProps = {
  comment: Comment;
  articleAuthorUserUrl?: string;
};
function CommentCard(props: CardProps) {
  const comment = props.comment;
  const isArticleAuthor = props.comment.userUrl === props.articleAuthorUserUrl;
  console.log(`avater: ${comment.avaterUrl}`);
  return (
    <div
      className={`fediverse-comment${comment.isRoot ? " root-comment" : ""}`}
    >
      <div className="user-info">
        <a href={comment.userUrl}>
          <img className="avatar" src={comment.avaterUrl} />
        </a>
        <a
          className={`display-name${isArticleAuthor ? " author" : ""}`}
          href={comment.userUrl}
        >
          {comment.userDisplayName}
        </a>
        <a className="created-at" href={comment.commentUrl}>
          {comment.createdAt}
        </a>
      </div>
      <p
        className="comment-content"
        dangerouslySetInnerHTML={{
          __html: comment.content,
        }}
      ></p>
      {comment.isRoot && (
        <a className="comment-button" href={comment.commentUrl}>
          You can comment on this article by replying this fediverse post.
        </a>
      )}
    </div>
  );
}
