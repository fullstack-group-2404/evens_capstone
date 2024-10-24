import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// changes
// more change s 


function Users ({users}){
  const navigate = useNavigate();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
     
  return (<div>
    <h1>Seen It has {users.length} users!</h1>
    {users?.map(function (person) {
      return (

          <div className="main-layout" key={person.id}>
            <div className="user-card">
              Name: {capitalizeFirstLetter(person.username)}

            </div>
            <button onClick={() => navigate(`/userreviews/${person.id}`)}>
            See Reviews From {capitalizeFirstLetter(person.username)}
            </button>

          </div>
      )
    })}
  </div>
  )
}





export default Users
