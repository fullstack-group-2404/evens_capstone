import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function UserReviews({ auth, users }) {
  const { id } = useParams();
  const [userReviewData, setUserReviewData] = useState(null);

  const navigate = useNavigate();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const userId = id;
  const result = users.find(({id}) => id === userId);
  

  

  useEffect(() => {
    axios(`${import.meta.env.VITE_BASEURL}/api/reviews/users/${id}`)
      .then(async (response) => {
        const reviews = response.data;
        console.log(reviews);
        setUserReviewData(reviews);

      })
      .catch((err) => console.log('error fetching review data', err));
  }, []);

  

  async function handleSubmit(id) {
    if (userId !== auth.id) {
      navigate(`/notauthorized/`)
    }
    else {
      axios.delete(`${import.meta.env.VITE_BASEURL}/api/reviews/${id}`)
        .then((response) => console.log(response))

        .then(setUserReviewData(userReviewData.filter(userReviewData => userReviewData.id !== id)))
       
        .catch((err) => console.log('error deleting review', err))

        
        
    }
    
  }

  return (
    <div>
      <h1>Seen It! Reviews from {capitalizeFirstLetter(result.username)}</h1>
      <div className="main-layout" >

        {userReviewData?.map(function (data) {
          return (
            <div className="review-card" key={data.id}>
              Business: {data.busname}, {data.category}
              <br></br>
              {data.description}
              <br></br>
              Review: {data.input}
              <br></br>
              <h2><Rating name="read-only" value={data.stars} readOnly /></h2>
              <br></br>
              This Review by Seen It! user: {capitalizeFirstLetter(data.username)}
              <br></br>
              <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleSubmit(data.id)}>
                Delete Review
              </Button>
              </Stack>
            </div>
          )
        })}
      </div>


    </div>
  )
}
