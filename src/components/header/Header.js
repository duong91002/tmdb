import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const [scroll, setScroll] = useState(0);
  const [width, setWidth] = useState(0);
  const [bars, setBars] = useState(0);
  const jsonchild = JSON.parse(window.localStorage.getItem("user"));
  const [display, setdisplay] = useState("");
  const [information, setInformation] = useState(false);
  useEffect(() => {
    const handleScrollY = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScrollY);
    const handleWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWidth);
    if (bars % 2 === 0 && width <= 700) {
      setdisplay("none");
    } else if (bars % 2 !== 0 && width <= 700) {
      setdisplay("block");
    } else {
      setdisplay("none");
      setBars(0);
    }
    return () => {
      window.removeEventListener("resize", handleWidth);
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [bars, width, scroll]);

  const handleBars = () => {
    setBars(bars + 1);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    if (information === true) {
      setInformation(false);
    } else {
      setInformation(true);
    }
    window.localStorage.clear();
    navigate("/");
  };
  const itemHeader = [
    { id: 1, name: "Movie", url: "/movie" },
    { id: 2, name: "TV Show", url: "/tv" },
    { id: 3, name: "Genre", url: "../movie/genre?g=28&page=1" },
  ];
  return (
    <>
      <div
        className="header"
        style={{
          backgroundColor: scroll > 60 ? "rgba(51,10,103,.93)" : "",
        }}
      >
        <Link to="/" className="linkIconHome">
          <img
            className="iconHome"
            src="https://xemphim.fun/static/skin/logo-full.png"
          ></img>
        </Link>

        <div className="menuHeader">
          <div className="menuHeader-left">
            {itemHeader.map((item) => {
              return (
                <div className="menuHeader-leftChild" key={item.id}>
                  <Link to={`${item.url}`} className="link-hdLeftChild">
                    {item.name}
                  </Link>
                </div>
              );
            })}
            <div className="panel-search">
              <Link to="/Search" className="link-hdLeftChild">
                <i className="fa-solid fa-magnifying-glass"></i> Search
              </Link>
            </div>
          </div>

          {jsonchild === null ? (
            <>
              <div className="menuHeader-right">
                <div className="btnLogin">
                  <Link to="/Login" className="link-Login">
                    LOGIN
                  </Link>
                </div>
              </div>
              <div className="panel-bars">
                <div className="bars" onClick={handleBars}>
                  <i className="fa-solid fa-bars icon-bars"></i>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="menuHeader-right">
                <div
                  className="logout"
                  onClick={() => {
                    if (information === true) {
                      setInformation(false);
                    } else {
                      setInformation(true);
                    }
                  }}
                >
                  {jsonchild.name} <i className="fas fa-angle-down"></i>
                </div>
              </div>
              <div className="panel-bars">
                <div
                  className="logout"
                  onClick={() => {
                    if (information === true) {
                      setInformation(false);
                    } else {
                      setInformation(true);
                    }
                  }}
                >
                  {jsonchild.name} <i className="fas fa-angle-down"></i>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {information === true ? (
        <div className="modalIfm">
          <div className="panelItemIfm">
            <Link to="/setting">
              <div className="hoveritemIfm">Information</div>
            </Link>

            <div className="hoveritemIfm">Donate</div>
            <div onClick={handleLogout} className="hoveritemIfm">
              Logout
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div
        className="modal-back"
        style={{ display: display }}
        onClick={handleBars}
      ></div>
      <div className="slideBars" style={{ display: display }}>
        <div className="slideBars-Top">
          <div className="btnLogin-slideBars" onClick={handleBars}>
            <Link to="/Login" className="linkStyle-slideBars">
              Login
            </Link>
          </div>
          <Link to="/signup">
            <div className="linkbtn-slideBars" onClick={handleBars}>
              Sign Up
            </div>
          </Link>
        </div>
        <div className="slideBars-End">
          <Link to="/movie">
            <div className="linkbtn-slideBars" onClick={handleBars}>
              Movie
            </div>
          </Link>
          <Link to="/tv">
            <div className="linkbtn-slideBars" onClick={handleBars}>
              TV Show
            </div>
          </Link>
          <Link to="movie/genre?g=28&page=1">
            <div className="linkbtn-slideBars" onClick={handleBars}>
              Genre
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
