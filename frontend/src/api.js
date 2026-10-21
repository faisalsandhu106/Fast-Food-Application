import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

export async function createOrder(payload) {
  const response = await api.post("/orders", payload);
  return response.data.order;
}

export async function getOrder(orderId) {
  const response = await api.get(`/orders/${encodeURIComponent(orderId)}`);
  return response.data.order;
}

export default api;

const ADMIN_TOKEN_KEY = "tahas-bite-admin-token";
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const adminTokenKey = ADMIN_TOKEN_KEY;
export async function fetchProducts(params = {}) { return (await api.get("/products", { params })).data.products; }
export async function fetchProduct(id) { return (await api.get(`/products/${encodeURIComponent(id)}`)).data.product; }
export async function sendContact(payload) { return (await api.post("/contacts", payload)).data; }
export async function adminLogin(payload) { return (await api.post("/admin/login", payload)).data; }
export async function adminStats() { return (await api.get("/admin/stats")).data.stats; }
export async function adminProducts(params = {}) { return (await api.get("/admin/products", { params })).data.products; }
export async function adminProduct(id) { return (await api.get(`/admin/products/${id}`)).data.product; }
export async function createProduct(payload) { return (await api.post("/admin/products", payload)).data.product; }
export async function updateProduct(id, payload) { return (await api.put(`/admin/products/${id}`, payload)).data.product; }
export async function deleteProduct(id) { return (await api.delete(`/admin/products/${id}`)).data; }
export async function adminOrders(params = {}) { return (await api.get("/admin/orders", { params })).data.orders; }
export async function adminOrder(id) { return (await api.get(`/admin/orders/${id}`)).data.order; }
export async function updateOrderStatus(id, status) { return (await api.patch(`/admin/orders/${id}`, { status })).data.order; }
export async function deleteOrder(id) { return (await api.delete(`/admin/orders/${id}`)).data; }
export async function adminContacts(params = {}) { return (await api.get("/admin/contacts", { params })).data.contacts; }
export async function updateContactStatus(id, status) { return (await api.patch(`/admin/contacts/${id}`, { status })).data.contact; }
export async function deleteContact(id) { return (await api.delete(`/admin/contacts/${id}`)).data; }
