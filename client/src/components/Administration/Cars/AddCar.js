import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { addCar } from "../../../api/cars";
import Resizer from "react-image-file-resizer";

const AddCar = ({ onSubmit }) => {
  const [carData, setCarData] = useState({
    brand: "",
    car_name: "",
    fuel_type: "",
    price: null,
    year: null,
    mileage: null,
    seat: null,
    doors: null,
    automatic: "",
    description: "",
  });

  const [gallery, setGallery] = useState([]);
  const [image_path, setImage_path] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    Resizer.imageFileResizer(
      selectedFile,
      374,
      374,
      "PNG",
      100,
      0,
      (blob) => {
        setImage_path(blob);
      },
      "blob"
    );
  };

  const handleGalleryChange = (e) => {
    const selectedFiles = [...e.target.files];
    const resizedImages = [];

    selectedFiles.forEach((file, index) => {
      Resizer.imageFileResizer(
        file,
        374,
        374,
        "PNG",
        100,
        0,
        (blob) => {
          resizedImages.push(blob);

          if (resizedImages.length === selectedFiles.length) {
            setGallery(resizedImages);
          }
        },
        "blob"
      );
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(carData).forEach((key) => {
        formData.append(key, carData[key]);
      });

      formData.append("image_path", image_path);
      gallery.forEach((file) => {
        formData.append(`gallery`, file);
      });

      const response = await addCar(formData);
      toast.success(response.data.info);
      onSubmit();
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  };

  const date = new Date();
  const year = date.getFullYear();

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="brand">
        <Form.Label>Marque</Form.Label>
        <Form.Control
          type="text"
          name="brand"
          value={carData.brand}
          onChange={handleInputChange}
          placeholder="Entrez la marque"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="car_name">
        <Form.Label>Nom de la voiture</Form.Label>
        <Form.Control
          type="text"
          name="car_name"
          value={carData.car_name}
          onChange={handleInputChange}
          placeholder="Entrez le nom de la voiture"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="fuel_type">
        <Form.Label>Type de carburant</Form.Label>
        <Form.Control
          as="select"
          name="fuel_type"
          value={carData.fuel_type}
          onChange={handleInputChange}
          required
        >
          <option value="">Sélectionnez le type de carburant</option>
          <option value="gazole">Gazole</option>
          <option value="essence">Essence</option>
          <option value="hybride">Hybride</option>
          <option value="electrique">Électrique</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Prix</Form.Label>
        <Form.Control
          type="number"
          name="price"
          min="0"
          max="100000"
          value={carData.price}
          onChange={handleInputChange}
          placeholder="Entrez le prix"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="year">
        <Form.Label>Année de mise en circulation</Form.Label>
        <Form.Control
          type="number"
          name="year"
          min="2000"
          max={year}
          value={carData.year}
          onChange={handleInputChange}
          placeholder="Entrez l'année de mise en circulation"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="mileage">
        <Form.Label>Kilométrage</Form.Label>
        <Form.Control
          type="number"
          name="mileage"
          min="0"
          max="500000"
          value={carData.mileage}
          onChange={handleInputChange}
          placeholder="Entrez le kilométrage"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="seat">
        <Form.Label>Nombre de places</Form.Label>
        <Form.Control
          as="select"
          name="seat"
          value={carData.seat}
          onChange={handleInputChange}
          required
        >
          <option value="">Sélectionnez le nombre de places</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="9">9</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="doors">
        <Form.Label>Nombre de portes</Form.Label>
        <Form.Control
          as="select"
          name="doors"
          value={carData.doors}
          onChange={handleInputChange}
          required
        >
          <option value="">Sélectionnez le nombre de portes</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="automatic">
        <Form.Label>Transmission</Form.Label>
        <Form.Control
          as="select"
          name="automatic"
          value={carData.automatic}
          onChange={handleInputChange}
          required
        >
          <option value="">Sélectionnez le type de transmission</option>
          <option value="Manuelle">Manuelle</option>
          <option value="Automatique">Automatique</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={carData.description}
          onChange={handleInputChange}
          placeholder="Entrez la description"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image Principale</Form.Label>
        <Form.Control
          type="file"
          onChange={handleImageChange}
          name="image"
          accept="image/png, image/jpeg"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="gallery">
        <Form.Label>Galerie d'images</Form.Label>
        <Form.Control
          type="file"
          onChange={handleGalleryChange}
          name="gallery"
          multiple
          accept="image/png, image/jpeg"
          required
        />
      </Form.Group>
      <button type="submit" className="custom__btn m-auto mt-5 form__btn">
        Ajouter la voiture
      </button>
    </Form>
  );
};

export default AddCar;
