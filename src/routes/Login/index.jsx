import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HideIcon from "../../assets/icons/hide.svg";
import ShowIcon from "../../assets/icons/show.svg";

import "./Login.scss";
import { useCookies } from "react-cookie";
import Input from "../../components/HOC/Input";
import { ApiGetNoAuth } from "../../helpers/API/ApiData";
import axios from "axios";
import { toast } from "react-hot-toast";
import { cookieOptions } from "../../helpers/cookieHelper";
export default function Login() {
  const [inputValue, setInputValue] = useState({});
  const [, setCookies] = useCookies(["auth"]);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const onhandleChnage = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let error = {};
    let formIsValid = true;
    if (!inputValue.username) {
      formIsValid = false;
      error["username"] = "Please enter your username.";
    }

    if (!inputValue.password) {
      formIsValid = false;
      error["password"] = "Please enter your password.";
    }
    if (inputValue.password) {
      let pattern = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/
      );
      if (!pattern.test(inputValue.password)) {
        formIsValid = false;
        error["password"] =
          "Password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.";
      }
    }
    setErrors(error);
    return formIsValid;
  };

  const onLogin = () => {
    if (validateForm()) {
      setLoader(true);
      const queryParams = Object.keys(inputValue)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(inputValue[key])
        )
        .join("&");
      ApiGetNoAuth("user/login?" + queryParams)
        .then((res) => {
          setLoader(false);
          if (res.status === 200) {
            setCookies("petcare-token", "special-key", cookieOptions);
            toast.success("Login Successfully");
            navigate("/");
          } else {
            toast.error("Invalid Username or Password");
          }
        })
        .catch((err) => {
          toast.error("Invalid Username or Password");
          setLoader(false);
        });
    }
  };

  return (
    <div>
      <div className="all-login-content-alignment">
        <div className="grid">
          <div className="grid-items"></div>
          <div className="grid-items">
            <div>
              <div className="text">
                <h1>Schedule a Visit Today!</h1>
              </div>

              <Input
                label={"Username"}
                type="text"
                placeholder="Username"
                name="username"
                value={inputValue.username || ""}
                onChange={onhandleChnage}
                errors={errors["username"]}
                isRequired={true}
              />
              <Input
                label={"Password"}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={inputValue.password || ""}
                onChange={onhandleChnage}
                iconRight={showPassword ? ShowIcon : HideIcon}
                onRightIconClick={onToggleShowPassword}
                errors={errors["password"]}
                isRequired={true}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onLogin();
                  }
                }}
              />

              <button disabled={loader} onClick={onLogin}>
                Login
              </button>
              <div className="dont-have-account">
                <p>
                  Don't have an account? <NavLink to="/signup">Signup</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
