import { Col, Row } from "react-bootstrap";

interface PullRequestTitleColumnProps {
  title: string;
  author: string;
  repo: string;
  prNumber: number;
}


export function PullRequestTitleColumn(props: PullRequestTitleColumnProps) {
  return (
    <Col>
      <Row>
        <Col style={{ fontSize: "14px", fontWeight: "bold" }}>{props.title}</Col>
      </Row>
      <Row>
        <Col style={{ fontSize: "12px" }}>
          {props.author} &#x2022; {props.repo} #{props.prNumber}
        </Col>
      </Row>
    </Col>
  )
}
