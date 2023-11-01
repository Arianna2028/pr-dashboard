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

        // Reviews are returned in chronological order, so start from the most recent.
        for (let i = 0; i < response.length; i++) {
          let review = response[i];

          // TODO: Pull from authenticated user.
          if (review.user.login === process.env.REACT_APP_GITHUB_USERNAME) {
            if (review.state === "COMMENTED") {
              commentStatus = true;
            } else {
              reviewStatus = review.state;
            }
          }
        }

        return {
          approvalStatus: reviewStatus,
          commentStatus: commentStatus
        }
      })
  }
}
