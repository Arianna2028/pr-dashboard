import { PullRequestObject, PullRequestReviewObject } from "./models/PullRequestObject";

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

  public static async getPullRequestReviewStatus(pr_api_url: string): Promise<string> {
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
        // Reviews are returned in chronological order, so start from the most recent.
        for (let i = response.length; i > 0; i--) {
          // TODO: Pull from authenticated user.
          if (response[i - 1].user.login === process.env.REACT_APP_GITHUB_USERNAME) {
            return response[i - 1].state;
          }
        }

        return "NOT_YET_REVIEWED"
      })
  }
}
