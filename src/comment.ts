import DOMPurify from "dompurify";

export type Comment = {
  content: string;
  userDisplayName: string;
  createdAt: string;
  commentUrl: string;
  avaterUrl: string;
};
export async function fetchCommentList(
  authorPostAPIEndpointUrl: string
): Promise<Comment[]> {
  console.log(`Fetching comment from ${authorPostAPIEndpointUrl}`);

  const context = await (await fetch(`${authorPostAPIEndpointUrl}`)).json();

  console.log(`fetched`);
  console.log(context);

  const commentList: Comment[] = context["descendants"].map(parseComment);
  return commentList;
}

export function parseComment(comment: any): Comment {
  const createdAt = comment["created_at"]; // new Date(Date.parse(comment["created_at"]));

  // Allow safe HTML
  const content = DOMPurify.sanitize(comment["content"]);

  // Don't allow HTML. Only plain text
  const userDisplayName = getTextFromPossiblyDirtyHtml(
    comment["account"]["display_name"]
  );
  const commentUrl = getTextFromPossiblyDirtyHtml(comment["url"]);
  const avaterUrl = getTextFromPossiblyDirtyHtml(comment["account"]["avatar_static"])

  return {
    content,
    createdAt,
    userDisplayName,
    commentUrl,
    avaterUrl,
  };
}
function getTextFromPossiblyDirtyHtml(dirty: string) {
  // TODO: implement
  return dirty;
}
