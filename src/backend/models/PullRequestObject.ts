export interface LabelObject {
  id: number;
  name: string;
  color: string;
}


export interface UserObject {
  login: string;
  avatar_url: string;
}


export interface PullRequestRepoObject {
  full_name: string;
}


export interface PullRequestBaseObject {
  repo: PullRequestRepoObject;
}


export interface PullRequestObject {
  id: number;

  /** The API URL to get more information about this PR. */
  url: string;

  /** The URL a user would navigate to in the browser to see this PR. */
  html_url: string;
  title: string;
  number: number;
  user: UserObject;
  labels: LabelObject[];
  base: PullRequestBaseObject;
  myApprovalStatus?: string;
}

export interface PullRequestReviewObject {
  user: UserObject;
  state: string;
}
