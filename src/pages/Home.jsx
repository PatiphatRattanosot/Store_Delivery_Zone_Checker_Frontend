import React from 'react'
import Map from '../components/Map'
import { useAuthContext } from '../context/AuthContext'
function Home() {
    const { user } = useAuthContext()
    return (
        <div>
            {user ? <Map></Map> : <div>
                <h1 className='card-title text-center text-2xl'><span>Welcome to</span>Store Delivery Zone Checker</h1>
            </div>}
        </div>
    )
}

export default Home
