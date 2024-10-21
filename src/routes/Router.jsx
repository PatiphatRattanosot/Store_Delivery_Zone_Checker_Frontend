import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StoreList from "../pages/StoreList";
import AddStorePage from "../pages/AddStorePage";
import EditStore from "../pages/EditStore";
import AdminOnly from "../pages/Admin";
import NotAllowed from "../pages/NotAllowed";


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
                element: <AdminOnly><AddStorePage /></AdminOnly>,
            }, {
                path: "/store/list",
                element: <AdminOnly><StoreList /></AdminOnly>,
            }, {
                path: "/store/edit/:id",
                element: <AdminOnly><EditStore /></AdminOnly>,
            }, {
                path: "/notallow",
                element: <NotAllowed />,
            }
        ],
    },
]);

export default router;