import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useStoreContext } from '../context/StoreContext'
import AddressForm from '../components/AddressForm'
import GetLocation from '../components/GetLocation'
import Swal from 'sweetalert2'
import RadioGroup from '../components/RadioGroup'

function AddStorePage() {
    const { user } = useAuthContext()
    const { addStore } = useStoreContext()

    const [selectedOption, setSelectedOption] = useState("option1");
    const [stores, setStores] = useState({
        storeName: "",
        address: "",
        lat: 0.0,
        long: 0.0,
        deliveryRadius: 0,
        userId: user.id
    });


    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const newValue = name === "deliveryRadius" ? parseInt(value, 10) : value;

        setStores({
            ...stores,
            [name]: newValue,
        });
    };


    const handleAddStore = async () => {
        try {
            console.log(stores);

            await addStore(stores);
            setStores({
                storeName: "",
                address: "",
                lat: 0.0,
                long: 0.0,
                deliveryRadius: 0,
                userId: user.id
            });
            setSelectedOption("option1");
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'เพิ่มร้านค้าล้มเหลว',
                text: error.message || 'เกิดข้อผิดพลาด',
                showConfirmButton: false,
                timer: 1500,
            });
            console.error('Error adding store:', error);
        }
    };

    const handleLocationInput = (lat, long, address) => {
        setStores({
            ...stores,
            lat,
            long,
            address,
        });
    };

    const handleGetLocation = (lat, long, address) => {
        setStores({
            ...stores,
            lat,
            long,
            address,
        });
    };

    return (
        <div>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <label className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-center">เพิ่มร้านสาขา</h2>

                    <label className="input-group flex items-center gap-2">
                        <input
                            type="text"
                            name="storeName"
                            className="input input-bordered w-full"
                            placeholder="Store Name"
                            value={stores.storeName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <label className="input-group flex items-center gap-2">
                        <input
                            type="number"
                            name="deliveryRadius"
                            className="input input-bordered w-full"
                            placeholder="Delivery Radius"
                            value={stores.deliveryRadius}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    {/* เพิ่ม RadioGroup สำหรับเลือกการกรอกที่อยู่ */}
                    <RadioGroup selectedOption={selectedOption} handleOptionChange={handleOptionChange} />

                    {selectedOption === "option1" ? (
                        <GetLocation onLocationSelect={handleGetLocation} />
                    ) : (
                        <AddressForm onCoordinatesSelect={handleLocationInput} />
                    )}

                    <button className="btn btn-primary w-full" onClick={handleAddStore}>เพิ่มร้านสาขา</button>
                </label>
            </div>
        </div>
    )
}

export default AddStorePage;
