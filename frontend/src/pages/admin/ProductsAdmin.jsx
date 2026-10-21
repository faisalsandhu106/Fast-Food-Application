
import { useEffect, useState } from "react";
import {
    Edit3,
    Plus,
    Search,
    Trash2,
    X,
} from "lucide-react";

import { adminProducts, createProduct, deleteProduct, updateProduct } from "../../api.js";

// Initial product form values
const blank = {
    sku: "",
    name: "",
    price: "",
    category: "Burgers",
    description: "",
    image: "",
    emoji: "🍔",
    active: true,
};

// Format prices in Pakistani Rupees
const money = (n) =>
    `Rs. ${Number(n || 0).toLocaleString("en-PK")}`;

export default function ProductsAdmin() {
    const [rows, setRows] = useState([]);
    const [q, setQ] = useState("");
    const [sort, setSort] = useState("newest");

    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(blank);

    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const [notice, setNotice] = useState("");

    // Fetch products from the backend
    async function load() {
        try {
            const products = await adminProducts({ q, sort });

            setRows(products);
            setError("");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Could not load products."
            );
        }
    }

    // Reload when the search query or sort order changes
    useEffect(() => {
        const timer = setTimeout(() => {
            load();
        }, 180);

        return () => clearTimeout(timer);
    }, [q, sort]);

    // Open the add/edit product modal
    function open(row) {
        setEditing(row ? row._id : "new");

        setForm(
            row
                ? {
                    sku: row.sku || "",
                    name: row.name || "",
                    price: String(row.price ?? ""),
                    category: row.category || "Popular",
                    description: row.description || "",
                    image: row.image || "",
                    image: row.image || "🍔",
                    active: row.active !== false,
                }
                : { ...blank }
        );

        setError("");
        setNotice("");
    }

    // Save a new or existing product
    async function save(e) {
        e.preventDefault();

        setBusy(true);
        setError("");
        setNotice("");

        try {
            const payload = {
                ...form,
                price: Number(form.price),
            };

            if (editing === "new") {
                await createProduct(payload);
            } else {
                await updateProduct(editing, payload);
            }

            setEditing(null);
            setNotice("Product saved successfully.");

            await load();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Could not save product."
            );
        } finally {
            setBusy(false);
        }
    }

    // Delete a product
    async function remove(row) {
        const confirmed = window.confirm(
            `Delete "${row.name}"? Existing order records will remain.`
        );

        if (!confirmed) return;

        setError("");
        setNotice("");

        try {
            await deleteProduct(row._id);

            setNotice("Product deleted successfully.");

            await load();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Could not delete product."
            );
        }
    }
    

    return (
        <div>
            {/* Page Header */}
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">
                        Catalog
                    </p>

                    <h1 className="mt-1 text-3xl font-black">
                        Menu products
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Create, inspect, edit, search and remove menu items.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => open(null)}
                    className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-bold text-white hover:bg-brand-600"
                >
                    <Plus size={18} />
                    Add product
                </button>
            </div>

            {/* Search and Sorting */}
            <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-950">
                    <Search size={18} className="text-slate-400" />

                    <input
                        type="search"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search product name, SKU, category..."
                        aria-label="Search products"
                        className="w-full bg-transparent py-3 outline-none"
                    />
                </label>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    aria-label="Sort products"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-950"
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="name">Name A–Z</option>
                    <option value="priceAsc">Price low–high</option>
                    <option value="priceDesc">Price high–low</option>
                </select>
            </div>

            {/* Success Message */}
            {notice && (
                <p
                    role="status"
                    className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                >
                    {notice}
                </p>
            )}

            {/* Error Message */}
            {error && (
                <p
                    role="alert"
                    className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200"
                >
                    {error}
                </p>
            )}

            {/* Products Table */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900">
                            <tr>
                                <th className="px-4 py-3">Product</th>
                                <th className="px-4 py-3">SKU</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {rows.map((row) => (
                                <tr key={row._id}>
                                    {/* Product Details */}
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            {/* <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-2xl dark:bg-slate-900">
                                                <img src={row.image || "🍔"} alt="" />
                                            </span> */}

                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-orange-50 text-2xl dark:bg-slate-900">
                                                {row.image &&
                                                    (row.image.startsWith("data:image/") ||
                                                        row.image.startsWith("https://") ||
                                                        row.image.startsWith("http://")) ? (
                                                    <img
                                                        src={row.image}
                                                        alt={row.name || "Product"}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = "none";
                                                            e.currentTarget.parentElement.textContent =
                                                                row.emoji || "🍔";
                                                        }}
                                                    />
                                                ) : (
                                                    <span>{row.emoji || "🍔"}</span>
                                                )}
                                            </span>

                                            <div>
                                                <p className="font-bold">
                                                    {row.name}
                                                </p>

                                                <p className="max-w-xs truncate text-xs text-slate-500">
                                                    {row.description}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 font-mono text-xs">
                                        {row.sku || "—"}
                                    </td>

                                    <td className="px-4 py-4">
                                        {row.category || "Popular"}
                                    </td>

                                    <td className="px-4 py-4 font-bold">
                                        {money(row.price)}
                                    </td>

                                    {/* Product Status */}
                                    <td className="px-4 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-bold ${row.active
                                                ? "bg-emerald-100 text-emerald-800"
                                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                                }`}
                                        >
                                            {row.active ? "Active" : "Hidden"}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                title="Edit product"
                                                aria-label={`Edit ${row.name}`}
                                                onClick={() => open(row)}
                                                className="rounded-lg border border-slate-200 p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                                            >
                                                <Edit3 size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                title="Delete product"
                                                aria-label={`Delete ${row.name}`}
                                                onClick={() => remove(row)}
                                                className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {rows.length === 0 && (
                    <p className="p-10 text-center text-sm text-slate-500">
                        No products found. Try another search or add a product.
                    </p>
                )}
            </div>

            {/* Add/Edit Product Modal */}
            {editing !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-6">
                    <form
                        onSubmit={save}
                        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl dark:bg-slate-950 sm:p-7"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black">
                                    {editing === "new"
                                        ? "Add product"
                                        : "Edit product"}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Changes are saved to MongoDB.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setEditing(null)}
                                aria-label="Close product form"
                                className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Product Fields */}
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            {[
                                ["sku", "SKU (unique)", "text"],
                                ["name", "Product name", "text"],
                                ["price", "Price in Rs.", "number"],
                                ["category", "Category", "text"],
                                ["emoji", "Emoji", "text"],
                                ["image", "Image URL (optional)", "url"],
                            ].map(([key, label, type]) => (
                                <label
                                    key={key}
                                    className="text-sm font-bold"
                                >
                                    {label}

                                    <input
                                        required={!["image", "emoji"].includes(key)}
                                        min={type === "number" ? "0" : undefined}
                                        step={type === "number" ? "1" : undefined}
                                        maxLength={
                                            type === "text" && key !== "price"
                                                ? 200
                                                : undefined
                                        }
                                        type={type}
                                        value={form[key]}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                [key]: e.target.value,
                                            })
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 font-normal outline-none focus:border-brand-500 dark:border-slate-700"
                                    />
                                </label>
                            ))}
                        </div>

                        {/* Description */}
                        <label className="mt-4 block text-sm font-bold">
                            Description

                            <textarea
                                rows={3}
                                maxLength={1000}
                                value={form.description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                                className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 font-normal outline-none focus:border-brand-500 dark:border-slate-700"
                            />
                        </label>

                        {/* Visibility Toggle */}
                        <label className="mt-4 flex items-center gap-3 text-sm font-bold">
                            <input
                                type="checkbox"
                                checked={form.active}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        active: e.target.checked,
                                    })
                                }
                                className="h-4 w-4 accent-orange-500"
                            />

                            Visible on public menu
                        </label>

                        {/* Modal Error */}
                        {error && (
                            <p
                                role="alert"
                                className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200"
                            >
                                {error}
                            </p>
                        )}

                        {/* Modal Actions */}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setEditing(null)}
                                className="rounded-xl border border-slate-200 px-4 py-3 font-bold dark:border-slate-700"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={busy}
                                className="rounded-xl bg-brand-500 px-5 py-3 font-bold text-white hover:bg-brand-600 disabled:opacity-60"
                            >
                                {busy ? "Saving..." : "Save product"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
