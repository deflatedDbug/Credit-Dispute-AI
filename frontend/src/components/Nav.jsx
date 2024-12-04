import React from "react"
import { useGoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"



export function Nav({isAuthenticated, onLoginSuccess}) {

    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: () => onLoginSuccess(),
        onError: () => console.error("Login Failed")
    });

    const handleLogout = () => {
        localStorage.setItem("isAuthenticated", false);
        navigate("/sign-in");
    }

    return (
        <div className="nav_container">
            <div className="nav_left">
                Dispute AI
            </div>

            <div className="nav_center">
                {/* placeholder for space in between divs */}
            </div>

            <div className="nav_right">
               {isAuthenticated ? (
                <button className="logout-button" onClick={handleLogout}>Logout</button>
               ): (
                <button className="custom-google-button" onClick={login}>
                    <span>
                        Login 
                    </span>
                </button>
               )}
            </div>
        </div>
    )
}

