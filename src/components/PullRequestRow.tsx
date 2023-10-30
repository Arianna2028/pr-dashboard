import { Row, Image, Col } from "react-bootstrap";
import { PullRequestIconColumn } from "./PullRequestIconColumn";
import { PullRequestTitleColumn } from "./PullRequestTitleColumn";
import { FaUserClock } from "react-icons/fa";
import { LabelBadge } from "./LabelBadge";
import { PullRequestObject } from "../backend/models/PullRequestObject";
import "./PullRequestRow.css";
import { BsCheckCircleFill } from "react-icons/bs";
import { VscGitPullRequestDraft, VscRequestChanges } from "react-icons/vsc";

interface PullRequestRowProps {
  pr: PullRequestObject;
}

export function PullRequestRow(props: PullRequestRowProps) {
  var labelBadges: JSX.Element[] = [];
  for (let i = 0; i < props.pr.labels.length; i++) {
    labelBadges.push(<LabelBadge key={props.pr.labels[i].id} $primary={`#${props.pr.labels[i].color}`} className={"rounded-pill mx-1"}>{props.pr.labels[i].name}</LabelBadge>);
  }

  let reviewIcon: JSX.Element;
  if (props.pr.draft) {
    reviewIcon = <VscGitPullRequestDraft className="review-icon-draft" />
  } else if (props.pr.myApprovalStatus === "APPROVED") {
    reviewIcon = <BsCheckCircleFill className="review-icon-approved" />;
  } else if (props.pr.myApprovalStatus === "CHANGES_REQUESTED") {
    reviewIcon = <VscRequestChanges className="review-icon-changes-requested" />
  } else {
    reviewIcon = <FaUserClock className="review-icon-unreviewed" />
  }

  return (
    <a href={props.pr.html_url} target="_blank" className={"pr-row-link"}>
      <Row className={"pr-row py-2"}>
        <PullRequestIconColumn>
          {reviewIcon}
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
        <Col xs={"auto"} className={"text-end"}>
          {labelBadges}
        </Col>
      </Row>
    </a>
  )
}
