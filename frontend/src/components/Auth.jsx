import React from "react";
import { GoogleLogin } from "@react-oauth/google";

export function Auth({onLoginSuccess}) {
  return (
    <div className="auth-container">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          try {
            onLoginSuccess();
          } catch (error) {
            console.error("Failed to decode token", error);
          }
        }}
        onError={() => console.error("Login Failed")}
      />
    </div>
  );
}
