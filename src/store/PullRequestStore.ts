import { action, makeAutoObservable } from 'mobx';
import { PullRequestObject } from '../backend/models/PullRequestObject';
import { GitHub } from '../backend/GitHub';

class PullRequestStore {
  allPullRequests: PullRequestObject[] = [];
  myPullRequests: PullRequestObject[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadPullRequests() {
    let repos = ["symopsio/platform", "symopsio/webapp"]
    let pullRequestQueries: Promise<PullRequestObject[]>[] = [];

    repos.forEach(repo => {
      pullRequestQueries.push(GitHub.getPullRequestQuery(repo));
    })

    Promise.all(pullRequestQueries).then(
      action("Process PR Data", (allPullRequestData) => {
        console.log("Made GitHub API calls to get PRs.")
        let flatPullRequestData = allPullRequestData.flat();
        this.allPullRequests = flatPullRequestData;

        this.myPullRequests = flatPullRequestData.filter((pullRequest) => {
          // TODO: Pull from authenticated user.
          return pullRequest.user.login === "Arianna2028";
        });
      })
    );
  }

}

const pullRequestStore = new PullRequestStore();
export default pullRequestStore;
