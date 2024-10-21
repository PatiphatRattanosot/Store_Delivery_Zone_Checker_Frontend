import React from 'react'
import { Outlet } from "react-router-dom";
import { AuthProvider } from '../context/AuthContext';
import { StoreProvider } from '../context/StoreContext';
import Footer from './Footer';
import Navbar from './Navbar';

function Layout() {
    return (
        <div>
            <AuthProvider>
                <StoreProvider>
                    <div className='space-y-4'>
                        <Navbar />
                        <Outlet />
                        <Footer />
                    </div>
                </StoreProvider>
            </AuthProvider>

        </div>
    )
}

export default Layout
