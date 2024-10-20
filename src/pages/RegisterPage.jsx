import React, { useState } from "react";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import AddressForm from "../components/AddressForm";
import GetLocation from "../components/GetLocation";
import RadioGroup from "../components/RadioGroup";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [selectedOption, setSelectedOption] = useState("option1");
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
        lat: null,
        long: null,
    });

    const navigate = useNavigate();


    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleLocationInput = (lat, long, address) => {
        setUser({
            ...user,
            lat,
            long,
            address,
        });
    };

    const handleGetLocation = (lat, long, address) => {
        setUser({
            ...user,
            lat,
            long,
            address,
        });
    };

    const handleSubmit = async () => {
        try {
            console.log(user);
            const response = await AuthService.register(
                user.username,
                user.email,
                user.password,
                user.address,
                user.lat,
                user.long
            );
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Register successful",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/login");
            } else {
                Swal.fire({ 
                    icon: "error",
                    title: "Register failed",
                    text: response.data.message || response.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.log("Register failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center">สมัครสมาชิก</h2>

                <label className="input-group flex items-center gap-2">
                    <span className="input-group-text bg-gray-200"></span>
                    <input
                        type="text"
                        name="email"
                        value={user.email}
                        className="input input-bordered w-full"
                        placeholder="Email"
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label className="input-group flex items-center gap-2">
                    <span className="input-group-text bg-gray-200"></span>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        className="input input-bordered w-full"
                        placeholder="Username"
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label className="input-group flex items-center gap-2">
                    <span className="input-group-text bg-gray-200"></span>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        className="input input-bordered w-full"
                        placeholder="Password"
                        onChange={handleInputChange}
                        required
                    />
                </label>

                {/* ใช้งาน RadioGroup Component */}
                <RadioGroup selectedOption={selectedOption} handleOptionChange={handleOptionChange} />

                {selectedOption === "option1" ? (
                    <div>
                        <GetLocation onLocationSelect={handleGetLocation} />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AddressForm onCoordinatesSelect={handleLocationInput} />
                    </div>
                )}

                <button className="btn btn-primary w-full" type="button" onClick={handleSubmit}>
                    สมัครสมาชิก
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;
