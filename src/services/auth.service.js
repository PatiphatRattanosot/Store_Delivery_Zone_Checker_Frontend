import api from "./api";


const API_URL = import.meta.env.VITE_AUTH_API_URL;

const register = async (username, email, password, address, lat, long) => {

    return await api.post(`${API_URL}/signup`, { username, email, password, address, lat, long });
};

const login = async (username, password) => {
    console.log("Log from service", username, password);


    const response = await api.post(API_URL + "/signin", { username, password });
    if (response.data.accessToken) {
        localStorage.setItem(
            "accessToken",
            JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};
// logout
const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
};

const AuthService = {
    register,
    login,
    logout
};

export default AuthService;