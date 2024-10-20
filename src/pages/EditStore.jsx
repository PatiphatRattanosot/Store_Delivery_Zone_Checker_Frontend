import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context/StoreContext';

function EditStore() {
    const { id } = useParams();
    const { updateStore, getStoreById } = useStoreContext();
    const navigate = useNavigate();

    const [storeData, setStoreData] = useState({
        storeName: '',
        address: '',
        lat: 0.0,
        long: 0.0,
        daliveryRadius: 0,
    });

    useEffect(() => {
        try {
            const fetchStoreData = async () => {
                const store = await getStoreById(id);
                setStoreData(store);
            };
            fetchStoreData();
        } catch (error) {
            console.error('Error fetching store data:', error);
        }
    }, [id, getStoreById]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoreData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        await updateStore(id, storeData);
        navigate('/store/list');
    };




    return (
        <div className="p-4">
            <div className="flex items-center justify-center">

                <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
                    <h1 className="text-xl font-bold mb-4">Edit Store</h1>
                    <div className="mb-4">
                        <label className="block mb-1">Store Name</label>
                        <input
                            type="text"
                            name="storeName"
                            value={storeData.storeName}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={storeData.address}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Latitude</label>
                        <input
                            type="number"
                            name="lat"
                            value={storeData.lat}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Longitude</label>
                        <input
                            type="number"
                            name="long"
                            value={storeData.long}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Delivery Radius (m)</label>
                        <input
                            type="number"
                            name="deliveryRadius"
                            value={storeData.daliveryRadius}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary">Update Store</button>
                </div>
            </div>
        </div>
    );
}

export default EditStore;
