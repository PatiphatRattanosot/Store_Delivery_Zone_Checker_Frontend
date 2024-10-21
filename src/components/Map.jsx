import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useStoreContext } from '../context/StoreContext';
import MapContainerComponent from './mapComponent/MapContainer';
import UserMarker from './mapComponent/UserMarker';
import StoreMarkers from './mapComponent/StoreMarkers';
import DeliveryZoneList from './mapComponent/DeliveryZoneList';





function Map() {
    const { user } = useAuthContext();
    const { stores } = useStoreContext();
    const [withinDeliveryZone, setWithinDeliveryZone] = useState([]);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371000;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };


    useEffect(() => {
        const checkDeliveryZones = () => {
            const availableStores = stores.filter(store => {
                const distance = calculateDistance(user.lat, user.long, store.lat, store.long);
                return distance <= store.daliveryRadius;
            });
            setWithinDeliveryZone(availableStores);
        };
        checkDeliveryZones();
    }, [stores, user]);

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='card w-full lg:w-3/4 bg-base-100 shadow-xl'>
                <div className='card-body my-8'>
                    <h1 className='card-title text-center text-2xl'>Store Delivery Zone Checker</h1>
                    <DeliveryZoneList withinDeliveryZone={withinDeliveryZone} />
                    <div className='w-full h-screen'>

                        <MapContainerComponent center={[user.lat, user.long]}>
                            <UserMarker user={user} />
                            <StoreMarkers stores={stores} user={user} />
                        </MapContainerComponent>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;
