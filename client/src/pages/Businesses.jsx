import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



function Businesses({ businesses }) {
  const navigate = useNavigate();

  return (<div>
    <h1>Seen It has {businesses.length} businesses!</h1>

    <div className="main-layout" >

      {businesses?.map(function (business) {
          return (<div key={business.id}>
            <Card sx={{ minWidth: 345 }}>
            <CardContent>
                        
               {business.busImage}
            
              
              <Typography gutterBottom variant="h5" component="div">
          {business.busname}
        </Typography>
              Category: {business.category}

              </CardContent>

              <CardActions>
            
              <button onClick={() => navigate(`/businesses/${business.id}`)}>
              See Business Details
            </button>

            </CardActions>
            </Card>
          </div>)
        
      })}
    </div>
  </div>
  )
}



export default Businesses;
