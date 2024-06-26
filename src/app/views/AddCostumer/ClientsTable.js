import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Icon,
  Table,
  styled,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton
} from "@mui/material";

// STYLED COMPONENT
const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } }
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } }
  }
}));

export default function ClientsTable() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/getclients')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Cell</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Source</TableCell>
      
            <TableCell align="center">Created On</TableCell>
           
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell align="left">{client.Name}</TableCell>
              <TableCell align="center">{client.Cell}</TableCell>
              <TableCell align="center">{client.Phone}</TableCell>
              <TableCell align="center">{client.Email}</TableCell>
              <TableCell align="center">{client.Address}</TableCell>
              <TableCell align="center">{client.Source}</TableCell>
              <TableCell align="center">{new Date(client.createdOn).toLocaleString()}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <Icon color="error">close</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
}
