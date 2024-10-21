import React, { useState } from 'react';
import GetLocation from './GetLocation';
import AddressForm from './AddressForm';
import MapContainerComponent from './mapComponent/MapContainer';
import UserMarker from './mapComponent/UserMarker';
import RadioGroup from './RadioGroup';
import { useStoreContext } from '../context/StoreContext';
import StoreMarkers from './mapComponent/StoreMarkers';


function LocationSelector() {
    const [user, setUser] = useState(null);
    const { stores } = useStoreContext();
    const [selectedOption, setSelectedOption] = useState("option1");
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
    }

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">ค้นหาพิกัดของคุณ</h1>

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

            {/* Map preview */}
            {user && (
                <div className="w-full h-96 ">
                    <h2 className="text-xl font-semibold mb-4">ตำแหน่งที่เลือก:</h2>
                    <div className="w-full h-full rounded-lg shadow-lg">
                        {/* Map rendering */}
                        <MapContainerComponent center={[user.lat, user.long]}>
                            <UserMarker user={user} />
                            <StoreMarkers user={user} stores={stores} />
                        </MapContainerComponent>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LocationSelector;
