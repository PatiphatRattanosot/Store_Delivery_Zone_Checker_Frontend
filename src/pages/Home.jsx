import React from 'react';
import Map from '../components/Map';
import { useAuthContext } from '../context/AuthContext';
import NotUserMap from '../components/NotUserMap';


function Home() {
    const { user } = useAuthContext();

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-blue-600 p-4 text-white text-center shadow-md">
                <h1 className="text-3xl font-bold">Store Delivery Zone Checker</h1>
            </header>

            <main className="flex-1 flex items-center justify-center bg-gray-100 p-6">
                {user ? (
                    <div className="w-full rounded-lg shadow-lg overflow-hidden z-0">
                        <Map />
                    </div>
                ) : (
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Welcome to Store Delivery Zone Checker</h1>
                        {/* <p className="text-lg text-gray-600">
                            Please log in to check the delivery zones for your location.
                        </p> */}
                        <NotUserMap />
                    </div>
                )}
            </main>

        </div>
    );
}

export default Home;
