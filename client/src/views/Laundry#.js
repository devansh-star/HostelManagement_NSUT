import React, { useRef, useState, useEffect } from 'react';
// react plugin for creating notifications over the dashboard
// reactstrap components
import {
  Button,
  Card,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  CardHeader,
  CardBody,
  FormText,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';
import CreateLaundry from '../components/Modals/Modal';

let clothes = [];

function Laundry() {
  const [laund, setLaund] = useState(true);
  const [modal, setModal] = useState(false);
  // const clothTypeRef = useRef(null);
  // const clothAmountRef = useRef(null);
  // const clothTornRef = useRef(null);
  const [type, setType] = useState();
  const [amount, setAmnt] = useState();
  const [torn, setTorn] = useState();

  const toggleModal = () => {
    setModal((prevState) => {
      return !prevState;
    });
  };

  const typeChangeHandler = (event) => {
    setType(event.target.value);
  };
  const amntChangeHandler = (event) => {
    setAmnt(event.target.value);
  };
  const tornChangeHandler = (event) => {
    setTorn(event.target.value);
  };

  const onCreateLaundry = () => {
    setModal(true);
  };

  const addItemHandler = () => {
    // console.log(clothTypeRef.current.value);
    const newItem = {
      type,
      amount,
      torn,
    };

    clothes.push(newItem);
    console.log(clothes);
  };

  return (
    <>
      <div className="content">
        {modal && (
          <CreateLaundry
            modalOpen={modal}
            toggle={toggleModal}
            header="New Laundry"
          >
            <Form>
              <FormGroup>
                <Label for="problem">Laundry Number</Label>
                <Input />
              </FormGroup>
              <FormGroup>
                <Label for="problem">Phone Number</Label>
                <Input />
              </FormGroup>
              <FormGroup>
                <Label for="hostel">Number of Days</Label>
                <Input />
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="6">
                    <Label for="exampleSelect">Select Type</Label>
                    <Input
                      onChange={typeChangeHandler}
                      type="select"
                      name="select"
                      id="exampleSelect"
                    >
                      <option>Jeans</option>
                      <option>Shirt</option>
                      <option>T-shirt</option>
                      <option>Towel</option>
                      <option>Kurta</option>
                      <option>Pants</option>
                      <option>Lowers</option>
                      <option>Jacket</option>
                    </Input>
                  </Col>
                  <Col md="3">
                    <Label for="exampleSelect">Quantity</Label>
                    <Input
                      onChange={amntChangeHandler}
                      type="number"
                      name="number"
                      id="exampleNumber"
                      placeholder="total"
                    />
                  </Col>
                  <Col md="3">
                    <Label for="exampleSelect">Torn</Label>
                    <Input
                      onChange={tornChangeHandler}
                      type="select"
                      name="select"
                      id="exampleSelect"
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </Input>
                  </Col>
                </Row>
                <Button onClick={addItemHandler}>Add Items</Button>
              </FormGroup>
              <FormGroup>
                {clothes.forEach((el) => {
                  if (!el.torn) {
                    return <Button>Jeans ({el.amount})</Button>;
                  } else {
                    return <Button color="danger">Jeans ({el.amount})</Button>;
                  }
                })}
              </FormGroup>
            </Form>
          </CreateLaundry>
        )}
        <Card body>
          <Row>
            <Col md="10">
              <CardTitle tag="h5">Laundry Receipts</CardTitle>
              <CardText>
                Hope you are having a pleasant experience, promote your Events
                and celebrations here :)
              </CardText>
            </Col>
            <Col md="2">
              <Button onClick={onCreateLaundry}>Create Receipt</Button>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default Laundry;
