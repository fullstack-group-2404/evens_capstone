import React from 'react'
import { Link } from "react-router-dom";

export default function NotAuth() {
  return (
    <div>
      <h1>User Not Authorized</h1>
      <br></br>
      <Link to="/">Return to Home Page</Link>
    </div>
  )
}
