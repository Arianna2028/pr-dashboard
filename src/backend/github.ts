import { PullRequestObject } from "./models/PullRequestObject";

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
}
