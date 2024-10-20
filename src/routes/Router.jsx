import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StoreList from "../pages/StoreList";
import AddStorePage from "../pages/AddStorePage";
import EditStore from "../pages/EditStore";

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
                path: "/store/add",
                element: <AddStorePage />,
            }, {
                path: "/store/list",
                element: <StoreList />,
            }, {
                path: "/store/edit/:id",
                element: <EditStore />,
            }
        ],
    },
]);

export default router;