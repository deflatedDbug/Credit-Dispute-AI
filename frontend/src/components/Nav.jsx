import React from "react"
import { useNavigate } from "react-router-dom"

export function Nav({isAuthenticated, onLoginSuccess}) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated")  
        onLoginSuccess(false);
        navigate("/sign-in");
    }

    return (
        <div className="nav_container">
            <div className="nav_left">
                DisputeAI
            </div>

            <div className="nav_center">
                {/* placeholder for space in between divs */}
            </div>

            <div className="nav_right">
               {isAuthenticated ? (
                <button className="logout-button" onClick={handleLogout}>Logout</button>
               ): (
                ''
               )}
            </div>
        </div>
    )
}

