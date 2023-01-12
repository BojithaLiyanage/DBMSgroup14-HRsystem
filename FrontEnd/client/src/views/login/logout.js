import { logout } from "./loginUtils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Logout() {
    const navigate = useNavigate();
    logout();
    useEffect(()=>{
        navigate("/");
    }, []);
};