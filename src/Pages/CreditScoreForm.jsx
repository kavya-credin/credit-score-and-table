import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import "../styles/CreditScoreForm.css";
import { RxCross2 } from "react-icons/rx";
import { useRef } from "react";
import states from "../Data";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function CreditScoreForm() {
  const token = Cookies.get("Token");
  const [formData, setFormData] = useState({
    token: token,
    email: "darshan.patel@credin.in",
    firstName: "",
    middleName: "",
    phoneNumber: [],
    emailAddress: [],
    addressDetails: [],
    referenceNumber: "",
    voterId: "",
    aadharNumber: "",
    panNumber: "",
    customerGender: "",
    customerDob: "",
  });
  const mobileRef = useRef(null);
  const [email, setEmail] = useState({
    SeqEmail: "",
    EmailType: "",
  });
  const [address, setAddress] = useState({
    Seq: "",
    AddressType: "",
    AddressLine1: "",
    AddressLine2: "",
    Locality: "",
    City: "",
    State: "",
    Postal: "",
  });
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleModelInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddress((prevData) => ({ ...prevData, [name]: value }));
  };
  // console.log(address);
  const addMobileNumber = () => {
    if (!mobileRef.current || !mobileRef.current.value) {
      return; // Handle potential empty input
    }
    const newMobileNumber = mobileRef.current.value;
    mobileRef.current.value = "";
    if (newMobileNumber.length < 10) {
      toast.error("Invalid mobile number");
      // console.log("Invalid mobile number");
      return;
    }
    if (formData.phoneNumber.includes(newMobileNumber)) {
      toast.error("Mobile number already exists");
      // console.log("Mobile number already exists");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: [...prevData.phoneNumber, newMobileNumber],
    }));

    toast.success("Mobile number added successfully");
  };
  const addEmail = () => {
    if (!email.SeqEmail || !email.EmailType) {
      toast.error("Email is required");
      setEmail({
        SeqEmail: "",
        EmailType: "",
      });
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      emailAddress: [...prevData.emailAddress, email],
    }));
    toast.success("Email added successfully");
    setEmail({
      SeqEmail: "",
      EmailType: "",
    });
  };
  const handleFormData = async (event) => {
    event.preventDefault();
    console.log(formData);
    if (!formData.token) {
      toast.error("Login First");
      return;
    }
    if (!formData.email) {
      toast.error("Email is required");
      return;
    }

    if (!formData.firstName) {
      toast.error("First Name is required");
      return;
    }
    if (formData.phoneNumber.length === 0) {
      toast.error("Add Atleast One Phone Number");
      return;
    }
    if (!formData.panNumber) {
      toast.error("Pan Number is required");
      return;
    }

    try {
      const res = await axios.post(
        "http://staging.console.api.credin.in/credin/equifax/api",
        formData
      );
      if (res.status === 200) {
        console.log(res.data);
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }

    setFormData({
      firstName: "",
      phoneNumber: [],
      emailAddress: [],
      addressDetails: [],
      referenceNumber: "",
      voterId: "",
      aadharNumber: "",
      panNumber: "",
      customerGender: "",
      customerDob: "",
    });
  };
  const handleModelOpen = () => {
    const background = document.querySelector(".inner");
    background.classList.add("blur");
    const model = document.querySelector(".model_div");
    model.classList.remove("hide");
  };

  const addAddress = () => {
    setFormData((prevData) => ({
      ...prevData,
      addressDetails: [...prevData.addressDetails, address],
    }));
    toast.success("Address added successfully");
    setAddress({
      Seq: "",
      AddressType: "",
      AddressLine1: "",
      AddressLine2: "",
      Locality: "",
      City: "",
      State: "",
      Postal: "",
    });

    handleModelClose();
  };
  const handleModelClose = () => {
    const background = document.querySelector(".inner");
    background.classList.remove("blur");
    const model = document.querySelector(".model_div");
    model.classList.add("hide");
  };
  const handleModalClick = (event) => {
    event.stopPropagation();
    const model = document.querySelector(".model_div");
    const background = document.querySelector(".inner");
    if (
      background.classList.contains("blur") &&
      !model.classList.contains("hide")
    ) {
      if (
        event.target.nodeName === "DIV" &&
        event.target.className === "outer"
      ) {
        // console.log(event);
        handleModelClose();
      }
    }
  };
  return (
    <div className="outer" onClick={handleModalClick}>
      <div className="inner">
        <h1 className="heading">Search Credit Score</h1>
        <div style={{ padding: "20px" }}>
          <form className="form" onSubmit={handleFormData}>
            <div className="form-div">
              <div className="input-label-box">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInput}
                  className="input"
                ></input>
              </div>
              <div className="input-label-box">
                <label>Reference Number</label>
                <input
                  type="number"
                  name="referenceNumber"
                  value={formData.referenceNumber}
                  onChange={handleInput}
                  className="input"
                ></input>
              </div>
            </div>
            <div className="form-div">
              <div className="input-label-box">
                <label>Mobile</label>
                <div className="input-box-mob">
                  <input ref={mobileRef} type="number" className="input" />

                  <button
                    type="button"
                    onClick={addMobileNumber}
                    className="input  icon-plus"
                  >
                    <FaPlus></FaPlus>
                  </button>
                </div>
              </div>

              <div className="input-label-box">
                <label htmlFor="">Voter Id</label>
                <input
                  type="string"
                  name="voterId"
                  value={formData.voterId}
                  onChange={handleInput}
                  className="input"
                ></input>
              </div>
            </div>
            <div className="form-div">
              <div className="input-label-box">
                <label htmlFor="">Aadhar Number</label>
                <input
                  type="number"
                  name="aadharNumber"
                  pattern="[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}"
                  value={formData.aadharNumber}
                  onChange={handleInput}
                  className="input"
                ></input>
              </div>
              <div className="input-label-box">
                <label>*Pan Number</label>
                <input
                  type="text"
                  pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]"
                  placeholder="AAAAA1111A"
                  name="panNumber"
                  required
                  value={formData.panNumber}
                  onChange={handleInput}
                  className="input"
                ></input>
              </div>
            </div>
            <div className="form-div">
              <div className="input-label-box">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="customerDob"
                  onChange={handleInput}
                  className="input"
                  value={formData.customerDob}
                ></input>
              </div>

              <div className="input-label-box">
                <label>Gender</label>
                <div className="input-box">
                  <select
                    className="input-select"
                    name="customerGender"
                    onChange={handleInput}
                    value={formData.customerGender}
                  >
                    <option></option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-div">
              <div className="input-label-box">
                <label>Email Type</label>
                <div className="input-box">
                  <select
                    className="input-select"
                    name="EmailType"
                    value={email.EmailType}
                    onChange={(e) =>
                      setEmail({ ...email, EmailType: e.target.value })
                    }
                  >
                    <option></option>
                    <option value="Office Email">Office Email</option>
                    <option value="Personal Email">Personal Email</option>
                  </select>
                </div>
              </div>

              <div className="input-label-box">
                <label htmlFor="">Email</label>
                <div className="input-box-eml">
                  <input
                    type="email"
                    name="SeqEmail"
                    value={email.SeqEmail}
                    onChange={(e) =>
                      setEmail({ ...email, SeqEmail: e.target.value })
                    }
                    className="input"
                  />
                  <button
                    className="input icon-plus"
                    type="button"
                    onClick={addEmail}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
            <div className="form-div-1">
              <span
                style={{
                  color: "#004ba4",
                  textAlign: "center",
                  margin: "auto",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={handleModelOpen}
              >
                Add Address
              </span>
            </div>
            <div className="form-div-btn">
              <button type="submit" className="button">
                Submit
              </button>
              <Link to="/table">
                <button type="button" className="btn ">
                   view table
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="model_div hide">
        <div className="model_div_inner">
          <div className="model_form-div">
            <div></div>
            <button className="add-btn" onClick={handleModelClose}>
              <RxCross2 />
            </button>
          </div>
          <div className="model_form-div">
            <div className="input-label-box-1">
              <label>Seq</label>
              <input
                type="number"
                className="input"
                name="Seq"
                value={address.Seq}
                onChange={handleModelInput}
              />
            </div>

            <div className="input-label-box-1">
              <label htmlFor="">Address Type</label>
              <div className="input">
                <select
                  className="input-select"
                  name="AddressType"
                  value={address.AddressType}
                  onChange={handleModelInput}
                >
                  <option></option>
                  <option value="Home address">Home Address</option>
                  <option value="Office address">Office Address</option>
                  <option value=" Other address"> Other Address</option>
                </select>
              </div>
            </div>
          </div>
          <div className="model_form-div">
            <div className="input-label-box-1">
              <label htmlFor="">Address Line 1</label>
              <textarea
                className="input"
                value={address.AddressLine1}
                name="AddressLine1"
                onChange={handleModelInput}
              />
            </div>
            <div className="input-label-box-1">
              <label htmlFor="">Address Line 2</label>
              <textarea
                className="input"
                value={address.AddressLine2}
                name="AddressLine2"
                onChange={handleModelInput}
              />
            </div>
          </div>
          <div className="model_form-div">
            <div className="input-label-box-1">
              <label htmlFor="">Locality</label>
              <input
                type="text"
                name="Locality"
                className="input"
                value={address.Locality}
                onChange={handleModelInput}
              />
            </div>
            <div className="input-label-box-1">
              <label htmlFor="">City</label>
              <input
                type="text"
                name="City"
                className="input"
                value={address.City}
                onChange={handleModelInput}
              />
            </div>
          </div>
          <div className="model_form-div">
            <div className="input-label-box-1">
              <label htmlFor="">State</label>
              <div className="input">
                <select
                  className="input-select"
                  value={address.State}
                  onChange={handleModelInput}
                  name="State"
                >
                  <option></option>
                  {states.map((state) => (
                    <option key={state.stateCode} value={state.stateCode}>
                      {state.stateName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          <div className="input-label-box-1">
            <label htmlFor="">Pincode</label>
          <input
              type="number"
              className="input"
              name="Postal"
              value={address.Postal}
              onChange={handleModelInput}
            />
          </div>
          </div>

          <button className="button" onClick={addAddress}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreditScoreForm;
