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
  html_url: string;
  title: string;
  number: number;
  user: UserObject;
  labels: LabelObject[];
  base: PullRequestBaseObject;
}
