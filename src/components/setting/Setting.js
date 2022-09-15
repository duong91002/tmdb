import React from "react";
import "./Setting.scss";
import Header from "../header/Header";
const Setting = () => {
  const jsonChild = JSON.parse(window.localStorage.getItem("user"));
  return (
    <>
      <Header />
      <div style={{ height: "120px" }}></div>
      <div className="panelSetting">
        <h1 style={{ padding: "20px 0" }}>{jsonChild.name}</h1>
        <p>Date of accession: {jsonChild.time}</p>
        <p>Email: {jsonChild.email}</p>
      </div>
    </>
  );
};

export default Setting;
