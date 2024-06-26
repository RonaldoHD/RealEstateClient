import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { Name, endpoint } from '../GlobalFunctions'
import { Stack } from "@mui/material";
import { SimpleCard } from "app/components";
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



const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
  }));




export default function ClientRequest() {

    const [array , setArray] = useState([]);

    useEffect(() => {
        axios.get(`${endpoint}/api/getclientrequests`)
          .then(response => {
          setArray(response.data)
            console.log('requests : ' , response.data)
          })
          .catch(error => {
            console.error('There was an error fetching the data!', error);
          });
      }, []);

  return (
    <Container>
       <Stack spacing={3}>
       <SimpleCard title="Clients Request">

      <Box width="100%" overflow="auto">
      <StyledTable>

        <TableHead>
          <TableRow>
            <TableCell align="left">Owner</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">District</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Sale/Rent</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {array.map((property, index) => (
            <TableRow key={property.id || index}   style={{ cursor:'pointer'}} >
              <TableCell align="left">{property.owner}</TableCell>
              <TableCell align="center">{property.type}</TableCell>
              <TableCell align="center">{property.district}</TableCell>
              <TableCell align="center">{property.city}</TableCell>

              <TableCell align="center">
              <a className={`tag ${property.sale_rent}`}>{property.sale_rent}</a>
              </TableCell>

              <TableCell align="center">${property.price}</TableCell>
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
    </SimpleCard>
  
  </Stack>
    </Container>

  );
}
