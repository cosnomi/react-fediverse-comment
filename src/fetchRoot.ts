/**
 * Fetch the comment root post by the article author.
 */

import { MastodonStatus } from "./status";

export async function fetchRootPost(
  authorStatusesEndpoint: string,
  articleUrl: string
): Promise<MastodonStatus[]> {
  const statuses = (await (
    await fetch(authorStatusesEndpoint)
  ).json()) as MastodonStatus[];
  const rootStatuses = statuses.filter((s: any) =>
    s.content?.includes(articleUrl)
  );
  return rootStatuses;
}
