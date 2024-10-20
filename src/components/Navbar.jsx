import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';

function Navbar() {
    const { user, logout } = useAuthContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menus = {
        ROLE_ADMIN: [
            { name: "หน้าหลัก", href: "/" },
            { name: "รายชื่อร้านสาขา", href: "/store/list" },
            { name: "เพิ่มร้านสาขา", href: "/store/add" },
        ],
        ROLE_USER: [
            { name: "หน้าหลัก", href: "/" },
        ]
    };

    return (
        <div className="navbar bg-base-100  shadow-lg z-50 sticky top-0">
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>

                {/* Dropdown สำหรับมือถือ */}
                <div className="dropdown lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className={`menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow absolute  ${isMenuOpen ? 'block' : 'hidden'}`}>
                        {user && menus[user.roles[0]].map((menu, index) => (
                            <li key={index}><a href={menu.href}>{menu.name}</a></li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex space-x-4">
                {user && menus[user.roles[0]].map((menu, index) => (
                    <a key={index} className="btn btn-ghost" href={menu.href}>{menu.name}</a>
                ))}
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center space-x-4">
                        <div className="">Welcome, {user.username}</div>
                        <div className="badge badge-outline hidden lg:block">{user.roles[0]}</div>
                        <button className="btn btn-secondary" onClick={() => { logout() }}>Logout</button>
                    </div>
                ) : (
                    <div className="flex space-x-2">
                        <LoginButton />
                        <RegisterButton />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
