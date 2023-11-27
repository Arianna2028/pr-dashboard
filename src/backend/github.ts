import { PullRequestObject, PullRequestReviewObject, PullRequestReviewStatus } from "./models/PullRequestObject";

export class GitHub {

  public static async getPullRequestQuery(repo: string): Promise<PullRequestObject[]> {
    let apiURL = 'https://api.github.com/repos/' + repo + '/pulls?' + new URLSearchParams({
      state: 'open',
      per_page: '50',  // If we have more than 50 open PRs in a repo we have a problem.
      sort: 'created',
      direction: 'asc',
    });

    return fetch(apiURL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + process.env.REACT_APP_GITHUB_TOKEN
      },
    })
      .then((response) => response.json()) // Parse the response in JSON
      .then((response) => {
        return response as PullRequestObject[]; // Cast the response type to our interface
      });
  }

  public static async getPullRequestReviewStatus(pr_api_url: string): Promise<PullRequestReviewStatus> {
    // TODO: Pagination. Default is 30 items.
    let apiURL = pr_api_url + '/reviews';
    // TODO: this should be configurable.
    let reviewersToIgnore = ["syminfrastructure"]

    return fetch(apiURL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + process.env.REACT_APP_GITHUB_TOKEN
      },
    })
      .then((response) => response.json()) // Parse the response in JSON
      .then((response) => response as PullRequestReviewObject[]) // Cast the response type to our interface
      .then((response) => {
        var reviewStatus = "NOT_YET_REVIEWED"
        var commentStatus = false;
        var externalReviewStatuses = new Map();

        // Reviews are returned in chronological order.
        for (let i = 0; i < response.length; i++) {
          let review = response[i];

          // TODO: Pull from authenticated user.
          if (reviewersToIgnore.includes(review.user.login)) {
            continue;
          } else if (review.user.login === process.env.REACT_APP_GITHUB_USERNAME) {
            if (review.state === "COMMENTED") {
              commentStatus = true;
            } else {
              reviewStatus = review.state;
            }
          } else if (review.state !== "COMMENTED") {
            // Keep track of all other users' reviews, except ones where they only commented,
            // since those do not affect mergeability.
            externalReviewStatuses.set(review.user.login, review.state);
          }
        }

        let otherApprovalStatus: string;
        let reviewStatuses = Array.from(externalReviewStatuses.values());
        if (reviewStatuses.includes("CHANGES_REQUESTED")) {
          otherApprovalStatus = "CHANGES_REQUESTED";
        } else if (reviewStatuses.includes("APPROVED")) {
          otherApprovalStatus = "APPROVED";
        } else {
          otherApprovalStatus = "NOT_YET_REVIEWED";
        }

        return {
          userApprovalStatus: reviewStatus,
          otherApprovalStatus: otherApprovalStatus,
          commentStatus: commentStatus
        }
      })
  }
}
