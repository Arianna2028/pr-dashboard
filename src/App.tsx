import React, { useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';

import './App.css';

import { MyPullRequests } from './components/MyPullRequests';



interface RepoSelectorProps {
  /** The previously saved repo list, used to populate the initial value of the list. */
  savedRepoList: string;

  /** Function to be called when the repo list changes. */
  setRepoList: (value: string) => void;
}

function RepoSelector(props: RepoSelectorProps) {
  const { savedRepoList, setRepoList } = props;

  // On initial rendering of this component, set the repo list to whatever is in local storage.
  useEffect(() => {
    setRepoList(localStorage.getItem('RepoSelector.repoList') || "");
  }, [setRepoList])

  return (
    <Form>
      <Form.Group className="mb-3" controlId="repoSelector.repoList">
        <Form.Label>Comma-separated repositories to include</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e) => setRepoList(e.target.value)} value={savedRepoList} />
      </Form.Group>
    </Form>
  );
}

interface PullRequestData {
  id: number;
  url: string;
  title: string;
}

function getPullRequestData(repo: string): Promise<PullRequestData[]> {
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
      return response as PullRequestData[]; // Cast the response type to our interface
    });
}

interface PullRequestListProps {
  repoList: string;
}

function PullRequestList(props: PullRequestListProps) {
  const [pullRequests, setPullRequests] = React.useState<PullRequestData[]>([]);

  useEffect(() => {
    // Split the repo list into an array of strings.
    let repos = props.repoList.split(",");
    repos = repos.map(repo => repo.trim());

    // Create an array of promises that return lits of PR data, one for each repo.
    let pullRequestQueries: Promise<PullRequestData[]>[] = [];
    repos.forEach(repo => {
      pullRequestQueries.push(getPullRequestData(repo));
    })

    Promise.all(pullRequestQueries).then((allPullRequestData) => {
      console.log("Made GitHub API calls to get PRs.")
      let flatPullRequestData = allPullRequestData.flat();
      setPullRequests(flatPullRequestData);
    });

  }, [props.repoList, setPullRequests]);

  let pullRequestElements: JSX.Element[] = [];

  for (let i = 0; i < pullRequests.length; i++) {
    console.log(pullRequests[i].id);
    pullRequestElements.push(<div key={pullRequests[i].id}>{pullRequests[i].title}</div>);
  }

  return (
    <>
      {pullRequestElements}
    </>
  )
}

function PullRequests() {
  const [repoList, setRepoList] = React.useState<string>("");
  const handleRepoListUpdate = (repoListValue: string) => {
    // Set the state value so it's easily accessible.
    setRepoList(repoListValue);

    // Set the local storage value so it's persisted across refreshes.
    localStorage.setItem('RepoSelector.repoList', repoListValue);
  }

  return (
    <div>
      {/* <PullRequestList repoList={repoList} />
      <RepoSelector savedRepoList={repoList} setRepoList={handleRepoListUpdate} /> */}
    </div>
  )
}



function App() {
  return (
    <div className={"app"}>
      <Container className={"py-4"}>
        <Row>
          <Col>
            <MyPullRequests />
          </Col>
        </Row>
      </Container>
      <PullRequests />
    </div>
  );
}

export default App;
