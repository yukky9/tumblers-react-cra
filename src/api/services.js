import api from "./api";

// NAV
export const getNav = async () => {
    const res = await api.get("/nav");
    return res.data;
};

// PRODUCTS
export const getProducts = async () => {
    const res = await api.get("/products");
    return res.data;
};

export const getProductsByGroup = async (groupId) => {
    const res = await api.get(`/products/${groupId}`);
    return res.data;
};

// PRICE
export const getPrice = async () => {
    const res = await api.get("/price");
    return res.data;
};

// REQUEST FORM
export const sendRequest = async (data) => {
    const res = await api.post("/request", data);
    return res.data;
};

// LINKS
export const getLinks = async () => {
    const res = await api.get("/links");
    return res.data;
};