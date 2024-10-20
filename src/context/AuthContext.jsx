import React, { useState, useEffect, useContext, createContext } from 'react'
import AuthService from '../services/auth.service'
import Swal from 'sweetalert2'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const getUser = () => {
        const temp = localStorage.getItem("user");
        const savedUser = JSON.parse(temp);
        return savedUser || null;
    }

    const [user, setUser] = useState(getUser)

    const login = async (username, password) => {
        try {
            console.log("login called", username, password);

            const user = await AuthService.login(username, password)
            setUser(user)
            return user
        } catch (err) {
            console.error(err)
        }
    }

    const logout = () => {
        AuthService.logout()
        setUser(null)
        Swal.fire({
            icon: 'success',
            title: 'Logout successful',
            showConfirmButton: false,
            timer: 1500
        })
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
