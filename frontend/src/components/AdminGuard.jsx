import { Navigate, Outlet } from "react-router-dom";
import { adminTokenKey } from "../api.js";

export default function AdminGuard() {
    return localStorage.getItem(adminTokenKey) ? (
        <Outlet />
    ) : (
        <Navigate to="/admin/login" replace />
    );
}
