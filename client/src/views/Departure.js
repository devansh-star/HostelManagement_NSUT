import React, { useState } from "react";
import Swal from "sweetalert2";
// reactstrap components
//import Button from "elements/CustomButton/CustomButton.js";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

function Departure() {
    const [dep, setDep] = useState(false);
    let dt = new Date();
    const [newDep, setNewDep] = useState({ start: dt });

    const createNewDeparture = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Departure Details",
            html:
                '<h6 class="inputPadding">Place</h6>' +
                '<input id="swal-input1" class="swal2-input" placeholder="Place">' +
                '<h6 class="inputPadding" style="margin-top: 30px; margin-bottom: 1px ">Duration</h6>' +
                '<input id="swal-input2" class="swal2-input" placeholder="Duration">' +
                '<h6 class="inputPadding" style="margin-top: 30px; margin-bottom: 1px ">Reason</h6>' +
                '<input id="swal-input3" class="swal2-input" placeholder="Reason">' +
                '<h6 class="inputPadding" style="margin-top: 30px; margin-bottom: 1px ">Room Number</h6>' +
                '<input id="swal-input4" class="swal2-input" placeholder="Room Number">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value,
                    document.getElementById("swal-input3").value,
                    document.getElementById("swal-input4").value,
                ];
            },
        });

        if (formValues && formValues[1] !== "") {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

            Toast.fire({
                icon: "success",
                title: "Departure Created",
            });
            // console.log("ireached here");
            let endDate = new Date();
            // console.log(endDate);
            endDate.setDate(endDate.getDate() + parseInt(formValues[1]));

            setNewDep((prevState) => {
                return {
                    ...prevState,
                    place: formValues[0],
                    duration: parseInt(formValues[1]),
                    reason: formValues[2],
                    roomNum: formValues[3],
                    end: endDate,
                };
            });
            setDep(true);
        } else {
            return;
        }
    };

    const completeDeparture = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, completed!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    "Completed!",
                    "Your have returned back to the hostel.",
                    "success"
                );
                setDep(false);
            }
        });
    };

    const updateDeparture = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Update Departure Details",
            html:
                "<h5>Please Re-Enter the place</h5>" +
                '<h6 class="inputPadding">Place</h6>' +
                '<input id="swal-input1" class="swal2-input" placeholder="Place">' +
                '<h6 class="inputPadding" style="margin-top: 30px; margin-bottom: 1px ">Duration</h6>' +
                '<input id="swal-input2" class="swal2-input" placeholder="Duration">' +
                '<h6 class="inputPadding" style="margin-top: 30px; margin-bottom: 1px ">Reason</h6>' +
                '<input id="swal-input3" class="swal2-input" placeholder="Reason">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value,
                    document.getElementById("swal-input3").value,
                ];
            },
        });

        // console.log(formValues);

        if (formValues && formValues[1] !== "") {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

            Toast.fire({
                icon: "success",
                title: "Departure Updated",
            });

            setNewDep((prevState) => {
                let endDate = prevState.end;
                endDate.setDate(endDate.getDate() + parseInt(formValues[1]));
                console.log(endDate);
                return {
                    ...prevState,
                    place: formValues[0],
                    duration: parseInt(formValues[1]),
                    reason: formValues[2],
                    end: endDate,
                };
            });
            setDep(true);
        }
    };

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="demo-icons">
                            <CardHeader>
                                <CardTitle tag="h3">My Departures</CardTitle>
                                <p className="card-category">
                                    Timely update your departures incase of
                                    extensions.
                                </p>
                            </CardHeader>
                            <CardBody className="all-icons">
                                <div id="icons-wrapper">
                                    {dep && (
                                        <section>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    verticalAlign: "center",
                                                }}
                                            >
                                                <h5>Start Date:</h5>
                                                <p
                                                    style={{
                                                        marginLeft: 20,
                                                        fontSize: "1.1rem",
                                                        marginTop: 3,
                                                        color: "#9a9a9a",
                                                    }}
                                                >
                                                    {
                                                        newDep.start
                                                            .toString()
                                                            .split("GMT")[0]
                                                    }
                                                </p>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    verticalAlign: "center",
                                                }}
                                            >
                                                <h5>End Date:</h5>
                                                <p
                                                    style={{
                                                        marginLeft: 20,
                                                        fontSize: "1.1rem",
                                                        marginTop: 3,
                                                        color: "#9a9a9a",
                                                    }}
                                                >
                                                    {
                                                        newDep.end
                                                            .toString()
                                                            .split("GMT")[0]
                                                    }
                                                </p>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    verticalAlign: "center",
                                                }}
                                            >
                                                <h5>Reason:</h5>
                                                <p
                                                    style={{
                                                        marginLeft: 20,
                                                        fontSize: "1.1rem",
                                                        marginTop: 3,
                                                        color: "#9a9a9a",
                                                    }}
                                                >
                                                    {newDep.reason}
                                                </p>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    verticalAlign: "center",
                                                }}
                                            >
                                                <h5>Place:</h5>
                                                <p
                                                    style={{
                                                        marginLeft: 20,
                                                        fontSize: "1.1rem",
                                                        marginTop: 3,
                                                        color: "#9a9a9a",
                                                    }}
                                                >
                                                    {newDep.place}
                                                </p>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    verticalAlign: "center",
                                                }}
                                            >
                                                <h5>Room Number:</h5>
                                                <p
                                                    style={{
                                                        marginLeft: 20,
                                                        fontSize: "1.1rem",
                                                        marginTop: 3,
                                                        color: "#9a9a9a",
                                                    }}
                                                >
                                                    {newDep.roomNum}
                                                </p>
                                            </div>
                                            <Button
                                                color="default"
                                                style={{ marginRight: 8 }}
                                                onClick={updateDeparture}
                                            >
                                                Update Departure
                                            </Button>
                                            <Button
                                                color="danger"
                                                onClick={completeDeparture}
                                            >
                                                Completed Early?
                                            </Button>
                                        </section>
                                    )}
                                    {!dep && (
                                        <div>
                                            <h5>
                                                You currently have no
                                                departures.
                                            </h5>
                                            <Button
                                                color="success"
                                                onClick={createNewDeparture}
                                            >
                                                Create New
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Departure;
