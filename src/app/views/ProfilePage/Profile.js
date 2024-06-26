import React, { useState } from 'react';
import './profile.css'
import { Name, endpoint } from "../GlobalFunctions";

import { Button, Modal } from 'antd';

export default function Profile(){

    const [formData, setFormData] = useState([]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        console.log(formData);
    
        try {
          const response = await fetch(`${endpoint}/api/addnewuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const result = await response.json();
          if (response.ok) {
            console.log('User added successfully:', result);
            setLoading(false);
            setOpen(false);
          } else {
            console.error('User addition failed:', result);
          }
        } catch (error) {
          console.error('Error during user addition:', error);
        }
      };
      


    const userInfo = JSON.parse(sessionStorage.getItem("user"));

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const closeModal = () =>{
      setOpen(false)
    }
    const showModal = () => {
      setOpen(true);
    };


  return (
    <div class="container-fluid px-2 px-md-4">
    <div class="page-header min-height-300 border-radius-xl mt-4" >
      <span class="mask  bg-gradient-primary  opacity-6"></span>
    </div>
    <div class="card card-body mx-3 mx-md-4 mt-n6">
      <div class="row gx-4 mb-2" style={{display:'flex'}}>
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img src={`${endpoint}/userimages/${userInfo.ProfilePicture}`} alt="profile_image" class="w-100 border-radius-lg shadow-sm"/>
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">
              {userInfo.FirstName +" "+ userInfo.LastName}
            </h5>
            <p class="mb-0 font-weight-normal text-sm">
              {userInfo.Role}
            </p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
          <div class="nav-wrapper position-relative end-0">
          <Button type="primary" onClick={showModal}>
          Add User
         </Button>

          </div>
        </div>

      </div>

      <div class="row">
        <div class="row">
          {/* <div class="col-12 col-xl-4">
            <div class="card card-plain h-100">
              <div class="card-header pb-0 p-3">
                <h6 class="mb-0">Platform Settings</h6>
              </div>
              <div class="card-body p-3">
                <h6 class="text-uppercase text-body text-xs font-weight-bolder">Account</h6>
                <ul class="list-group">
                  <li class="list-group-item border-0 px-0">
                    <div class="form-check form-switch ps-0">
                      <input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault" checked/>
                      <label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault">Email me when someone follows me</label>
                    </div>
                  </li>
                  <li class="list-group-item border-0 px-0">
                    <div class="form-check form-switch ps-0">
                      <input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault1"/>
                      <label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault1">Email me when someone answers on my post</label>
                    </div>
                  </li>
                  <li class="list-group-item border-0 px-0">
                    <div class="form-check form-switch ps-0">
                      <input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault2" checked/>
                      <label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault2">Email me when someone mentions me</label>
                    </div>
                  </li>
                </ul>
                <h6 class="text-uppercase text-body text-xs font-weight-bolder mt-4">Application</h6>
                <ul class="list-group">
                  <li class="list-group-item border-0 px-0">
                    <div class="form-check form-switch ps-0">
                      <input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault3"/>
                      <label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault3">New launches and projects</label>
                    </div>
                  </li>
                  <li class="list-group-item border-0 px-0">
                    <div class="form-check form-switch ps-0">
                      <input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault4" checked/>
                      <label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault4">Monthly product updates</label>
                    </div>
                  </li>
                  <li class="list-group-item border-0 px-0 pb-0">
                    <div class="form-check form-switch ps-0">
                      <input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault5"/>
                      <label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault5">Subscribe to newsletter</label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
          <div class="col-12 col-xl-4">
            <div class="card card-plain h-100">
              <div class="card-header pb-0 p-3">
                <div class="row">
                  <div class="col-md-8 d-flex align-items-center">
                    <h6 class="mb-0">Profile Information</h6>
                  </div>
                  <div class="col-md-4 text-end">
                    <a href="javascript:;">
                      <i class="fas fa-user-edit text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body p-3">
                <p class="text-sm">
                  Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
                </p>
                {/* <hr class="horizontal gray-light my-4"> */}
                <ul class="list-group">
                  <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">Full Name:</strong> &nbsp; Alec M. Thompson</li>
                  <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Mobile:</strong> &nbsp; (44) 123 1234 123</li>
                  <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong> &nbsp; alecthompson@mail.com</li>
                  <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Location:</strong> &nbsp; USA</li>
                  <li class="list-group-item border-0 ps-0 pb-0">
                    <strong class="text-dark text-sm">Social:</strong> &nbsp;
                    <a class="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                      <i class="fab fa-facebook fa-lg"></i>
                    </a>
                    <a class="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                      <i class="fab fa-twitter fa-lg"></i>
                    </a>
                    <a class="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                      <i class="fab fa-instagram fa-lg"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <br></br>

        </div>
      </div>
    </div>
    <br></br>

    <Modal
        open={open}
        title="Add new user"
        footer={[
            <Button key="submit" type="primary" loading={loading} onClick={closeModal}>
              Cancel
            </Button>
          ]}
        >
      
        <form>
      <br />
      <label>
        FirstName:
        <input type="text" name="FirstName" value={formData.FirstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        LastName:
        <input type="text" name="LastName" value={formData.LastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="Email" required value={formData.Email} onChange={handleChange} />
      </label>
      <br />
      <label>
        PasswordHash:
        <input type="password" required name="PasswordHash" value={formData.PasswordHash} onChange={handleChange} />
      </label>
      <br />
      <label>
        PhoneNumber:
        <input type="tel" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} />
      </label>
      <br />
      <label>
        DateOfBirth:
        <input type="date" name="DateOfBirth" value={formData.DateOfBirth} onChange={handleChange} />
      </label>
      <br />
      <label>
        ProfilePicture:
        <input type="text" name="ProfilePicture" value={formData.ProfilePicture} onChange={handleChange} />
      </label>
      <br />
      <label>
        LicenseNumber:
        <input type="text" name="LicenseNumber" value={formData.LicenseNumber} onChange={handleChange} />
      </label>
      <br />
      <label>
        AgencyName:
        <input type="text" name="AgencyName" value={formData.AgencyName} onChange={handleChange} />
      </label>
      <br />
      <label>
        AgencyAddress:
        <input type="text" name="AgencyAddress" value={formData.AgencyAddress} onChange={handleChange} />
      </label>
      <br />
      <label>
        City:
        <input type="text" name="City" value={formData.City} onChange={handleChange} />
      </label>
      <br />
      <label>
        State:
        <input type="text" name="State" value={formData.State} onChange={handleChange} />
      </label>
      <br />
      <label>
        ZipCode:
        <input type="text" name="ZipCode" value={formData.ZipCode} onChange={handleChange} />
      </label>
      <br />
      <label>
        Country:
        <input type="text" name="Country" value={formData.Country} onChange={handleChange} />
      </label>
      <br />
      <label>
        Role:
        <input type="text" name="Role" value={formData.Role} onChange={handleChange} />
      </label>
      <br />
     <button className='submitBtn' type='submit' >Add User</button>
    </form>
        
      </Modal>

  </div>

  );
};