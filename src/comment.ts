export type Comment = {
  content: string;
  userDisplayName: string;
  createdAt: Date;
  commentUrl: string;
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
  const createdAt = new Date(Date.parse(comment["created_at"]));
  const content = comment["content"];
  const userDisplayName = comment["account"]["display_name"];
  const commentUrl = comment["url"];
  return {
    content,
    createdAt,
    userDisplayName,
    commentUrl,
  };
}
