import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
const GEO_KEY = import.meta.env.VITE_GEO_KEY;


function AddressForm({ onCoordinatesSelect }) {
    const [address, setAddress] = useState('');

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleGeocode = async () => {
        try {

            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    address: address,
                    key: GEO_KEY,
                },
            });
            if (response.data.status === 'OK') {
                const location = response.data.results[0].geometry.location;
                Swal.fire({
                    icon: "success",
                    title: "ค้นหาพิกัดสำเร็จ",
                    text: `ละติจูด: ${location.lat}, ลองจิจูด: ${location.lng}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                onCoordinatesSelect(location.lat, location.lng, address);

            } else {
                console.log("ผิดพลาดการค้นหาพิกัด");

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
