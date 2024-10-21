import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
function AdminOrMode({ children }) {
    const { user } = useAuthContext();
    if (!user) {
        return <Navigate to="/login" />;
    }
    if (
        user.roles.includes("ROLE_ADMIN")
    ) { return children }
    return <Navigate to="/notallow" />;
}

export default AdminOrMode;