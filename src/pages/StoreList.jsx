import React from 'react';
import { useStoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

function StoreList() {
    const { stores, deleteStore } = useStoreContext();
    const navigate = useNavigate();

    const editStore = (id) => {
        navigate(`/store/edit/${id}`);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Store List</h1>
            <div className="overflow-x-auto">
                <table className="table w-full text-left">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Delivery Radius (km)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map((store) => (
                            <tr key={store.id}>
                                <td>{store.storeName}</td>
                                <td>{store.address}</td>
                                <td>{store.lat}</td>
                                <td>{store.long}</td>
                                <td>{store.daliveryRadius}</td>
                                <td>
                                    <button
                                        className="btn btn-primary mr-2"
                                        onClick={() => editStore(store.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteStore(store.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StoreList;
