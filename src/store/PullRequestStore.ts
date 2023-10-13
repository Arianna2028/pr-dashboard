import { action, makeAutoObservable } from 'mobx';
import { PullRequestObject } from '../backend/models/PullRequestObject';
import { GitHub } from '../backend/GitHub';

class PullRequestStore {
  allPullRequests: PullRequestObject[] = [];
  myPullRequests: PullRequestObject[] = [];
  otherPullRequests: PullRequestObject[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadPullRequests() {
    // TODO: Pull from repo list
    let repos = ["symopsio/platform", "symopsio/webapp"]
    let pullRequestQueries: Promise<PullRequestObject[]>[] = [];

    repos.forEach(repo => {
      pullRequestQueries.push(GitHub.getPullRequestQuery(repo));
    })

    Promise.all(pullRequestQueries).then(
      action("Process PR Data", (allPullRequestData) => {
        let flatPullRequestData = allPullRequestData.flat();

        for (let i = 0; i < flatPullRequestData.length; i++) {
          GitHub.getPullRequestReviewStatus(flatPullRequestData[i].url).then(
            action("Set Review Status", (reviewStatus) => {
              flatPullRequestData[i].myApprovalStatus = reviewStatus;

              this.allPullRequests = flatPullRequestData;
              this.myPullRequests = flatPullRequestData.filter((pullRequest) => {
                // TODO: Pull from authenticated user.
                return pullRequest.user.login === "Arianna2028";
              });
              this.otherPullRequests = flatPullRequestData.filter((pullRequest) => {
                // TODO: Pull from authenticated user.
                return pullRequest.user.login !== "Arianna2028";
              });
            }));
        }
      })
    );
  }

}

const pullRequestStore = new PullRequestStore();
export default pullRequestStore;
