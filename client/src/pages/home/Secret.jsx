import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./home.css";

import {
  Card,
  CardBody,
  Stack,
  Heading,
  ChakraProvider,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import Navbar from "../../components/navbar/NavBar";

function Secret() {
  const navigate = useNavigate();
  const [cookies, setCookies, deleteCookies] = useCookies([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          deleteCookies("jwt");
          navigate("/login");
        } else toast(`Hi ${data.user}`, { theme: "dark" });
      }
    };
    verifyUser();
  }, [cookies, navigate, deleteCookies]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/products/get-product")
        .then((response) => {
          setProduct(response.data);
        });
    } catch (error) {
      throw error;
    }
  }, []);

  const handleLogout = () => {
    deleteCookies("jwt");
    navigate("/login ");
  };
  return (
    <ChakraProvider>
      <Navbar />
      <div className="mainDiv">
        <div className="private">
          {/* <h2>Product page</h2> */}

          {product.map((product, index) => {
            return (
              <Card key={index} maxW="sm" className="cards">
                <CardBody className="card-body">
                  <Image
                    className="card-image"
                    src={product.image}
                    alt={product.name}
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{product.name}</Heading>
                    <Text fontSize="2xl">{product.description}</Text>
                  </Stack>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </ChakraProvider>
  );
}
export default Secret;
