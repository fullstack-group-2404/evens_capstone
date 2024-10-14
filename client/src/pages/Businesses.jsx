import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css"



function Businesses({ businesses }) {
  const navigate = useNavigate();

  return (<div>
    <h1>Seen It has {businesses.length} businesses!</h1>

    <div className="main-layout" >

      {businesses?.map(function (business) {
        return (
          <div className="display-card" key={business.id}>
            {business.busname}
            <img src={business.busimage} />
            Category: {business.category}
            <br></br>
            Description: {business.description}
            <br></br>
            <button onClick={() => navigate(`/businesses/${business.id}`)}>
              See Business Details
            </button>
          </div>
        )
      })}
    </div>
  </div>
  )
}



export default Businesses;
