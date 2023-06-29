import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HideIcon from "../../assets/icons/hide.svg";
import ShowIcon from "../../assets/icons/show.svg";
import Input from "../../components/HOC/Input";
import { useCookies } from "react-cookie";
import { ApiPostNoAuth } from "../../helpers/API/ApiData";
import { toast } from "react-hot-toast";
import { cookieOptions } from "../../helpers/cookieHelper";

export default function Signup() {
  const [inputValue, setInputValue] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });
  const [, setCookies] = useCookies(["auth"]);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });
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

  const onToggleShowPassword = (name) => {
    setShowPassword({
      ...showPassword,
      [name]: !showPassword[name],
    });
  };

  const validateForm = () => {
    let error = {};
    let formIsValid = true;
    if (!inputValue.username) {
      formIsValid = false;
      error["username"] = "Please enter your username.";
    }
    if (!inputValue.firstName) {
      formIsValid = false;
      error["firstName"] = "Please enter your first name.";
    }
    if (!inputValue.lastName) {
      formIsValid = false;
      error["lastName"] = "Please enter your last name.";
    }
    if (!inputValue.email) {
      formIsValid = false;
      error["email"] = "Please enter your email.";
    }
    if (inputValue.email) {
      let pattern = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
      if (!pattern.test(inputValue.email)) {
        formIsValid = false;
        error["email"] = "Please enter valid email.";
      }
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
    if (!inputValue.confirm_password) {
      formIsValid = false;
      error["confirm_password"] = "Please enter your confirm password.";
    }
    if (inputValue.confirm_password) {
      if (inputValue.confirm_password !== inputValue.password) {
        formIsValid = false;
        error["confirm_password"] = "Password does not match.";
      }
    }

    if (!inputValue.phone) {
      formIsValid = false;
      error["phone"] = "Please enter your phone.";
    }
    if (inputValue.phone) {
      let pattern = new RegExp(/^[0-9]{10}$/);
      if (!pattern.test(inputValue.phone)) {
        formIsValid = false;
        error["phone"] = "Please enter valid phone.";
      }
    }
    setErrors(error);
    return formIsValid;
  };

  const onSignup = () => {
    if (validateForm()) {
      setLoader(true);
      delete inputValue.confirm_password;
      ApiPostNoAuth("user", inputValue)
        .then((res) => {
          setLoader(false);
          if (res.status === 200) {
            setCookies("petcare-token", "special-key", cookieOptions);
            toast.success("Signup Successfully");
            navigate("/");
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setLoader(false);
        });
    }
  };

  return (
    <div className="all-login-content-alignment">
      <div className="grid">
        <div className="grid-items"></div>
        <div className="grid-items">
          <div>
            <div className="text">
              <h1>Schedule a Visit Today!</h1>
            </div>
            <div className="continer-alignment">
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
              <div className="two-grid">
                <Input
                  label={"First Name"}
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={inputValue.firstName || ""}
                  onChange={onhandleChnage}
                  errors={errors["firstName"]}
                  isRequired={true}
                />
                <Input
                  label={"Last Name"}
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={inputValue.lastName || ""}
                  onChange={onhandleChnage}
                  errors={errors["lastName"]}
                  isRequired={true}
                />
              </div>
              <div className="two-grid">
                <Input
                  label={"Email"}
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={inputValue.email || ""}
                  onChange={onhandleChnage}
                  errors={errors["email"]}
                  isRequired={true}
                />
                <Input
                  label={"Phone"}
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={inputValue.phone || ""}
                  onChange={onhandleChnage}
                  errors={errors["phone"]}
                  isRequired={true}
                />
              </div>
              <Input
                label={"Password"}
                type={showPassword?.password ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={inputValue.password || ""}
                onChange={onhandleChnage}
                iconRight={showPassword?.password ? ShowIcon : HideIcon}
                onRightIconClick={() => onToggleShowPassword("password")}
                errors={errors["password"]}
                isRequired={true}
              />
              <Input
                label={"Confirm Password"}
                type={showPassword?.confirm_password ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirm_password"
                value={inputValue.confirm_password || ""}
                onChange={onhandleChnage}
                iconRight={showPassword?.confirm_password ? ShowIcon : HideIcon}
                onRightIconClick={() =>
                  onToggleShowPassword("confirm_password")
                }
                errors={errors["confirm_password"]}
                isRequired={true}
              />
            </div>
            <button disabled={loader} onClick={onSignup}>
              Signup
            </button>

            <div className="dont-have-account">
              <p>
                Already have an account? <NavLink to="/login">Login</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
