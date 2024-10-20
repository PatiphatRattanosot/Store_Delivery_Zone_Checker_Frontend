import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';

function Navbar() {
    const { user, logout } = useAuthContext(); // ดึงข้อมูลผู้ใช้จาก context

    const menus = {
        ROLE_ADMIN: [
            { name: "หน้าหลัก", href: "/" },
            { name: "เพิ่มร้านสาขา", href: "/store/add" },
        ],
        ROLE_USER: [
            { name: "หน้าหลัก", href: "/" },
        ]
    };

    // เลือกเมนูตามบทบาทผู้ใช้


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center space-x-4">
                {user && menus[user.roles[0]].map((menu, index) => (
                    <a key={index} className="btn btn-ghost" href={menu.href}>{menu.name}</a>
                ))}
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center space-x-4">
                        <div>Welcome, {user.username}</div>
                        <div className="badge badge-outline">{user.roles[0] }</div>
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
