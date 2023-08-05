import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { UserAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
// import user from "../redux/user/reducer";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const { googleSignIn } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [from, setFrom] = useState("/");

  useEffect(() => {
    if (location.state && location.state.from) {
      setFrom(location.state.from);
    }
  }, [location]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  };
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser._id !== "") {
      navigate(from);
    }
  }, [currentUser]);

  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        <button className="google-button" onClick={handleGoogleSignIn}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png"
            alt="Google Icon"
            className="google-icon"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
