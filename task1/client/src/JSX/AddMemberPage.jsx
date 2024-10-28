import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AddMemberPage() {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState({
    MemberID: 0,
    FirstName: '',
    LastName: '',
    Address: '',
    DateOfBirth: '',
    Phone: '',
    MobilePhone: ''
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "DateOfBirth") {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(value)) { 
        setMemberData(prevState => ({
          ...prevState,
          [name]: value
        }));
      } else {
        alert('תאריך לא חוקי, יש להזין תאריך בפורמט YYYY-MM-DD');
        setMemberData({
          ...memberData,
          [name]: '' 
        });
      }
    } else {
      setMemberData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:8080/hmo/members', memberData)
        .then(() => {
          alert('Member added successfully.');
          navigate('/hmo/members'); 
        })
        .catch(error => {
          console.error('Error adding member:', error);
        });
    }
  };

  const validateForm = () => {
    const { DateOfBirth, Phone, MobilePhone, MemberID } = memberData;

    if (DateOfBirth === "" || !isValidDate(DateOfBirth)) {
      alert("Please enter a valid date of birth (YYYY-MM-DD).");
      return false;
    }

    if (Phone === "" || MobilePhone === "" || !isValidPhoneNumber(Phone) || !isValidPhoneNumber(MobilePhone)) {
      alert("Please enter a valid phone number and mobile number.");
      return false;
    }

    if (MemberID === "" || isNaN(MemberID)) {
      alert("Member ID must be a non-empty numeric value.");
      return false;
    }

    return true;
  };

  const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) !== null;
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const regEx = /^\d{10}$/;
    return phoneNumber.match(regEx) !== null;
  };

  return (
    <div>
      <h2>Add a New Member</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Member ID:
          <input
            type="text"
            name="MemberID"
            value={memberData.MemberID}
            onChange={handleChange}
            placeholder="Enter member ID"
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="FirstName"
            value={memberData.FirstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="LastName"
            value={memberData.LastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="Address"
            value={memberData.Address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="DateOfBirth"
            value={memberData.DateOfBirth}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="Phone"
            value={memberData.Phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </label>
        <label>
          Mobile Phone:
          <input
            type="tel"
            name="MobilePhone"
            value={memberData.MobilePhone}
            onChange={handleChange}
            placeholder="Enter mobile phone number"
          />
        </label>
        <button type="submit">Add Member</button>
      </form>
      <Link id='link' to="/hmo/members">
        <button id='button'>Back to Members List</button>
      </Link>
    </div>
  );
}

export default AddMemberPage;
