import React from "react";
import { Container } from "react-bootstrap";
import "./PersonalInfo.css";

function PersonalInfo() {
  return (
    <Container>
      <table>
        <tbody>
          <tr>
            <th>password</th>
            <td>000000</td>
            <th>name</th>
            <td>markio</td>
          </tr>
          <tr>
            <td>mario</td>
            <td>laith</td>
            <td>abeer</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

export default PersonalInfo;
