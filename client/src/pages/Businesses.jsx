import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css"



function Businesses({ businesses }) {
return (<div>
    <h1>Seen It has {businesses.length} businesses!</h1>

    <div className="main-layout" >

    {businesses?.map(function (business) {
      return (       
          <div className="display-card" key={business.id}>
            {business.busname}
            <img src = {business.busimage}/>
            Category: {business.category}
            <br></br>
            Description: {business.description}
          </div>       
      )
    })}
  </div>
  </div>
)}



export default Businesses;
