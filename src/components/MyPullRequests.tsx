import { Card, Col, Row } from "react-bootstrap";
import { PullRequestRow } from "./PullRequestRow";
import { PullRequestIconColumn } from "./PullRequestIconColumn";
import { BsCheckCircle } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { PullRequestObject } from "../backend/models/PullRequestObject";
import React, { useEffect } from "react";
import { observer } from 'mobx-react';
import PullRequestStore from "../store/PullRequestStore";

function getPullRequestQuery(repo: string): Promise<PullRequestObject[]> {
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


export const MyPullRequests = observer(() => {
  var pullRequestRows: JSX.Element[] = [];
  for (let i = 0; i < PullRequestStore.myPullRequests.length; i++) {
    pullRequestRows.push(<PullRequestRow key={PullRequestStore.myPullRequests[i].id} pr={PullRequestStore.myPullRequests[i]} />);
  }

  return (
    <Card className="pr-card">
      <Card.Title className={"px-3 py-2 mb-0 text-white"}>My PRs</Card.Title>
      <Card.Body>
        <div className={"pr-table text-white mx-3"}>
          <Row className={"py-2"}>
            <PullRequestIconColumn>
              <BsCheckCircle />
            </PullRequestIconColumn>
            <PullRequestIconColumn>
              <BiSolidUser />
            </PullRequestIconColumn>
            <Col className="my-auto"><small>Title</small></Col>
            <Col>{/* We don't want to label the "label" column, but need to keep the layout. */}</Col>
          </Row>

          {pullRequestRows}
        </div>
      </Card.Body>
    </Card>
  )
});
