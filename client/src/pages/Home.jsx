
import AuthForm from "../components/AuthForm/AuthForm";

const Home = ({ auth, authAction, logout, businesses, users, reviews }) => {
  return (
    <div>
      <h1>Home</h1>
      <p>
        See reviews for the {businesses.length}{" "}
        businesses on our website
        <br />
        Check out reviews from {users.length} users
        <br />
        Explore through {reviews.length} helpful reviews
      </p>
          
    </div>
  );
};

export default Home;
