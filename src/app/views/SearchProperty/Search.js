import {React, useState ,useEffect } from "react";
import { Button, Stack, Checkbox , Snackbar ,Alert ,Icon } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Input, Select, Space , Modal , Radio } from 'antd';
import { Breadcrumb, SimpleCard } from "app/components";
import { Name, endpoint } from '../GlobalFunctions'
import axios from "axios";
import PropertyTable from "./ProperyTable";
import ModalContent from "./ModalContent";
import Edit from './Edit.js'
import './search.css';
import './singleproduct.css';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function Search(){

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [singleproperty , setSingleProperty] = useState([])
  const [imagesLength , setimagesLength] = useState('')
  const [editing, setEditing] = useState(false);
  const [ConfirmformValues , setConfirmValues ] = useState([]) 

  const showModal = (id) => {
    setSelectedPropertyId(id);

    axios.get(`${endpoint}/api/getsingleproperty/${id}`)
        .then(response => {
         setSingleProperty(response);
         setIsModalOpen(true);
    })
    .catch(error => {
      console.error('There was an error fetching the Propertyyy!', error);
    });


  }

  const handleOk = () => {
    setIsModalOpen(false);
    setEditing(false)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditing(false)
  };

  const handleConfirm =async() => {
      await axios.post(`${endpoint}/api/addclientrequest`, ConfirmformValues, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        alert('client added succesfully')
        console.log("Added to client request:", response.data);
      })
      .catch(error => {
        console.error('There was an error adding the client request!', error);
      });

      setIsConfirmModalOpen(false);
  };
  

  const handleCancelConfirm = () => {
    setIsConfirmModalOpen(false);
  
  };
  
  const EnableEdit =()=>{
    setEditing(true)
  }

  const [selectedType, setSelectedType] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [properties, setProperties] = useState([]);
  const [sale_rent, setsale_rent] = useState("sale");

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  const handleRadioChange = (e) => {
    setsale_rent(e.target.value)
  };

  // const oepnConfirm = () => {
  //   setIsConfirmModalOpen(true)
  // };
  
  useEffect(() => {
    axios.get(`${endpoint}/api/getallproperties`)
      .then(response => {
        setProperties(response.data);
        console.log("Alll Propertiessss : " , properties)
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);




  const handleSubmit = async(event) => {
    setIsConfirmModalOpen(true)
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    setConfirmValues(formValues)
    // Add selected values to formValues
    formValues.type = selectedType;
    formValues.district = selectedDistrict;
    formValues.city = selectedCity;

    console.log(formValues);
    try {
      const response = await axios.post(`${endpoint}/api/searchproperty`, formValues);
      console.log(response.data); // Handle the response from the backend
      setProperties(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
 
  return(
    <Container>

     <Modal title="Property Details" open={isModalOpen} onOk={handleOk}  onCancel={handleCancel} width={1000} >
      <div className='modalButtons'>

      <Button variant="contained" color="secondary"  
      style={{display:'flex' , gap:'12px'}} >  
      <Icon>delete</Icon>
          Disable</Button>


      <Button variant="contained" color="secondary"  style={{display:'flex' , gap:'12px'}} onClick={EnableEdit}>  
      <Icon>border_color</Icon>
          Edit</Button>

          <Button variant="contained" color="secondary"  style={{display:'flex' , gap:'12px'}} onClick={EnableEdit}>  
      <Icon>near_me</Icon>
          Share</Button>
        </div>
  
          {editing ?  <Edit thisproperty={singleproperty} /> :  <ModalContent thisproperty={singleproperty}   /> }
      </Modal>


      <Modal title="Client Request" open={isConfirmModalOpen} onOk={handleConfirm} onCancel={handleCancelConfirm}>
        <p>Would you like to add this as a cLient Request ?</p>

      </Modal>


      <Stack spacing={3}>
        <SimpleCard title="Search a property">
       

        <form onSubmit={handleSubmit} noValidate  
        style={{display:'flex' , flexDirection:"column" , gap:'20px'}}>

        <div className="dropdownDiv" >
          <div className="dropdowns" >
          <label>Owner</label>
          <Input placeholder="Owner" type="text" name="owner" required className="inputsTop" />
          </div>
          
          <div className="dropdowns" >
          <label>Type</label>
            <Select  name='type'  className="inputsTop" onChange={handleTypeChange} >
            <option value=''></option>
                <option value='apartment'>Apartment</option>
                <option value='house'>House</option>
                <option value='villa'>Villa</option>
                <option value='condo'>Condo</option>
                <option value='office'>Office</option>
                <option value='showroom'>Showroom</option>
                <option value='store'>Store</option>
                <option value='townhouse'>Townhouse</option>
                <option value='commercial'>Commercial</option>
                <option value='land'>Land</option>
                <option value='other'>Other</option>
            </Select>
          </div>
        
          <div className="dropdowns" >
              <label>District</label>
              <Select name='district' className="inputsTop" onChange={handleDistrictChange} >
              <option value=""></option>
              <option value="Beirut">Beirut</option>
              <option value="Bekaa - Baalbeck">Bekaa - Baalbeck</option>
              <option value="Bekaa - Hermel">Bekaa - Hermel</option>
              <option value="Bekaa - Rachaya">Bekaa - Rachaya</option>
              <option value="Bekaa - west">Bekaa - west</option>
              <option value="Bekaa - Zahle">Bekaa - Zahle</option>
              <option value="Cyprus - Larnaca">Cyprus - Larnaca</option>
              <option value="Cyprus - Other">Cyprus - Other</option>
              <option value="France - Lyon">France - Lyon</option>
              <option value="France - Nice">France - Nice</option>
              <option value="France - Other">France - Other</option>
              <option value="France - Paris">France - Paris</option>
              <option value="Greece - Athens">Greece - Athens</option>
              <option value="Greece - Corinth">Greece - Corinth</option>
              <option value="Greece - Naxos">Greece - Naxos</option>
              <option value="Greece - Nerantza">Greece - Nerantza</option>
              <option value="Greece - Other">Greece - Other</option>
              <option value="Mount Lebanon - Aley">Mount Lebanon - Aley</option>
              <option value="Mount Lebanon - Baabda">Mount Lebanon - Baabda</option>
              <option value="Mount Lebanon - Chouf">Mount Lebanon - Chouf</option>
              <option Selected="Selected" value="Mount Lebanon - El Metn">Mount Lebanon - El Metn</option>
              <option value="Mount Lebanon - jbeil">Mount Lebanon - jbeil</option>
              <option value="Mount Lebanon - Keserwan">Mount Lebanon - Keserwan</option>
              <option value="Norht - Zgharta">Norht - Zgharta</option>
              <option value="North - Akkar">North - Akkar</option>
              <option value="North - Batroun">North - Batroun</option>
              <option value="North - Koura">North - Koura</option>
              <option value="North - Tripoli">North - Tripoli</option>
              <option value="South - Jezzine">South - Jezzine</option>
              <option value="UAE - All">UAE - All</option>
              </Select>
          </div>
                

       <div className="dropdowns">
       <label>City</label>
          <Select name='city'  placeholder="City" className="inputsTop" onChange={handleCityChange} >
          <option value=""></option>
          <option value="Ain aar">Ain aar</option>
          <option value="Ain Alak">Ain Alak</option>
          <option value="Ain Najem">Ain Najem</option>
          <option value="Ain Saade">Ain Saade</option>
          <option value="Ant Elias">Ant Elias</option>
          <option value="Aoukar">Aoukar</option>
          <option value="Baabdat">Baabdat</option>
          <option value="Baskinta">Baskinta</option>
          <option value="Bauchrieh">Bauchrieh</option>
          <option value="Beit Chabeb">Beit Chabeb</option>
          <option value="Beit El Chaar">Beit El Chaar</option>
          <option value="Beit El Kiko">Beit El Kiko</option>
          <option value="Beit Misk">Beit Misk</option>
          <option value="Berj Hammoud">Berj Hammoud</option>
          <option value="Bet Mery">Bet Mery</option>
          <option value="Bhorsaf">Bhorsaf</option>
          <option value="Bikfaya">Bikfaya</option>
          <option value="Biyada">Biyada</option>
          <option value="Bkenneya">Bkenneya</option>
          <option value="Bolonia">Bolonia</option>
          <option value="Broumana">Broumana</option>
          <option value="Bsalim">Bsalim</option>
          <option value="Bsefrin">Bsefrin</option>
          <option value="Bteghrin">Bteghrin</option>
          <option value="Byakout">Byakout</option>
          <option value="Chawyeh">Chawyeh</option>
          <option value="Daher El Souwwan">Daher El Souwwan</option>
          <option value="Daychounieh">Daychounieh</option>
          <option value="Dbaye">Dbaye</option>
          <option value="Deir Chamra">Deir Chamra</option>
          <option value="Dhour Shweir">Dhour Shweir</option>
          <option value="Dik El Mehde">Dik El Mehde</option>
          <option value="Dikwene">Dikwene</option>
          <option value="Dora">Dora</option>
          <option value="Douar">Douar</option>
          <option value="El Atchane">El Atchane</option>
          <option value="Elissar">Elissar</option>
          <option value="Fanar">Fanar</option>
          <option value="Hadira">Hadira</option>
          <option value="Hbous">Hbous</option>
          <option value="Horech tabet">Horech tabet</option>
          <option value="Jal El Dib">Jal El Dib</option>
          <option value="Jdeide">Jdeide</option>
          <option value="Jouret El Ballout">Jouret El Ballout</option>
          <option value="Karantina">Karantina</option>
          <option value="Kennebet Baabdat">Kennebet Baabdat</option>
          <option value="Kennebet Broumana">Kennebet Broumana</option>
          <option value="Kfartay">Kfartay</option>
          <option value="Khenchara">Khenchara</option>
          <option value="Kornet Chehwen">Kornet Chehwen</option>
          <option value="Kornet El Hamra">Kornet El Hamra</option>
          <option value="ksaybe">ksaybe</option>
          <option value="Mansourieh">Mansourieh</option>
          <option value="Mar Chaaya">Mar Chaaya</option>
          <option value="Mar Moussa">Mar Moussa</option>
          <option value="Mar Rukuz">Mar Rukuz</option>
          <option value="Mazraat yachouh">Mazraat yachouh</option>
          <option value="Mekalles">Mekalles</option>
          <option value="Metn">Metn</option>
          <option value="Mezher">Mezher</option>
          <option value="Monteverde">Monteverde</option>
          <option value="Mtayleb">Mtayleb</option>
          <option value="Mtein">Mtein</option>
          <option value="Naas">Naas</option>
          <option value="Nabey">Nabey</option>
          <option value="Naccache">Naccache</option>
          <option value="New Rawda">New Rawda</option>
          <option value="Ornet El Hamra">Ornet El Hamra</option>
          <option value="Quortada">Quortada</option>
          <option value="Rabieh">Rabieh</option>
          <option value="Rabweh">Rabweh</option>
          <option value="Roumieh">Roumieh</option>
          <option value="Sabtieh">Sabtieh</option>
          <option value="Sin El Fil">Sin El Fil</option>
          <option value="Zaarour">Zaarour</option>
          <option value="Zabbougha">Zabbougha</option>
          <option value="Zalka">Zalka</option>
          <option value="Zandouqa">Zandouqa</option>
          <option value="Zaraaoun">Zaraaoun</option>
          <option value="Zeghrine">Zeghrine</option>
          <option value="Zikrit">Zikrit</option>
          </Select>
       </div>

        </div>

        <div className="grid"  >
          <Input type="text" placeholder="Floor" name="floor" required />

          <Input type="text" placeholder="Floors" name="floors" required />

          <Input type="text" placeholder="Address" name="address" required />

          <Input type="text" placeholder="G.Map" name="gmap" required />

          <Input type="text" placeholder="Lot#" name="lot_number" required />

          <Input type="text" placeholder="Age" name="age" required />
        </div>

        <div className="row">

        <div style={{border:'1px solid #8080804d' , padding:'10px' , borderRadius:'10px'}} >
          <Radio.Group name="sale_rent" defaultValue={'sale'} onChange={handleRadioChange}>
          <Radio name="for_sale" value={'sale'}>For Sale</Radio>
          <Radio name="for_rent" value={'rent'}>For Rent</Radio>
      </Radio.Group>

                {sale_rent === 'sale' ? (
            <div>

              $<Input name="price" placeholder="Sale Price" />
            </div>
          ) : (
            <div>
               <Input name="price" placeholder="Rent Price" />$/Month
            </div>
          )}

          </div>

<br></br>
        <Input type="text" placeholder="L.T.B" name="ltb" required />

    

        <div className="flex" >
          <Input name="surface" min={1} max={10} type="number"  placeholder="Surface" />
          <Input name="sellable" min={1} max={10} type="number"  placeholder="Sellable" />
          <Input name="bedrooms" min={1} max={10} type="number"  placeholder="Bedrooms" />
          <Input name="master" min={1} max={10} type="number"  placeholder="Master" />
          <Input name="regular" min={1} max={10} type="number"  placeholder="Regular" />
          <Input name="Bathrooms" min={1} max={10} type="number"  placeholder="Bathrooms" />
          <Input name="shared" min={1} max={10} type="number"  placeholder="Shared" />
          <Input name="visitors" min={1} max={10} type="number"  placeholder="Visitors" />
          <Input name="living" min={1} max={10} type="number"  placeholder="Living" />

        </div>

        <div className="flex" >
        <Input name="sitting" min={1} max={10} type="number"  placeholder="Sitting" />
          <Input name="dining" min={1} max={10} type="number"  placeholder="Dining" />
          <Input name="parkings" min={1} max={10} type="number"  placeholder="Parkings" />
          <Input name="uncovered" min={1} max={10} type="number"  placeholder="Uncovered" />
          <Input name="covered" min={1} max={10} type="number"  placeholder="Covered" />
          <Input name="underground" min={1} max={10} type="number"  placeholder="Underground" />
          <Input name="garden" min={1} max={10} type="number"  placeholder="Garden" />
          <Input name="terrace" min={1} max={10} type="number"  placeholder="Terrace" />
          <Input name="Balcony" min={1} max={10} type="number"  placeholder="Balcony" />
        </div>

        </div>

        <div>
            
        </div>
         <Button variant="contained" color="secondary" type="submit">Search property</Button>
        
        </form>
        <br></br>
        <br></br>

         <PropertyTable array={properties} showModal={showModal}/>
        <br></br>
        <br></br>
  
       </SimpleCard>
  
      </Stack>

    </Container>
  )
}

