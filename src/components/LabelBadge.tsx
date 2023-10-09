import { Badge } from "react-bootstrap";
import styled from "styled-components";

export const LabelBadge = styled(Badge) <{ $primary: string }>`
background: ${props => props.$primary + "20"} !important;
color: ${props => props.$primary};
border: 1px solid;
`;
