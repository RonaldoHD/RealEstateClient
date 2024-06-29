import {React, useState } from "react";
import { Box, styled } from "@mui/material";
import { Name, endpoint } from '../GlobalFunctions'
import { Input } from 'antd';
import { Breadcrumb, SimpleCard } from "app/components";
import ClientsTable from './ClientsTable'
import './addcostumer.css'
import { Button, Fab, Icon, IconButton} from "@mui/material";

const { TextArea } = Input;
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

// STYLED COMPONENTS
const AppButtonRoot = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  },
  "& .button": { margin: theme.spacing(1) },
  "& .input": { display: "none" }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}));

export default function Register(){


  const handleSubmit = async (event)=>{
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData)
  }



  return(
    <Container>
       <SimpleCard>
        <div style={{display:'flex', justifyContent:'space-between' , alignContent:'center' }} >
        <h1>Add Costumer</h1> 

        </div>
         

          <form onSubmit={handleSubmit}>  

            <div className="formdiv" >
            <label>Name</label>
              <Input name="name" placeholder="name" />

              <label>Cell</label>
              <Input name="cell" placeholder="cell" />

              <label>Phone</label>
              <Input placeholder="phone" />
            </div>
             <br></br>

               <div className="formdiv">
               <label>Email</label>
              <Input placeholder="email" />
    
              <label>Adress</label>
                <Input placeholder="Basic usage" />

              <label>Source</label>
              <Input placeholder="Basic usage" />

               </div>

<br></br>
               <div className="formdiv" >
               <label>CreatedOn</label>
              <Input type="date" placeholder="Basic usage" />

              <label>Info</label>
              <TextArea rows={2} placeholder="maxLength is 6" maxLength={6} />

               </div>
              
               <StyledButton variant="contained" color="secondary" type="submit"
                style={{display:'flex' , gap:"10px" , height:'45px' , padding:'12px' , float:'right'}}>
                  <Icon>add_circle_outline</Icon>
                  Add Costumer
                </StyledButton>
      
          </form>

<br></br>
<br></br>
        <ClientsTable/>
        </SimpleCard>
    </Container>
  )
 
}

