import { useState, useEffect, useContext, createContext } from "react";
import StoreService from "../services/store.service";
import Swal from "sweetalert2";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [stores, setStores] = useState([]);
    const [swap, setSwap] = useState(false);

    const getStores = async () => {
        try {
            const response = await StoreService.getStores();
            if (response.status === 200) {
                setStores(response.data);

            }
        } catch (err) {
            console.error(err || "Error fetching stores");
        }
    };

    const getStoreById = async (id) => {
        try {
            const response = await StoreService.getStoreById(id);
            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.error(err);
        }
    };

    const addStore = async (newStore) => {
        try {
            const response = await StoreService.createStore(newStore);
            if (response.status === 200) {
                setStores((stores) => [...stores, response.data]);
                Swal.fire({
                    icon: "success",
                    title: "Store updated successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setSwap(!swap);
            }
        } catch (error) {
            console.log(error || "Add store failed");

        }
    }

    const updateStore = async (id, updatedStore) => {
        try {
            const response = await StoreService.updateStore(id, updatedStore);
            if (response.status === 200) {
                setStores((prev) =>
                    prev.map((store) => {
                        if (store.id === id) {

                            return updatedStore;
                        }
                        return store;
                    }
                    )
                );
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Store updated successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setSwap(!swap);
            }
        } catch (error) {
            console.log(error || "Update store failed");

        }
    }

    const deleteStore = async (id) => {
        try {
            const response = await StoreService.deleteStore(id);
            if (response.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Store deleted successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setSwap(!swap)
            }
        } catch (error) {
            console.log(error || "Delete store failed");

        }
    }


    useEffect(() => {
        getStores();
    }, [swap]);

    return (
        <StoreContext.Provider value={{ stores, getStoreById, addStore, updateStore, deleteStore }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStoreContext = () => useContext(StoreContext);
