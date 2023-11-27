import { Card, Col, Row } from "react-bootstrap";
import { PullRequestRow } from "./PullRequestRow";
import { PullRequestIconColumn } from "./PullRequestIconColumn";
import { BsCheckCircle } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { PullRequestObject } from "../backend/models/PullRequestObject";
import React, { useEffect } from "react";
import { observer } from 'mobx-react';
import PullRequestStore from "../store/PullRequestStore";



export const OtherPullRequests = observer(() => {
  var pullRequestRows: JSX.Element[] = [];
  for (let i = 0; i < PullRequestStore.otherPullRequests.length; i++) {
    pullRequestRows.push(
      <PullRequestRow
        key={PullRequestStore.otherPullRequests[i].id}
        pr={PullRequestStore.otherPullRequests[i]}
        reviewStatus={PullRequestStore.otherPullRequests[i].myApprovalStatus || "NOT_YET_REVIEWED"}
        accountForComments={true}
      />
    );
  }

  return (
    <Card className="pr-card mt-3">
      <Card.Title className={"px-3 py-2 mb-0 text-white"}>Open PRs</Card.Title>
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
