import DOMPurify from "dompurify";
import { fetchRootPost } from "./fetchRoot";
import { MastodonStatus } from "./status";

export type Comment = {
  content: string;
  userDisplayName: string;
  username: string;
  createdAt: string;
  commentUrl: string;
  userUrl: string;
  avaterUrl: string;
  visibility: string; // TODO: enum?
  isRoot: boolean;
};

export type RootPostQuery = {
  articleUrl: string;
  authorId: string;
};
export type RootPost = string | RootPostQuery;

export async function fetchCommentList(
  apiRootEndpoint: string,
  rootPost: RootPost
): Promise<Comment[]> {
  let rootStatuses;
  if (typeof rootPost === "string") {
    rootStatuses = [await (await fetch(rootPost)).json()];
  } else {
    const { articleUrl, authorId } = rootPost;
    if (!authorId || !articleUrl) {
      console.error("both aurhotId and articleUrl must be specified");
      return [];
    }
    const authorStatusesEndpoint = `${apiRootEndpoint}/accounts/${authorId}/statuses`;
    rootStatuses = await fetchRootPost(authorStatusesEndpoint, articleUrl);
    // TODO: Support multiple root status? For now only use the first one
  }
  if (rootStatuses.length == 0) {
    return [];
  }
  const rootStatus = rootStatuses[0];

  const context = await (
    await fetch(`${apiRootEndpoint}/statuses/${rootStatus.id}/context`)
  ).json();

  const parsedRootComment: Comment = {
    ...parseComment(rootStatus),
    isRoot: true,
  };
  const commentList: Comment[] = context["descendants"].map(parseComment);
  return [parsedRootComment, ...commentList];
}

export function parseComment(comment: MastodonStatus): Comment {
  const createdAt = comment.created_at; // new Date(Date.parse(comment["created_at"]));

  // Allow safe HTML
  const content = DOMPurify.sanitize(comment.content);

  // Don't allow HTML. Only plain text
  const userDisplayName = getPlainText(comment.account.display_name);
  const commentUrl = getPlainText(comment.url);
  const visibility = getPlainText(comment.visibility);
  const avaterUrl = getPlainText(comment.account.avatar_static);
  const userUrl = getPlainText(comment.account.url);
  const username = getPlainText(comment.account.username);

  return {
    content,
    userDisplayName,
    username,
    createdAt,
    commentUrl,
    userUrl,
    avaterUrl,
    visibility,
    isRoot: false,
  };
}
function getPlainText(dirty: string) {
  return dirty
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
