import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./styles.css"



function CreateReview({ businesses, auth, users }) {
  
  const [input, setInput] = useState("");
  const [stars, setStars] = useState(1);
  const [businessReview, setBusinessReview] = useState(businesses[0].id); // Default to the first business
  
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("firing");
    
    try { 
        axios.post("${import.meta.env.VITE_BASEURL}/api/reviews", {
        stars,
        input,       
        userid: auth.id,
        busid: businessReview
      });

      setInput("");
      setStars(1);
      setBusinessReview(businesses[0].id);
      alert("Review submitted successfully!");
      
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      
    } catch (error) {
      setError(error.message);
    }
  };
  return (<div className='center-home'>
    <h1>Create a Review</h1>
    <div >
    <form onSubmit={handleSubmit}>
      <label>
        Business:
        <select
          value={businessReview}
          onChange={(e) => {setBusinessReview(e.target.value)}}
        >
          {businesses?.map((business, index) => (
            <option key={business.id} name={business.busname} value={business.id} >
              {business.busname}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        />
      </label>
      <br />
      Review:
      <br/>
      <label >
        
        <textarea className='field'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <br />
      <button className='button-review' type="submit">Submit Review</button>
    </form>
    </div>
  </div>
);
}
export default CreateReview;