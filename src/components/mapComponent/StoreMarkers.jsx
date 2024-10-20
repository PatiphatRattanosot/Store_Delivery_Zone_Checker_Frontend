import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import storeURL from "../../assets/store.png";



const StoreMarkers = ({ stores, user }) => {


    const storeIcon = L.icon({
        iconUrl: storeURL,
        iconSize: [30, 30],
        iconAnchor: [19, 38],
        popupAnchor: [0, -40]
    });


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


    return stores.map((store, index) => (
        <Marker key={index} position={[store.lat, store.long]} icon={storeIcon}>
            <Popup>
                <strong>Store: {store.storeName}</strong> <br />
                Address: {store.address} <br />
                Delivery Radius: {store.daliveryRadius} m <br />
                {calculateDistance(user.lat, user.long, store.lat, store.long) <= store.daliveryRadius
                    ? <span style={{ color: 'green' }}>This store can deliver to you!</span>
                    : <span style={{ color: 'red' }}>Out of delivery range</span>
                }
                <br />
                Distance to store: {calculateDistance(user.lat, user.long, store.lat, store.long).toFixed(0)} meters
            </Popup>
        </Marker>
    ));
};

export default StoreMarkers;
