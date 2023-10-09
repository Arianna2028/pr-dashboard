import { Card, Col, Row } from "react-bootstrap";
import { PullRequestRow } from "./PullRequestRow";
import { PullRequestIconColumn } from "./PullRequestIconColumn";
import { BsCheckCircle } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { TestData } from "../backend/TestData";
import { PullRequestObject } from "../backend/models/PullRequestObject";

function getPullRequests() {
  return TestData as PullRequestObject[];
}


export function MyPullRequests() {
  let pullRequests = getPullRequests();

  var pullRequestRows: JSX.Element[] = [];
  for (let i = 0; i < pullRequests.length; i++) {
    pullRequestRows.push(<PullRequestRow key={pullRequests[i].id} pr={pullRequests[i]} />);
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
}
