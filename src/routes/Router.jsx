import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AddressForm from "../components/AddressForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <App />,
            }, {
                path: "/login",
                element: <LoginPage />,
            }, {
                path: "/register",
                element: <RegisterPage />,
            }, {
                path: "/address",
                element: <AddressForm />,
            }
        ],
    },
]);

export default router;