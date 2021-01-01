export type MastodonStatus = {
  account: {
    display_name: string;
    bot: boolean;
    id: string;
    url: string;
    username: string;
    avatar: string;
    avatar_static: string;
  };
  content: string;
  created_at: string;
  url: string;
  id: string;
  visibility: string;
};
