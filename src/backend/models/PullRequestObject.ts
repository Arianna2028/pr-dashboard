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
  draft: boolean;

  /** The current user's review status for this PR (e.g. "APPROVED", "CHANGES_REQUESTED").
   * Does not include the "COMMENTED" status.
   */
  myApprovalStatus?: string;

  /** The review status of users other than the authenticated user. */
  otherApprovalStatus?: string;

  /** Whether the current user has left comments on this PR. */
  haveCommented?: boolean;
}

export interface PullRequestReviewObject {
  user: UserObject;
  state: string;
}


export interface PullRequestReviewStatus {
  /** The authenticated user's review status of this PR. */
  userApprovalStatus: string;

  /** The review status of users other than the authenticated user. */
  otherApprovalStatus: string;

  /** Whether the authenticated user has left a review that is just comments on this PR. */
  commentStatus: boolean;
}
