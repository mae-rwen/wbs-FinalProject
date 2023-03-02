import React from "react";
import Button from "react-bootstrap/Button";
import "./SingleUser.css";
import Table from "react-bootstrap/Table";
import { useEffect, useContext, useState } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthProvider";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";

export default function SingleUser() {
  const { user } = useContext(AuthContext);
  //to show and hide the modal
  const [show, setShow] = useState(false);
  //logged in user info
  const [userP, setUserP] = useState({});
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userImage, setUserImage] = useState(null);
  //state for events of logged in user
  const [events, setEvents] = useState([]);
  //for pagination in events
  const [visible, setVisible] = useState(3);
  const length = events.length;

  useEffect(() => {
    axios.get(`/users/profile`).then((response) => {
      setUserP(response.data);
      setUserName(response.data?.name);
      setUserEmail(response.data?.email);
      setUserDescription(response?.data.description);
      setUserLocation(response.data?.location);
      axios.get(`/events?user=${response.data._id}`).then((response) => {
        setEvents(response.data);
      });
    });
  }, []);

  const userProfile = {
    email: userEmail,
    description: userDescription,
    name: userName,
    location: userLocation,
    profilePic: userImage,
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //testing by removing userprofile
    axios.put(`/users/${user._id}`, userProfile).then((response) => {
      setUserP({
        email: response.data?.email,
        description: response.data?.description,
        name: response.data?.name,
        location: response.data?.location,
        // profilePic: response.data?.profilePic,
      });
      console.log(response.data);
    });
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };

  const toBase64 = (userImage) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(userImage);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const uploadImage = async (e) => {
    const base64 = await toBase64(e.target.files[0]);
    setUserImage(base64);
  };
  return (
    <div>
      {/* <h1 className="text-center">Welcome {user.name}</h1> */}

      <div className="row">
        <div className="col-4 p-3 mx-4 personalInfo">
          <img
            className="myProfilePic"
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
          <h4>{userP.name}</h4>

          <Button variant="primary" onClick={handleShow}>
            Edit profile
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit your profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    // required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    value={userEmail}
                    name="email"
                    onChange={(e) => setUserEmail(e.target.value)}
                    // required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    // required
                    value={userLocation}
                    name="location"
                    onChange={(e) => setUserLocation(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <FloatingLabel controlId="floatingTextarea2">
                    <Form.Control
                      as="textarea"
                      placeholder="About me"
                      style={{ height: "100px" }}
                      value={userDescription}
                      name="description"
                      onChange={(e) => setUserDescription(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload profile picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="profileImage"
                    onChange={uploadImage}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={submitHandler}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="col ">
          <h3>About Me</h3>
          <h5 className="userDescription">{userP.description}</h5>
          <h3>Event created by me</h3>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Date</th>
                <th>Event Time</th>
                <th>Event Location</th>
              </tr>
            </thead>
            <tbody>
              {events.slice(0, visible).map((event, index) => {
                return (
                  <tr key={index}>
                    <td>{event.title}</td>
                    <td>{event.date}</td>
                    <td>{event.date}</td>
                    <td>{event.general_location}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Button variant="primary" onClick={loadMore}>
            Load more
          </Button>
        </div>
      </div>
    </div>
  );
}
