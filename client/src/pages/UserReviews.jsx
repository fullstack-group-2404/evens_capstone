import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import axios from "axios";

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
    axios(`http://localhost:3000/api/reviews/users/${id}`)
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
      axios.delete(`http://localhost:3000/api/reviews/${id}`)
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
              <button onClick={() => handleSubmit(data.id)}>
                Delete Review
              </button>
            </div>
          )
        })}
      </div>


    </div>
  )
}
