import React from 'react'
import { Outlet } from "react-router-dom";
import { AuthProvider } from '../context/AuthContext';
import { StoreProvider } from '../context/StoreControllre';
import Navbar from './Navbar';

function Layout() {
    return (
        <div>
            <AuthProvider>
                <StoreProvider>
                    <div>
                        <Navbar />
                        <Outlet />
                    </div>
                </StoreProvider>
            </AuthProvider>

        </div>
    )
}

export default Layout
