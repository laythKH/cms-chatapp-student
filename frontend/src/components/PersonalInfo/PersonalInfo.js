import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import "./PersonalInfo.css";
import { json } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

function PersonalInfo() {
  const { t } = useAppContext();

  return (
    <Container>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>{t("Home.User.createUser.firstName")}:</td>
            <th>mario</th>
          </tr>
          <tr>
            <td>{t("Home.User.createUser.lastName")}:</td>
            <th>abood</th>
          </tr>
          <tr>
            <td>{t("Home.User.createUser.email")}:</td>
            <th>aboodhu0@gmail.com</th>
          </tr>
          <tr>
            <td>{t("Home.User.createUser.phoneNumber")}:</td>
            <th>+963962571799</th>
          </tr>
          <tr>
            <td>{t("Home.User.createUser.Gender.title")}:</td>
            <th>male</th>
          </tr>
          <tr>
            <td>{t("Home.User.createUser.city")}:</td>
            <th>Daraa</th>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default PersonalInfo;
