import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './JSX/HomePage.jsx';
import MembersPage from './JSX/MembersPage.jsx';
import MemberDetailsPage from './JSX/MemberDetailsPage.jsx';
import AddMemberPage from './JSX/AddMemberPage.jsx'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/hmo" />} />
          <Route exact path="/hmo" element={<HomePage />} />
          <Route path="/hmo/members" element={<MembersPage />} />
          <Route path="/hmo/members/new" element={<AddMemberPage />} /> 
          <Route path="/hmo/members/:memberId" element={<MemberDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
