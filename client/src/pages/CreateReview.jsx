import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./styles.css"



function CreateReview({ businesses, auth }) {
  const [input, setInput] = useState("");
  const [stars, setStars] = useState(1);
  const [businessReview, setBusinessReview] = useState(""); // Default to the first business
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("firing");
    
    try { console.log("one");
      // const response = await fetch("http://localhost:3000/api/reviews", {
      //   method: "POST",
      //   // headers: {
      //   //   "Content-Type": "application/json",
      //   //   Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   // },
      //   body: JSON.stringify({
      //     busname: auth.id,
      //     businesses,
      //     stars,
      //     input,
      //   }),
      // });
       axios.post("http://localhost:3000/api/reviews", {
        busname,
        businesses,
        stars,
        input,
      });
      console.log("two");
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      setInput("");
      setStars(1);
      alert("Review submitted successfully!");
    } catch (error) {
      setError(error.message);
    }
  };
  return (<div>
    <h1>Create a Review</h1>
    <div className='review-form' >
    <form onSubmit={handleSubmit}>
      <label>
        Business:
        <select
          value={businessReview}
          onChange={(e) => setBusinessReview(e.target.value)}
        >
          {businesses?.map((business) => (
            <option key={business.id} value={business.id}>
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
      <label>
        Review:
        <input type = "text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit Review</button>
    </form>
    </div>
  </div>
);
}
export default CreateReview;