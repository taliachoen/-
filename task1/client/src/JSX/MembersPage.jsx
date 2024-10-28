import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import '../CSS/MembersPage.css'

function MembersPage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/hmo/members')
    .then(response => {
      setMembers(response.data);
      })
      .catch(error => {
        console.error('Error fetching members:', error);
      });
  }, []);

  return (
    <div>
      <h1>פרטי חברי הקופה</h1>
      <ul>
      <Link id='link' to="/hmo/members/new">
        <button id='button'>הוסף מבוטח חדש</button>
      </Link>
        {members.map(member => (
          <li key={member.MemberID}>
            <Link to={`/hmo/members/${member.MemberID}`}>{member.FirstName} {member.LastName}</Link>
          </li>
        ))}
      </ul>
  
    </div>
  );
}

export default MembersPage;
