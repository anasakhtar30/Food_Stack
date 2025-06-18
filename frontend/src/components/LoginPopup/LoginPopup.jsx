import React, { useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");

  ////*************************************************************************888 */

  const {url,setToken} = useContext(StoreContext);


  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const onLogin = async(event)=>{
    event.preventDefault();
    //NOW WE DO API CALL IN THE ON LOGIN FUNCTION
    let newUrl = url;
    if(currentState==="Login"){
      newUrl += "/api/user/login"
    }
    else{
      newUrl +="/api/user/register"
    }

    const response = await axios.post(newUrl,data);
    if(response.data.success){//if this is true so we are login and registered so now we get one token
    setToken(response.data.token);
    localStorage.setItem("token",response.data.token);
    setShowLogin(false);//it will hide the log in page
    }
    else{
      alert(response.data.message)
    }

  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          {/* <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" /> */}
          <img
            onClick={() => {
              setShowLogin(false);
            }}
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account ?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
