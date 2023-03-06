import React, { useEffect, useState } from "react";
import axios from "axios";

import { ChakraProvider, Flex } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const Tables = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    try {
      axios.get("http://localhost:4000/getUser").then((response) => {
        console.log(response);
        setUserData(response.data);
      });
    } catch (error) {
      throw error;
    }
  }, []);
  return (
    <ChakraProvider>
      <div className="main-container">
        <h1>table component</h1>
        <TableContainer mx={"auto"} mt={5}>
          <Table variant="simple" size={"lg"}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                  </tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </ChakraProvider>
  );
};

export default Tables;
