import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

function LoginPage() {
    const { login } = useAuthContext();
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserLogin({
            ...userLogin,
            [name]: value,
        });
    };

    const handleLogin = async () => {
        try {
            console.log("Log from LoginPage", userLogin);

            const response = await login(userLogin.username, userLogin.password);
            if (response.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                window.location.href = "/";
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login failed",
                    text: response.data.message,
                });
            }
        } catch (error) {
            console.log("Login failed");

        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <label className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center">เข้าสู่ระบบ</h2>

                <label className="input-group flex items-center gap-2">
                    <span className="input-group-text bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        name="username"
                        className="input input-bordered w-full"
                        placeholder="Username"
                        value={userLogin.username}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label className="input-group flex items-center gap-2">
                    <span className="input-group-text bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <input
                        type="password"
                        name="password"
                        className="input input-bordered w-full"
                        placeholder="Password"
                        value={userLogin.password}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <button className="btn btn-primary w-full" onClick={handleLogin}>เข้าสู่ระบบ</button>
            </label>
        </div>
    );
}

export default LoginPage;
