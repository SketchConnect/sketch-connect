import React, { useEffect } from "react";
import "./LoginPage.css";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);

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
        {/* <button className="apple-button" onClick={handleAppleSignIn}>
          <img
            src="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png"
            alt="Apple Icon"
            className="apple-icon"
          />
          Sign in with Apple
        </button>
        <button className="fb-button" onClick={handleFacebookSignIn}>
          <img
            src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"
            alt="fb Icon"
            className="fb-icon"
          />
          Sign in with Facebook
        </button> */}
      </div>
    </div>
  );
};

export default LoginPage;
