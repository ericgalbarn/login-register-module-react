//  Using rafce to create a functional component
import React, { useEffect, useState } from "react";
import "./Login.css";
import "../../App.css";
import Axios from "axios";

// Import React Router DOM
import { Link, useNavigate } from "react-router-dom";

// Import our assets
import video from "../../LoginAssets/video.mp4";
import logo from "../../LoginAssets/logo.png";

//Import React Icons
import { FaUserShield } from "react-icons/fa6";
import { AiOutlineSwapRight } from "react-icons/ai";
import { BsFillShieldLockFill } from "react-icons/bs";

const Login = () => {
  // UseState Hook to store inputs
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigateTo = useNavigate();

  // Show the message to the user
  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setStatusHolder] = useState("message");

  const loginUser = (e) => {
    // Prevent default submitting
    e.preventDefault();
    // We shall require Axios to create an API that connects to the server - npm install axios
    Axios.post("http://localhost:3002/login", {
      // Create variable to send to the server through the route
      LoginUserName: loginUserName,
      LoginPassword: loginPassword,
    }).then((response) => {
      console.log();
      // After having the data successfully from the database, now catch any errors if the credentials don't match
      if (
        response.data.message ||
        (loginUserName == "") | (loginPassword == "")
      ) {
        navigateTo("/"); //Navigate to the same login page
        setLoginStatus("Credentials Don't Exist!");
      } else {
        navigateTo("/dashboard"); //If match then we navigate to the dashboard
        console.log("Successfully Logged In");
        alert("Successfully Logged In");
      }
    });
  };

  useEffect(() => {
    if (loginStatus !== "") {
      setStatusHolder("showMessage"); // Show Message
      setTimeout(() => {
        setStatusHolder("message"); // Hide Message
      }, 4000);
    }
  }, [loginStatus]);

  // Clear the form on submit
  const onSubmit = () => {
    setLoginUserName("");
    setLoginPassword("");
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title">Create And Sell Extraordinary Products</h2>
            <p>Adopt the peace of nature</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Don't have an account?</span>
            <Link to="/register">
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back!</h3>
          </div>

          <form action="" className="form grid" onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  onChange={(event) => {
                    setLoginUserName(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn flex" onClick={loginUser}>
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
