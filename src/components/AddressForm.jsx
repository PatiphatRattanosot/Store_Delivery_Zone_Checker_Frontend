import React, { useState } from 'react';
import axios from 'axios';

function AddressForm({ onCoordinatesSelect }) {
    const [address, setAddress] = useState('');

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleGeocode = async () => {
        try {
            const API_KEY = 'AIzaSyDuL0xEbaDYeBbUA8pelFWxzi1tOy2WVJM';
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    address: address,
                    key: API_KEY,
                },
            });
            if (response.data.status === 'OK') {
                const location = response.data.results[0].geometry.location;
                onCoordinatesSelect(location.lat, location.lng, address);

            } else {
                console.log("ผิดพลาfการค้นหาพิกัด");

            }
        } catch (error) {
            console.error('Error fetching geocode:', error);
            console.log("เกิดข้อผิดพลาดในการค้นหาพิกัด");
        }
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
                />
            </label>
            <button className="btn btn-accent w-full" type="button" onClick={handleGeocode}>
                ค้นหาพิกัด
            </button>
        </div>
    );
}

export default AddressForm;
