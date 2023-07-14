import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  Button,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';

const maints = [
  {
    problem: 'Electricity not there',
    desc:
      "something random lorennn the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?",
    expD: '12-12-12',
    hostel: 'Hostel-H',
  },
  {
    problem: 'Water not there',
    desc:
      "something random lorennn the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?",
    expD: '13-12-12',
    hostel: 'Hostel-A',
  },
];

function Maintenance() {
  const [maint, setMaint] = useState(false);
  const allMaints = maints.map((el) => {
    return (
      <Col md="4" key={el.problem}>
        <Card>
          <CardHeader tag="h3">Attention!!</CardHeader>
          <CardBody>
            <CardTitle tag="h5">{el.problem}</CardTitle>
            <CardText>{el.desc}</CardText>
            <h5>{el.expD}</h5>
          </CardBody>
          <CardFooter className="text-muted">{el.hostel}</CardFooter>
        </Card>
      </Col>
    );
  });

  return (
    <>
      <div className="content">
        {maint && <Row>{allMaints}</Row>}
        {!maint && (
          <Col sm="4">
            <Card body>
              <CardTitle tag="h5">No Current Maintenance</CardTitle>
              <CardText>
                Everything is working fine, In case you run into a problem
                report it to the authorities.
              </CardText>
              <a href="/complaint">
                <Button>Create Complaint</Button>
              </a>
            </Card>
          </Col>
        )}
      </div>
    </>
  );
}

export default Maintenance;
