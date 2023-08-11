import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import "./PersonalInfo.css";
import { json } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

function PersonalInfo() {
  const { t } = useAppContext();
  const { user } = useAppContext()

  useEffect(() => {

  }, [user])

  return (
    <Container>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>{t("Home.User.createUser.firstName")}:</td>
            <th>{user?.firstName}</th>
          </tr>
          <tr>
            <td>{t("Home.User.createUser.lastName")}:</td>
            <th>{user?.lastName}</th>
          </tr>
          <tr>
            <td>{t("Home.User.createUser.email")}:</td>
            <th>{user?.email}</th>
          </tr>
          <tr>
            <td>{t("Home.User.createUser.phoneNumber")}:</td>
            <th>{user?.phoneNumber}</th>
          </tr>
          <tr>
            <td>{t("Home.User.createUser.Gender.title")}:</td>
            <th>{user?.gender}</th>
          </tr>
          <tr>
            <td>{t("Home.User.createUser.id")}:</td>
            <th>{user?.studentNumber}</th>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default PersonalInfo;
