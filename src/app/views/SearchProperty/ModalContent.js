import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useEffect } from 'react';
import { Row, Col , Carousel  } from 'antd';
import { endpoint } from '../GlobalFunctions';
import axios from 'axios';
const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export default function ModalContent({ thisproperty }){

  const [breaker, setBreaker] = useState(true);

  const property = thisproperty.data.data;
  const images = thisproperty.data.Images;
  
  console.log(images)
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };



  return (
<div>


 <section className="property-single nav-arrow-b">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">

            <Carousel arrows infinite={false} afterChange={onChange}>
            {images != -1 ? (
              images.map((item, index) => (
                
                <div className='carouselDiv' key={index}>
                  <img
                    className='carouselImage'
                    src={`${endpoint}/propertyImages/property_${property.id}/${item}`}
                    alt={`Property Image ${index + 1}`}
                  />
                </div>
              ))
            ) : ""}
            </Carousel>



            <div className="row justify-content-between">
              <div className="col-md-5 col-lg-4">
         

                <div className="property-summary">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="title-box-d section-t4">
                        <h3 className="title-d">Details</h3>
                      </div>
                    </div>
                  </div>
                  <div className="summary-list">
                    <ul className="list">
                      <li className="d-flex justify-content-between">
                        <strong>Property ID : </strong>
                        <span>{property.id}</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <strong>District : </strong>
                        <span>{property.district}</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <strong>Property Type : </strong>
                        <span>{property.type}</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <strong>Status:</strong>
                        <span>{property.sale_rent}</span>
                      </li>

                      <li className="d-flex justify-content-between">
                        <strong>Maps Link:</strong>
                        <a href={`https://www.google.com/maps/place/${property.gmap}`} 
                        target="_blank" rel="noopener noreferrer">
                        Link to Google Maps
                      </a>                      
                      </li>

                      <li className="d-flex justify-content-between">
                        <strong>Area:</strong>
                        <span>{property.area}m<sup>2</sup></span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <strong>Beds:</strong>
                        <span>{property.beds}</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <strong>Baths:</strong>
                        <span>{property.baths}</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <strong>Garage:</strong>
                        <span>{property.garage}</span> 
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-lg-7 section-md-t3">
                {/* <div className="row">
                  <div className="col-sm-12">
                    <div className="title-box-d">
                      <h3 className="title-d">Property Description</h3>
                    </div>
                  </div>
                </div>

                <div className="property-description">
                  <p className="description color-text-a">
                    {property.description}
                  </p>
                  <p className="description color-text-a no-margin">
                    {property.additionalDescription}
                  </p>
                </div> */}

                <div className="row section-t3">
                  <div className="col-sm-12">
                    <div className="title-box-d">
                      <h3 className="title-d">Amenities</h3>
                    </div>
                  </div>
                </div>

                <div className="amenities-list color-text-a">
                  <ul className="list-a no-margin">
                    {/* {property.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))} */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> 
  </div>

  );
};