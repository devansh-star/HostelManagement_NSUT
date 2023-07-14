import React, { useState } from 'react';

import {
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Col,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardColumns,
  CardSubtitle,
  CardBody,
} from 'reactstrap';
import CreatePost from '../components/Modals/Modal';

const posts = [
  {
    image:
      'https://images.unsplash.com/photo-1626682005790-ea6e9c0b4d13?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'Jarvis',
    org: 'Owasp',
    des:
      'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
  },
  {
    image: undefined,
    title: 'Kite Flying Contest',
    org: 'khel parisar',
    des:
      'This card has supporting text below as a natural lead-in to additional content.',
  },
];

// render posts based on time ans sort it
function Posts(props) {
  const [post, setPost] = useState(true);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prevState) => {
      return !prevState;
    });
  };

  const onCreatePost = () => {
    setModal(true);
  };

  return (
    <>
      <div className="content">
        {modal && (
          <CreatePost
            modalOpen={modal}
            toggle={toggleModal}
            header="New Complaint"
          >
            <Form>
              <FormGroup>
                <Label for="exampleSelect">Select To</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>caretaker</option>
                  <option>mess-incharge</option>
                  <option>laundry-incharge</option>
                  <option>warden</option>
                </Input>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleFile" sm={2}>
                  Image
                </Label>
                <Col sm={10}>
                  <Input type="file" name="file" id="exampleFile" />
                  <FormText color="muted">
                    If the post contains an image, browse it from your device
                    and upload here. Add images only and not text files.
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for="problem">Title</Label>
                <Input />
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Description</Label>
                <Input type="textarea" name="text" id="exampleText" />
              </FormGroup>
              <FormGroup>
                <Label for="hostel">Organisation</Label>
                <Input />
              </FormGroup>
            </Form>
          </CreatePost>
        )}
        <Card body>
          <Row>
            <Col md="10">
              <CardTitle tag="h5">All Posts</CardTitle>
              <CardText>
                Hope you are having a pleasant experience, promote your Events
                and celebrations here :)
              </CardText>
            </Col>
            <Col md="2  ">
              <Button onClick={onCreatePost}>Create Post</Button>
            </Col>
          </Row>
        </Card>
        {post && (
          <CardColumns>
            {posts.map((el) => {
              if (el.image) {
                return (
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src={el.image}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle tag="h5">{el.title}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        {el.org}
                      </CardSubtitle>
                      <CardText>{el.des}</CardText>
                      <Button>Delete Post</Button>
                    </CardBody>
                  </Card>
                );
              } else {
                return (
                  <Card>
                    <CardBody>
                      <CardTitle tag="h5">{el.title}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        {el.org}
                      </CardSubtitle>
                      <CardText>{el.des}</CardText>
                      <Button>Delete Post</Button>
                    </CardBody>
                  </Card>
                );
              }
            })}
          </CardColumns>
        )}
      </div>
    </>
  );
}

export default Posts;
/**
            <Card
              body
              inverse
              style={{ backgroundColor: '#333', borderColor: '#333' }}
            >
              <CardTitle tag="h5">Special Title Treatment</CardTitle>
              <CardSubtitle tag="h6" className="mb-2">
                Card subtitle
              </CardSubtitle>
              <CardText>
                With supporting text below as a natural lead-in to additional
                content.
              </CardText>
              <Button>Delete Post</Button>
            </Card>*/
