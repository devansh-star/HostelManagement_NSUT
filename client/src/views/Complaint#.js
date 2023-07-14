import React, { useState } from 'react';
import Swal from 'sweetalert2';
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
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import CreateModal from '../components/Modals/Modal';

const comps = [
  {
    problem: 'Electricity not there',
    desc:
      "something random lorennn the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?",
    status: 'pending',
    hostel: 'Hostel-H',
  },
  {
    problem: 'Water not there',
    desc:
      "something random lorennn the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?",
    status: 'pending',
    hostel: 'Hostel-A',
  },
];

function Complaint() {
  const [comp, setComp] = useState(true);
  const [modal, setModal] = useState(false);

  const resolveComplaint = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, completed!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Completed!',
          'Your have returned back to the hostel.',
          'success'
        );
      }
    });
  };

  const allComps = comps.map((el) => {
    return (
      <Col md="4" key={el.problem}>
        <Card>
          <CardHeader tag="h3">{el.status}</CardHeader>
          <CardBody>
            <CardTitle tag="h5">{el.problem}</CardTitle>
            <CardText>{el.desc}</CardText>
            <Button color="danger" onClick={resolveComplaint}>
              Complaint Resolved
            </Button>
          </CardBody>

          <CardFooter className="text-muted">{el.hostel}</CardFooter>
        </Card>
      </Col>
    );
  });

  const toggleModal = () => {
    setModal((prevState) => {
      return !prevState;
    });
  };

  const createComp = () => {
    setModal(true);
  };

  return (
    <>
      <div className="content">
        {modal && (
          <CreateModal
            modalOpen={modal}
            toggle={toggleModal}
            header="New Complaint"
          >
            <Form>
              <FormGroup>
                <Label for="problem">Problem</Label>
                <Input />
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Description</Label>
                <Input type="textarea" name="text" id="exampleText" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleDate">Expected Date</Label>
                <Input type="date" name="date" placeholder="date" />
              </FormGroup>
              <FormGroup>
                <Label for="hostel">Hostel</Label>
                <Input />
              </FormGroup>
            </Form>
          </CreateModal>
        )}
        <Card body>
          <Row>
            <Col md="10">
              <CardTitle tag="h5">All Complaints</CardTitle>
              {!comp && (
                <CardText>
                  Hope you are having a pleasant experience, lodge a complaint
                  in case of any problems.
                </CardText>
              )}
            </Col>
            <Col md="2  ">
              <Button onClick={createComp}>Create Maintenance</Button>
            </Col>
          </Row>
        </Card>
        {comp && <Row>{allComps}</Row>}
      </div>
    </>
  );
}

export default Complaint;
