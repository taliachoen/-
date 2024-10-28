import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/MemberDetailsPage.css';
import { Navigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Link } from 'react-router-dom'; 

function MemberDetailsPage() {
  const [member, setMember] = useState(null);
  const [editedMember, setEditedMember] = useState(null);
  const [vaccines, setVaccines] = useState([]);
  const [StartVaccines, setStartVaccines] = useState(null);
  const [FinishVaccines, setFinishVaccines] = useState(null);

  const { memberId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/hmo/members/${memberId}`)
      .then(response => {
        const responseData = response.data;
        if (responseData.DateOfBirth != null) {
          const formattedValue = format(new Date(responseData.DateOfBirth), 'yyyy-MM-dd');
          responseData.DateOfBirth = formattedValue;
        }
        setMember(responseData);
        setEditedMember(responseData);
      })
      .catch(error => {
        console.error('Error fetching member details:', error);
      });

    axios.get(`http://localhost:8080/hmo/coronavaccines/${memberId}`)
      .then(response => {
        setVaccines(response.data);
      })
      .catch(error => {
        console.error('Error fetching vaccines details:', error);
      });
      axios.get(`http://localhost:8080/hmo/coronapatients/${memberId}/DateOfReceiptOfResult`)
    .then(response => {
      console.log(response.data)
      let formattedValue = response.data;
      formattedValue = format(new Date(formattedValue), 'yyyy-MM-dd');
      setStartVaccines(formattedValue);
    })
    .catch(error => {
      console.error('Error fetching recovery date:', error);
    });

  axios.get(`http://localhost:8080/hmo/coronapatients/${memberId}/dateOfRecovery`)
    .then(response => {
      console.log(response.data)
      let formattedValue = response.data;
      formattedValue = format(new Date(formattedValue), 'yyyy-MM-dd');
      setFinishVaccines(formattedValue)
    })
    .catch(error => {
      console.error('Error fetching onset date:', error);
    });
  }, [memberId]);

  const handleUpdate = () => {
    console.log('Update button clicked');
    console.log(editedMember);
    axios.put(`http://localhost:8080/hmo/members/${memberId}`, editedMember)
      .then(response => {
        console.log('Member updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating member:', error);
      });
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
    axios.delete(`http://localhost:8080/hmo/members/${memberId}`)
      .then(response => {
        console.log('Member deleted successfully');
        <Navigate to="/hmo/members" />
      })
      .catch(error => {
        console.error('Error deleting member:', error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value; 
    if (name === 'DateOfBirth') {
      console.log("1 ", formattedValue)
      formattedValue = format(new Date(formattedValue), 'yyyy-MM-dd');
      console.log(formattedValue)

    }

    setEditedMember(prevState => ({
      ...prevState,
      [name]: formattedValue
    }));
  };

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Member Details: {member.FirstName} {member.LastName}</h2>
      <p>Member ID: {member.MemberID}</p>
      <label>
        First Name:
        <input
          type="text"
          name="FirstName"
          value={editedMember.FirstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="LastName"
          value={editedMember.LastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="Address"
          value={editedMember.Address}
          onChange={handleChange}
        />
      </label>
      <label>
        Date of Birth:
        <input
          type="text"
          name="DateOfBirth"
          value={editedMember.DateOfBirth}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="Phone"
          value={editedMember.Phone}
          onChange={handleChange}
        />
      </label>
      <label>
        Mobile Phone:
        <input
          type="text"
          name="MobilePhone"
          value={editedMember.MobilePhone}
          onChange={handleChange}
        />
      </label>
      <h2>Coronavirus Details</h2>
      {vaccines.length > 0 && (
        <div>
          <h2>Coronavirus Patients</h2>
          {vaccines.map((vaccine, index) => (
            <div key={index}>
              <p>Vaccination Date {index + 1}: {vaccine.DateOfVaccines.slice(0, 10)}</p>
              <p>Vaccine Manufacturer {index + 1}: {vaccine.VaccineManufacturer}</p>
            </div>
          ))}
          {
            <div>
            <h3>Coronavirus Dates</h3>
            <p>Start Date: {StartVaccines && StartVaccines}</p>
            <p>End Date: {FinishVaccines && FinishVaccines}</p>
          </div>
          
          }
        </div>
      )}

      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
      <Link id='link' to="/hmo/members">
        <button id='button'> Back to Members List</button>
      </Link>
    </div>
  );

}

export default MemberDetailsPage;
