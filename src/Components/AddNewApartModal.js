import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

import MiniMap from "./MiniMapElement";


function AddNewApartment() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(null);
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [image, setImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    const url = "http://127.0.0.1:8000/api/aparts/";
    var csrftoken = getCookie("csrftoken");

    let form_data = new FormData();
    form_data.append("title", title);
    form_data.append("price", price);
    form_data.append("location", location);
    form_data.append("lat", lat);
    form_data.append("lng", lng);
    form_data.append("image", image);

    axios.post(url, form_data, {
      headers: {
        "content-type": "multipart/form-data",
        "X-CSRFToken": csrftoken,
      },
    });
    setShow(false);
  };

  const handleChangeTitle = (e) => {
    var value = e.target.value;
    setTitle(value);
  };

  const handleChangePrice = (e) => {
    var value = e.target.value;
    setPrice(value);
  };

  const handleChangeLocation = (e) => {
    var value = e.target.value;
    setLocation(value);
  };

  const handleChangeImage = (e) => {
    var value = e.target.files[0];
    setImage(value);
  };

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  return (
    <>
      <Button className="btn_to_rent" onClick={handleShow}>
        <span className="btn_to_rent_text">Здати в оренду</span>
        <i className="bi bi-plus-lg"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Здати в оренду</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Введіть назву" onChange={handleChangeTitle} />
              <Form.Label>Price</Form.Label>
              <Form.Control type="digit" placeholder="Введіть ціну" onChange={handleChangePrice} />
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Введіть місцезнаходження" onChange={handleChangeLocation} />



              <Form.Label>Latitude and Longotude</Form.Label>
              <MiniMap text={{
                  features: [{ geometry: { coordinates: [24.71046, 48.922466] } }],
                  query: "new location"
                }}
                setLat={setLat}
                setLng={setLng}
              />

              <Form.Label>Image</Form.Label>
              <Form.Control type="file" placeholder="Виберіть фото" onChange={handleChangeImage} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Закрити
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Зберегти
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddNewApartment;
