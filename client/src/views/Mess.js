import React from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Menu from "../assets/img/1810155.jpg";

function MessMenu() {
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>Mess Menu</CardHeader>
                            <hr style={{ marginLeft: 15, marginRight: 15 }} />
                            <CardBody>
                                <img src={Menu} alt="friends or mess menu" />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default MessMenu;
