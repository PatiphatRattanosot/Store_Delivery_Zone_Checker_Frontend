import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import houseURL from "../../assets/house.png";

// ไอคอนผู้ใช้
const userIcon = L.icon({
    iconUrl: houseURL,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -40]
});

const UserMarker = ({ user }) => {

    return (
        <Marker position={[user.lat, user.long]} icon={userIcon}>
            <Popup>
                <strong>Home</strong> <br />
                Name: {user.username || ""} <br />
                Email: {user.email || ""} <br />
                Address: {user.address}
            </Popup>
        </Marker>
    );
};

export default UserMarker;
