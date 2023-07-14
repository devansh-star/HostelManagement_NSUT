import React from 'react';
// react plugin for creating notifications over the dashboard
// reactstrap components
import {
  Button,
  Card,
  CardText,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';

function Laundry() {
  return (
    <>
      <div className="content">
        <Card body>
          <Row>
            <Col md="10">
              <CardTitle tag="h5">My laundry Receipts</CardTitle>
              <CardText>
                Hope you are having a pleasant experience, promote your Events
                and celebrations here :)
              </CardText>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default Laundry;
