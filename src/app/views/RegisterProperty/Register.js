import {React, useState , useEffect } from "react";
import { Button, Stack, Checkbox , Snackbar ,Alert} from "@mui/material";
import { Box, styled , Icon, IconButton } from "@mui/material";
import { Radio , Select } from 'antd';
import { NotificationDB } from "fake-db/db/notification";
import NotificationContext from "app/contexts/NotificationContext";
import useNotification from "app/hooks/useNotification";
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleForm from "./SimpleForm";
import "./register.css"
import { Name, endpoint } from '../GlobalFunctions'
import axios from "axios";
import { noConflict } from "lodash";


const StyledButton = styled(Button)(({ theme }) => ({
  width:'200px',
  display:'flex',
  justifyContent:'space-between',
  margin: theme.spacing(1)
}));
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));



export default function Register(){

  const [selectedValue, setSelectedValue] = useState("");
  const [sale_rent, setsale_rent] = useState("sale");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [clients, setClients] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleImageChange = (event) => {
    setUploadedImages(Array.from(event.target.files));
    console.log("Images : " , uploadedImages)
  };


  const handleSubmit = async (event) => {
     event.preventDefault();
     const formData = new FormData(event.target);
      uploadedImages.forEach((image) => {
      formData.append('images', image);
    });

    console.log(Object.fromEntries(formData.entries())); // To check form values
    const data = Object.fromEntries(formData.entries())
    addNewClient(data.owner)
    try {
      const response = await axios.post(`${endpoint}/api/addproperty`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data); // Handle the response from the backend
      alert('Property added succesfully')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  const addNewClient=(clientName)=>{
    const clientExists = clients.some(client => client.Name === clientName);

    if (clientExists) {
      console.log("client exists")
    } else {
      const clientdata = {
        "Name": clientName
      };
      try {
        const response =  axios.post(`${endpoint}/api/addnewclient`,clientdata , {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log("Client added from front end "); // Handle the response from the backend
        alert('client added succesfully')
      } catch (error) {
        console.error('Error adding client form:', error);
      }
    }

  }


  useEffect(() => {
    axios.get(`${endpoint}/api/getclients`)
      .then(response => {
        console.log("response : " , response.data)
        setClients(response.data);
        console.log("clients : " , clients)
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

    const handleRadioChange = (e) => {
      setsale_rent(e.target.value)
    };

    const { getNotifications } = useNotification();

    const handleAddNotification = () => {
      // Define your notification object
      const newNotification ={
        id: "sdsd",
        heading: "ER fik",
        icon: { name: "chat", color: "primary" },
        timestamp: 1570702802573,
        title: "Msoos Devid",
        subtitle: "Hello, Any progress...",
        path: "chat"
      }
  
      console.log("Adding new notification:", newNotification); // Log the new notification object
      console.log(NotificationDB.list)
      const notif = NotificationDB.list
      notif.push(newNotification);
      getNotifications();
    };
  
    useEffect(() => {
      console.log("Register component mounted"); // Log when the Register component is mounted
    }, []);


    
  return(
    <Container>
      
      <button onClick={handleAddNotification}>Add Notification</button>

      <Stack spacing={3}>
        <SimpleCard >
          <div style={{display:'flex' , justifyContent:'space-between'}} >
          <h2>Register a Property</h2>
          </div>
        <br></br>

        <form onSubmit={handleSubmit} noValidate  style={{display:'flex' , flexDirection:"column" , gap:'20px'}}>

        <div style={{display:'flex'  , gap:'15px'}} >
          <div>

        <label>Owner</label>
        <input type="text" placeholder="owner" name="owner" required />

          </div>
          
          <div>
          <label>Type</label>
            <select id="selectType" name='type' style={{ width: 120 }}>
                <option value='apartment'>Apartment</option>
                <option value='house'>House</option>
                <option value='villa'>Villa</option>
                <option value='condo'>Condo</option>
                <option value='condo'>Office</option>
                <option value='condo'>Showroom</option>
                <option value='condo'>Store</option>
                <option value='townhouse'>Townhouse</option>
                <option value='commercial'>Commercial</option>
                <option value='land'>Land</option>
                <option value='other'>Other</option>
            </select>
          </div>
        
          <div>
              <label>District</label>
              <select name='district' style={{ width: 120 }}>
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
              <option selected="selected" value="Mount Lebanon - El Metn">Mount Lebanon - El Metn</option>
              <option value="Mount Lebanon - jbeil">Mount Lebanon - jbeil</option>
              <option value="Mount Lebanon - Keserwan">Mount Lebanon - Keserwan</option>
              <option value="Norht - Zgharta">Norht - Zgharta</option>
              <option value="North - Akkar">North - Akkar</option>
              <option value="North - Batroun">North - Batroun</option>
              <option value="North - Koura">North - Koura</option>
              <option value="North - Tripoli">North - Tripoli</option>
              <option value="South - Jezzine">South - Jezzine</option>
              <option value="UAE - All">UAE - All</option>
              </select>
          </div>
                

       <div>
       <label>City</label>
          <select name='city' style={{ width: 120 }} placeholder="City" >
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
          </select>
       </div>

        </div>

        <div style={{display:'grid' , justifyContent:"center" , gridTemplateColumns:"repeat(3, 3fr)"}} >
          <input type="text" placeholder="Floor" name="floor" required />

          <input type="text" placeholder="Floors" name="floors" required />

          <input type="text" placeholder="Address" name="address" required />

          <input type="text" placeholder="G.Map" name="gmap" required />

          <input type="text" placeholder="Lot#" name="lot_number" required />

          <input type="text" placeholder="Age" name="age" required />
        </div>

        <div className="row">
          <div style={{border:'1px solid #8080804d' , padding:'10px' , borderRadius:'10px'}} >
          <Radio.Group name="sale_rent" defaultValue={'sale'} onChange={handleRadioChange}>
          <Radio name="for_sale" value={'sale'}>For Sale</Radio>
          <Radio name="for_rent" value={'rent'}>For Rent</Radio>
      </Radio.Group>

                {sale_rent === 'sale' ? (
            <div>

              $<input name="price" placeholder="Sale Price" />
            </div>
          ) : (
            <div>
               <input name="price" placeholder="Rent Price" />$/Month
            </div>
          )}

          </div>
       
       <br></br>
    

        {/* <div  style={{display:'flex'}}  >
                 <div >
                    <Checkbox name="for_sale" />Sale
                    <input type="text" placeholder="Sale Price" name="sale_price" required />
                    <label>$</label>
                  </div>

                  <div>
                    <Checkbox name="for_rent" >Rent</Checkbox>
                    <input type="text" placeholder="Rent Price" name="rent_price" required />
                    <label>$/Month</label>
                  </div>
                  <div>
                    <input type="text" placeholder="Charges" name="charges" required />
                    <label>$/Month</label>
                  </div>

                  <div>
                    <input type="text" placeholder="L.T.B" name="ltb" required />
                  </div>

        </div> */}


    

        <div>
          <input name="surface" min={1} max={10} type="number"  placeholder="Surface" />
          <input name="sellable" min={1} max={10} type="number"  placeholder="Sellable" />
          <input name="bedrooms" min={1} max={10} type="number"  placeholder="Bedrooms" />
          <input name="master" min={1} max={10} type="number"  placeholder="Master" />
          <input name="regular" min={1} max={10} type="number"  placeholder="Regular" />
          <input name="Bathrooms" min={1} max={10} type="number"  placeholder="Bathrooms" />
          <input name="shared" min={1} max={10} type="number"  placeholder="Shared" />
          <input name="visitors" min={1} max={10} type="number"  placeholder="Visitors" />
          <input name="living" min={1} max={10} type="number"  placeholder="Living" />

        </div>

        <div>
        <input name="sitting" min={1} max={10} type="number"  placeholder="Sitting" />
          <input name="dining" min={1} max={10} type="number"  placeholder="Dining" />
          <input name="parkings" min={1} max={10} type="number"  placeholder="Parkings" />
          <input name="uncovered" min={1} max={10} type="number"  placeholder="Uncovered" />
          <input name="covered" min={1} max={10} type="number"  placeholder="Covered" />
          <input name="underground" min={1} max={10} type="number"  placeholder="Underground" />
          <input name="garden" min={1} max={10} type="number"  placeholder="Garden" />
          <input name="terrace" min={1} max={10} type="number"  placeholder="Terrace" />
          <input name="Balcony" min={1} max={10} type="number"  placeholder="Balcony" />
        </div>

        </div>

        <div className="checkboxGrid">
          <label className="extraFeatures" ><Checkbox name="furnished" /> Furnished</label>
          <label className="extraFeatures" ><Checkbox name="decorated" /> Decorated</label>
          <label className="extraFeatures" ><Checkbox name="on_hold" /> On Hold</label>
          <label className="extraFeatures" ><Checkbox name="lux" /> Lux.</label>
          <label className="extraFeatures" ><Checkbox name="duplex" /> Duplex</label>
          <label className="extraFeatures" ><Checkbox name="commercial" /> Commercial</label>
          <label className="extraFeatures" ><Checkbox name="hot" /> Hot</label>
          <label className="extraFeatures" ><Checkbox name="exchange" /> Exchange</label>
          <label className="extraFeatures" ><Checkbox name="sea_view" /> Sea View</label>
          <label className="extraFeatures" ><Checkbox name="mountain_view" /> Moun. View</label>
          <label className="extraFeatures" ><Checkbox name="city_view" /> City View</label>
          <label className="extraFeatures" ><Checkbox name="sold" /> Sold</label>
          <label className="extraFeatures" ><Checkbox name="maid_room" /> Maid Room</label>
          <label className="extraFeatures" ><Checkbox name="maid_bath" /> Maid Bath.</label>
          <label className="extraFeatures" ><Checkbox name="heating" /> Heating</label>
          <label className="extraFeatures" ><Checkbox name="solar" /> Solar</label>
          <label className="extraFeatures" ><Checkbox name="needs_update" /> Needs Update</label>
          <label className="extraFeatures" ><Checkbox name="storage" /> Storage</label>
          <label className="extraFeatures" ><Checkbox name="lighting" /> Lighting</label>
          <label className="extraFeatures" ><Checkbox name="double_g" /> Double G.</label>
          <label className="extraFeatures" ><Checkbox name="interphone" /> Interphone</label>
          <label className="extraFeatures" ><Checkbox name="videophone" /> Videophone</label>
          <label className="extraFeatures" ><Checkbox name="gypsum" /> Gypsum</label>
          <label className="extraFeatures" ><Checkbox name="e_shutters" /> E. Shutters</label>
          <label className="extraFeatures" ><Checkbox name="built_in_w" /> Built-in W.</label>
          <label className="extraFeatures" ><Checkbox name="concierge" /> Concierge</label>
          <label className="extraFeatures" ><Checkbox name="security" /> Security</label>
          <label className="extraFeatures" ><Checkbox name="double_walls" /> Double Walls</label>
          <label className="extraFeatures" ><Checkbox name="stone" /> Stone</label>
          <label className="extraFeatures" ><Checkbox name="generator" /> Generator</label>
          <label className="extraFeatures" ><Checkbox name="pool" /> Pool</label>
          <label className="extraFeatures" ><Checkbox name="gym" /> Gym</label>
          <label className="extraFeatures" ><Checkbox name="pets" /> Pets </label>
         </div>

         <label><Icon>add_a_photo</Icon><br></br></label>
         <input className="input" id="icon-button-file" type="file" multiple required 
         onChange={handleImageChange}/> 

         <Button color="primary" variant="contained" type="submit">Add property</Button> 

        </form>


        </SimpleCard>
      </Stack>


  

      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} variant="filled">
          This is a success message!
        </Alert>
      </Snackbar> */}

    </Container>
  )
}

