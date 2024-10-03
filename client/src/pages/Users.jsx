import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// changes
// more change s 


function Users ({users}){

     
  return (<div>
    <h1>Seen It has {users.length} users!</h1>
    {users?.map(function (person) {
      return (

          <div className="main-layout" key={person.id}>
            <div className="user-card">
              Name: {person.username}

            </div>

          </div>
      )
    })}
  </div>
  )
}





export default Users
