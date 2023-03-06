import React from "react";
import { useState } from "react";
import "./products.css";
import { ChakraProvider, Textarea } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import storage from "../../firebase/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    description: "",
  });
  const [selectedImage, setSelectedImage] = useState();
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
            try {
              const { data } = await axios.post(
                "http://localhost:4000/products/add-product",
                {
                  ...values,
                  image: url,
                },
                {
                  withCredentials: true,
                }
              );
              setValues({
                name: "",
                description: "",
              });
              setSelectedImage(null);
            } catch (error) {
              throw error.message;
            }
          });
        }
      );
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(values);
      upload([{ file: selectedImage, label: "img" }]);
    } catch (error) {
      throw error.message;
    }
  };
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
    },
    preview: {
      marginTop: 50,
      display: "flex",
      flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 120 },
    delete: {
      cursor: "pointer",
      padding: 15,
      background: "red",
      color: "white",
      border: "none",
    },
  };
  return (
    <ChakraProvider>
      <div className="main-container">
        <span className="add">Add product</span>

        <div className="forms">
          <form>
            <div>
              <label htmlFor="Product name">Product name </label>
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                value={values.name}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="description">Enter description</label>
              <Textarea
                name="description"
                value={values.description}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                placeholder="Here is a sample placeholder"
                size={"lg"}
              />
            </div>
            <div style={styles.container}>
              <input accept="image/*" type="file" onChange={imageChange} />

              {selectedImage && (
                <div style={styles.preview}>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    style={styles.image}
                    alt="Thumb"
                  />
                  <button onClick={removeSelectedImage} style={styles.delete}>
                    Remove This Image
                  </button>
                </div>
              )}
            </div>

            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </ChakraProvider>
  );
};
