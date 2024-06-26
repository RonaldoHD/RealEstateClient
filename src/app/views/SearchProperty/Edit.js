import React, { useState } from 'react';
import { Input, Select, Space , Modal , Radio  } from 'antd';
import { Button, Stack, Checkbox , Snackbar ,Alert ,Icon, formControlClasses } from "@mui/material";
import { useEffect } from 'react';
import axios from 'axios';
import { endpoint } from '../GlobalFunctions';


const Edit = ({ thisproperty }) => {
  const [formData, setFormData] = useState(thisproperty);




  const property = thisproperty.data.data
  console.log(property)



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formValues = new FormData(event.target);
    const formData = Object.fromEntries(formValues.entries());
    // Add selected values to formValues
    formData.type = selectedType;
    formData.district = selectedDistrict;
    formData.city = selectedCity;
    formData.id = property.id;
    try {
      const response = await axios.post(`${endpoint}/api/updateproperty`, formData);
      console.log(response.data); // Handle the response from the backend
      alert('Property Updated Succesfully')
      setProperties(response.data);
    } catch (error) {
      alert("error updating property")
      console.error("Error submitting form:", error);
    }
  };
  



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


  useEffect(() => {
    if (property.sale_rent === 'sale') {
      setsale_rent('sale');
    } else {
      setsale_rent('rent');
    }
  }, [property.sale_rent]);



  return (
    <section className="property-single nav-arrow-b">
   <form onSubmit={handleSubmit} noValidate  
        style={{display:'flex' , flexDirection:"column" , gap:'20px'}}>

        <div className="dropdownDiv" >
          <div className="dropdowns" >
          <label>Owner</label>
          <Input  type="text" name="owner" required className="inputsTop" defaultValue={property.owner} />
          </div>
          
          <div className="dropdowns" >
          <label>Type</label>
            <Select  name='type'  className="inputsTop" onChange={handleTypeChange} defaultValue={property.type}   >
            <option value=""></option>
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
              <Select name='district' className="inputsTop" onChange={handleDistrictChange} defaultValue={property.district} >
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
          <Select name='city'  placeholder="City" className="inputsTop" onChange={handleCityChange} defaultValue={property.city} >
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
          <Input type="text" placeholder="Floor" name="floor" required defaultValue={property.floor} />

          <Input type="text" placeholder="Floors" name="floors" required defaultValue={property.floors} />

          <Input type="text" placeholder="Address" name="address" required defaultValue={property.adress} />

          <Input type="text" placeholder="G.Map" name="gmap" required defaultValue={property.gmap} />

          <Input type="text" placeholder="Lot#" name="lot_number" required defaultValue={property.lot_number} />

          <Input type="text" placeholder="Age" name="age" required defaultValue={property.age} />
        </div>

        <div className="row">

        <div style={{border:'1px solid #8080804d' , padding:'10px' , borderRadius:'10px'}} >
          <Radio.Group name="sale_rent" defaultValue={'sale'} onChange={handleRadioChange} >
          <Radio name="for_sale" value={'sale'}    >For Sale</Radio>
          <Radio name="for_rent" value={'rent'} defaultChecked={true}  >For Rent</Radio>
      </Radio.Group>

                {sale_rent === 'sale' ? (
            <div>

              $<Input name="price" placeholder="Sale Price" defaultValue={property.price}/>
            </div>
          ) : (
            <div>
               <Input name="price" placeholder="Rent Price"  defaultValue={property.price} />$/Month
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
         <Button variant="contained" color="secondary" type="submit">Update Property</Button>
        
        </form>
  </section>
  );
}

export default Edit;
