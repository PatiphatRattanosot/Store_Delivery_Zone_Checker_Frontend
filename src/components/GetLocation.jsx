import React, { useState } from "react";

function GetLocation({ onLocationSelect }) {
    const [address, setAddress] = useState("");

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleGetLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            onLocationSelect(lat, long, address);
        });
    };

    return (
        <div>
            <label className="input-group flex items-center gap-2 mb-2">
                <span className="input-group-text w-10">ที่อยู่</span>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="เช่น 123 Main St, Bangkok, Thailand"
                    value={address}
                    onChange={handleAddressChange}
                    required
                />
            </label>
            <button className="btn btn-accent w-full" type="button" onClick={handleGetLocation}>
                ดึงที่อยู่จากบราวเซอร์
            </button>
        </div>
    );
}

export default GetLocation;
