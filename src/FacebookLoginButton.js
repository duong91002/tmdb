import React from "react";

const FacebookLoginButton = () => {
  // Xử lý sự kiện đăng nhập

  const checkLoginState = () => {
    window.FB.getLoginStatus(function (response) {
      window.statusChangeCallback(response);
    });
  };
  const handleLogin = () => {
    checkLoginState();
  };

  return (
    <div>
      <div
        className="fb-login-button"
        data-scope="public_profile,email"
        data-onlogin={handleLogin()}
      ></div>
    </div>
  );
};

export default FacebookLoginButton;
