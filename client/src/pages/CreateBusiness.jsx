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
        <div>
            <h1>Add Your Own Business To Seen It Reviews!</h1>
            <form className='business-form' onSubmit={handleSubmit}>
                <label>
                <input onChange={(e) => setBusName(e.target.value)} placeholder='Business Name' />
                </label>
                <br></br>
                <input onChange={(e) => setCategory(e.target.value)} placeholder='Category' />
                <br></br>
                <input onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                <br></br>
                <input onChange={(e) => setImageUrl(e.target.value)} placeholder='Image URL' />
                <br></br>
                <button type='submit'>Add Business</button>



            </form>



        </div>
    )
}


export default CreateBusiness