import React from 'react';

const DeliveryZoneList = ({ withinDeliveryZone }) => {
    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-md">
            {withinDeliveryZone.length > 0 ? (
                <div>
                    <h3 className="text-xl font-bold mb-2">Stores within delivery range:</h3>
                    <ul className="list-disc pl-5">
                        {withinDeliveryZone.map((store, index) => (
                            <li key={index} className="text-gray-700">Store: {store.storeName}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-gray-500">No stores available for delivery.</div>
            )}
        </div>
    );
};

export default DeliveryZoneList;
