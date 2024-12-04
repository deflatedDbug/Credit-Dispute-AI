import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

export function Auth({onLoginSuccess}) {
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      try {
        onLoginSuccess();
      }catch (error) {
        console.error("Failed to decode token", error);
      }
    },
    onError: () => console.error("Login Failed")
  })
  return (
    <div className="auth-container">
      <button className="custom-google-button" onClick={login}>
        <img src="" alt="" className="google-icon" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
