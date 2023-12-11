import { Card, Col, Row } from "react-bootstrap";
import { PullRequestRow } from "./PullRequestRow";
import { PullRequestIconColumn } from "./PullRequestIconColumn";
import { BsCheckCircle } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { PullRequestObject } from "../backend/models/PullRequestObject";
import React, { useEffect, useState } from "react";
import { observer } from 'mobx-react';
import PullRequestStore from "../store/PullRequestStore";
import Form from 'react-bootstrap/Form';


export const OtherPullRequests = observer(() => {
  const [showDrafts, setShowDrafts] = useState(true);
  const [pullRequestRowsDisplay, setPullRequestRowsDisplay] = useState<JSX.Element[]>([]);

  useEffect(() => {
    var pullRequestRows: JSX.Element[] = [];
    for (let i = 0; i < PullRequestStore.otherPullRequests.length; i++) {
      if (showDrafts || !PullRequestStore.otherPullRequests[i].draft) {
        pullRequestRows.push(
          <PullRequestRow
            key={PullRequestStore.otherPullRequests[i].id}
            pr={PullRequestStore.otherPullRequests[i]}
            reviewStatus={PullRequestStore.otherPullRequests[i].myApprovalStatus || "NOT_YET_REVIEWED"}
            accountForComments={true}
          />
        );
      }
    }
    setPullRequestRowsDisplay(pullRequestRows);
  }, [showDrafts])

  return (
    <Card className="pr-card mt-3">
      <Card.Title className={"px-3 py-2 mb-0 text-white"}>
        <Row>
          <Col>
            <h4 className="mb-0">Open PRs</h4>
          </Col>
          <Col className="col-auto">
            <Form.Check
              type="switch"
              id="open-prs-draft-switch"
              label="Show Drafts"
              checked={showDrafts}
              onChange={(e) => setShowDrafts(e.target.checked)}
            />
          </Col>
        </Row>
      </Card.Title>
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

          {pullRequestRowsDisplay}
        </div>
      </Card.Body>
    </Card>
  )
});
