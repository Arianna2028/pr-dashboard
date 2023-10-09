import { ReactNode } from "react";
import { Col } from "react-bootstrap";

interface PullRequestIconColumnProps {
  children: ReactNode;
}


export function PullRequestIconColumn(props: PullRequestIconColumnProps) {
  return (
    <Col xs={"auto"} className={`text-center my-auto`}>
      <div style={{ width: "24px" }}>
        {props.children}
      </div>
    </Col>
  )
}
