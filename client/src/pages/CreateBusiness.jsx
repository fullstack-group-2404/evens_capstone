import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css"

function CreateBusiness({ businesses, auth }) {
    const [busName, setBusName] = useState('')
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("firing");

        try {
            console.log("one");
            console.log(busName);
            axios.post("http://localhost:3000/api/businesses", {
                busName,
                category,
                description,
                busimage: imageUrl,
            });
            console.log("two");
            console.log(response);
            if (!response.ok) {
                throw new Error("Failed to submit business");
            }

            alert("Business added successfully!");
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className='center-busform'>
            <h1>Add Your Own Business To Seen It Reviews!</h1>
            <br></br>
            
            <form  className="form-size" onSubmit={handleSubmit}>
                <h2>Business Name</h2>
                <label >
                <input  className='new-field' onChange={(e) => setBusName(e.target.value)} placeholder='Business Name' />
                </label>
                <h2>Category</h2>
                <label>
                <input  className='new-field' onChange={(e) => setCategory(e.target.value)} placeholder='Category' />
                </label>
                <h2>Business Description</h2>
                <label>
                <textarea  className='new-field-two' onChange={(e) => setDescription(e.target.value)} />
                </label>
                <h2>Image for Business</h2>
                <label>
                <input   className='new-field' onChange={(e) => setImageUrl(e.target.value)} placeholder='Image URL' />
                </label>
                <button className='new-button-review' type='submit'>Add Business</button>

                

            </form>
            



        </div>
    )
}


export default CreateBusiness