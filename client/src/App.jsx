import { useState, useEffect, useCallback } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import CreateReview from "./pages/CreateReview";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBusiness from "./pages/CreateBusiness";
import SingleBusiness from "./pages/SingleBusiness";
import UserReviews from "./pages/UserReviews";
import NotAuth from "./pages/NotAuth";
import "./index.css";

// 
function App() {
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  

  useEffect(() => {
    attemptLoginWithToken();
  }, []);

  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await fetch(`/api/auth/me`, {
        headers: {
          authorization: token,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
      } else {
        window.localStorage.removeItem("token");
      }
    }
  };

  const authAction = async (credentials, mode) => {
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (response.ok) {
      window.localStorage.setItem("token", json.token);
      attemptLoginWithToken();
    } else {
      throw json;
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getBusiness = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/api/businesses`)
      if (!response.ok) {
        throw new Error('failed to get businesses');
      }
      const data = await response.json();
      console.log(data);
      setBusinesses(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBusiness();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASEURL}/api/users`)
        if (!response.ok) {
          throw new Error('failed to get users');
        }
        const data = await response.json();
        console.log(data);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    getUsers();
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASEURL}/api/reviews`)
        if (!response.ok) {
          throw new Error('failed to get reviews');
        }
        const data = await response.json();
        console.log(data);
        setReviews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    getReviews();
  }, []);



  return (
    <div>
      <h1>Seen It Business Reviews</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/businesses">Businesses ({businesses.length})</Link>
        {auth.id ? <Link to="/createbusiness">Add a Business</Link> : null}
        <Link to="/users">Users ({users.length})</Link>
        {auth.id ? (
          <Link to="/createReview">Create Review</Link>
        ) : (<Link to="/login">Login</Link>)}
      </nav>
      <div className="logout">
        {auth.id && <button onClick={logout}>Logout {capitalizeFirstLetter(auth.username)}</button>}

      </div>
      <div className="thumbs-up">
        <img src="/images/349027.png" alt="approved"></img>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              authAction={authAction}
              auth={auth}
              businesses={businesses}
              users={users}
              reviews={reviews}
            />
          }
        />
        <Route
          path="/businesses"
          element={<Businesses businesses={businesses} />}
        />
        <Route path="/users" element={<Users users={users} />} />
        {!!auth.id && <Route path="/createreview" element={<CreateReview businesses={businesses} auth={auth} />} />}

        <Route path="/login" element={<Login
          authAction={authAction}
          auth={auth}
          businesses={businesses}
          users={users}
          reviews={reviews} />} />

        <Route path="/register" element={<Register
          authAction={authAction}
          auth={auth}
          businesses={businesses}
          users={users}
          reviews={reviews} />} />


        <Route path="/createbusiness" element={<CreateBusiness
          businesses={businesses} auth={auth} getBusiness={getBusiness}/>} />

        <Route path="/userreviews/:id" element={<UserReviews
          users={users} reviews={reviews} businesses={businesses} auth={auth} />} />

        <Route path="/businesses/:id" element={<SingleBusiness businesses={businesses} reviews={reviews} />} />

        <Route
          path="/notauthorized"
          element={<NotAuth />}
        />


      </Routes>
    </div>
  );

}


export default App;
