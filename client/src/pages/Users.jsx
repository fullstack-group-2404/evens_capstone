import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";




const Users = async => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users`)
        if (!response.ok) {
          throw new Error('failed to get users');
        }
        const data = await response.json();
        console.log(data);
        setUsersData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    getUsers();
  }, []);

  return (<div>
    <h1>Seen It has {usersData.length} users!</h1>



    {usersData?.map(function (data) {
      return (
        <>


          <div className="main-layout">
            <div className="user-card" key={data}>
              Name: {data.username}

            </div>

          </div>
        </>
      )
    })}
  </div>
  )
}





export default Users
