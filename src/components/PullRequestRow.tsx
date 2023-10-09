import { Row, Image, Col } from "react-bootstrap";
import { PullRequestIconColumn } from "./PullRequestIconColumn";
import { PullRequestTitleColumn } from "./PullRequestTitleColumn";
import { FaUserClock } from "react-icons/fa";
import { LabelBadge } from "./LabelBadge";
import { PullRequestObject } from "../backend/models/PullRequestObject";
import "./PullRequestRow.css";

interface PullRequestRowProps {
  pr: PullRequestObject;
}

export function PullRequestRow(props: PullRequestRowProps) {
  var labelBadges: JSX.Element[] = [];
  for (let i = 0; i < props.pr.labels.length; i++) {
    labelBadges.push(<LabelBadge key={props.pr.labels[i].id} $primary={`#${props.pr.labels[i].color}`} className={"rounded-pill mx-1"}>{props.pr.labels[i].name}</LabelBadge>);
  }

  return (
    <a href={props.pr.html_url} target="_blank" className={"pr-row-link"}>
      <Row className={"pr-row py-2"}>
        <PullRequestIconColumn>
          {/* TODO: This should change based on PR review state */}
          <FaUserClock />
        </PullRequestIconColumn>
        <PullRequestIconColumn>
          <Image src={props.pr.user.avatar_url} roundedCircle style={{ height: "24px", width: "24px" }} />
        </PullRequestIconColumn>
        <PullRequestTitleColumn
          title={props.pr.title}
          author={props.pr.user.login}
          repo={props.pr.base.repo.full_name}
          prNumber={props.pr.number}
        />
        <Col className={"text-end"}>
          {labelBadges}
        </Col>
      </Row>
    </a>
  )
}
