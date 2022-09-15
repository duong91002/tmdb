import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { Button, AlertTitle, Stack, Alert } from "@mui/material";
import Header from "../header/Header";
const Login = () => {
  const param = window.location.pathname;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [myname, setMyName] = useState("");
  const [password, setPassword] = useState("");
  const [alerts, setAlert] = useState(false);
  const inputs = { email: email, userName: myname, password: password };
  const handeSubmit = (key) => {
    if (key === 0) {
      if (email === "" || password === "") {
        setAlert(true);
      } else {
        axios.post(`${process.env.URL_SEVER}`, inputs).then((res) => {
          if (res.status === 200) {
            window.localStorage.setItem("user", JSON.stringify(res.data));
            alert("Successful login!");
            navigate("/");
            setAlert(false);
          }
        });
      }
    } else {
      if (email === "" || myname === "" || password === "") {
        setAlert(true);
      } else if (email !== "" && myname !== "" && password !== "") {
        const re =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
          axios.post(`${process.env.URL_SEVER}`, inputs).then((res) => {
            if (res.status === 200) {
              window.localStorage.setItem(
                "user",
                JSON.stringify({
                  email: email,
                  name: myname,
                  time: new Date(Date.now()),
                })
              );
              alert("Successful signup!");
              navigate("/");
              setAlert(false);
              setMyName("");
            }
          });
        } else {
          setAlert(true);
        }
      }
    }
  };
  return (
    <>
      <Header />
      <div className="panelContainer">
        <div className="ContentContainer">
          {alerts === true ? (
            <Stack
              sx={{
                width: "40%",
                position: "fixed",
                top: "20%",
                left: "30%",
                color: "#363636",
              }}
              spacing={2}
            >
              <Alert
                severity="warning"
                action={
                  <Button
                    onClick={() => {
                      setAlert(false);
                    }}
                    sx={{ color: "#363636" }}
                    color="inherit"
                    size="small"
                  >
                    Ok
                  </Button>
                }
              >
                <AlertTitle sx={{ color: "#363636" }}>Warning</AlertTitle>
                <strong style={{ color: "#363636" }}>
                  You must enter in full!
                </strong>
              </Alert>
            </Stack>
          ) : (
            ""
          )}
          <div className="backpanel">
            <div className="panelLogin">
              <h1 className="headerLogin">Login</h1>
              <div style={{ backgroundColor: "#363636", borderRadius: "5px" }}>
                <div className="contentLogin">
                  <input
                    type={"text"}
                    className="inputLogin"
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  {param === "/Login" ? (
                    ""
                  ) : (
                    <input
                      type={"text"}
                      className="inputLogin"
                      placeholder="Your Name..."
                      onChange={(e) => setMyName(e.target.value)}
                    ></input>
                  )}
                  <input
                    type={"password"}
                    className="inputLogin"
                    placeholder="Password..."
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  {param === "/Login" ? (
                    <h3 className="btnlogin" onClick={() => handeSubmit(0)}>
                      Login
                    </h3>
                  ) : (
                    <h3 className="btnlogin" onClick={() => handeSubmit(1)}>
                      Sign Up
                    </h3>
                  )}

                  <div className="or">Or</div>
                  <h3 className="btnGoogle">Login with Google</h3>
                </div>
              </div>
              <div className="footerLogin">
                {param === "/Login" ? (
                  <div className="rightfooter">
                    <Link to="/signup" className="colorlink">
                      Sign Up
                    </Link>{" "}
                    ·{" "}
                    <Link to="" className="colorlink">
                      Forgot Password ?
                    </Link>
                  </div>
                ) : (
                  <div className="rightfooter">
                    <Link to="/Login" className="colorlink">
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
