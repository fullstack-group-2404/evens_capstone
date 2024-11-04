import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import axios from "axios";
import "./styles.css";

function SingleBusiness() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [reviewData, setReviewData] = useState(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    axios(`${import.meta.env.VITE_BASEURL}/api/businesses/${id}`)
      .then((response) => {

        setBusiness(response.data)

      })
      .catch((err) => console.log('error fetching business', err));
  }, [id]);

  useEffect(() => {
    axios(`${import.meta.env.VITE_BASEURL}/api/reviews/businesses/${id}`)
      .then((response) => {
        console.log(response.data)
        setReviewData(response.data)

      })
      .catch((err) => console.log('error fetching business review data', err));
  }, [id]);

  return (<>
    <div>
      <h1>{business?.busname}</h1>
      <br></br>
      <div className='business-card'>
        <img src={business?.busimage} />
      </div>
      <br></br>
      <p>{business?.description}</p>
      <br></br>
      <h2>See Reviews for {business?.busname}</h2>
    </div>
    <div className='main-layout'>
      {reviewData?.map(function (review) {
        return (
          <div className="review-card" key={review.id}>
            <h2><Rating name="read-only" value={review.stars} readOnly />
            </h2>
            <br></br>
            <p>What this Seen It! member has to say about {review.busname}: {review.input}</p>
            <br></br>
            <h2>Review from User: {capitalizeFirstLetter(review.username)}</h2>
            <br></br>
          </div>

        )


      })}</div>
  </>)
}

export default SingleBusiness