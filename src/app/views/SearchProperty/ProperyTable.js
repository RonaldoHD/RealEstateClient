import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal } from 'antd';
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

export default function PropertyTable({ array , showModal }) {


  const DisableProperty = ()=>{
    alert('dadad')
  }
  return (
    <div>
    

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
            <TableRow key={property.id || index}  onClick={() => showModal(property.id)} style={{ cursor:'pointer'}} >
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
                  <Icon color="Edit"  >edit</Icon>
                </IconButton>
                

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
    </div>

  );
}
