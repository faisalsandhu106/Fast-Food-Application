import React from 'react'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTheTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]); // Runs whenever pathname changes
    
    return null;
}

export default ScrollTheTop