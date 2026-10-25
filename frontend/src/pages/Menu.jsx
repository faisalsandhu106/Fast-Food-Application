
import { useEffect, useMemo, useState } from "react";
import {
    Search,
    Plus,
    SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useApp } from "../context/AppContext.jsx";
import { fetchProducts } from "../api.js";
import { menuItems as fallbackItems } from "../data/menuItems.js";

// Format prices in Pakistani Rupees
const money = (n) =>
    `Rs. ${Number(n || 0).toLocaleString("en-PK")}`;


const Menu = () => {
    const { dispatch } = useApp();

    const [items, setItems] = useState(fallbackItems);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("featured");
    const [error, setError] = useState("");

    // Fetch products from the backend
    useEffect(() => {
        let cancelled = false;

        async function loadProducts() {
            try {
                const rows = await fetchProducts();

                if (cancelled) return;

                if (rows.length) {
                    setItems(
                        rows.map((product) => ({
                            id: product.sku || product._id,
                            name: product.name,
                            price: product.price,
                            category: product.category || "Popular",
                            image: product.image,
                            description:
                                product.description ||
                                "Freshly prepared and full of flavour.",
                            emoji: product.emoji || "🍔",
                            tag: product.active ? "Fresh" : "",
                        }))
                    );

                    setError("");
                }
            } catch {
                if (!cancelled) {
                    setError(
                        "Showing sample menu while the live menu is unavailable."
                    );
                }
            }
        }

        loadProducts();

        return () => {
            cancelled = true;
        };
    }, []);

    // Generate available categories
    const categories = useMemo(
        () => [
            "All",
            ...new Set(
                items.map((item) => item.category || "Popular")
            ),
        ],
        [items]
    );

    // Search, filter, and sort menu items
    const visible = useMemo(() => {
        const searchTerm = query.trim().toLowerCase();

        return items
            .filter((item) => {
                const matchesCategory =
                    category === "All" || item.category === category;

                const searchableText = [
                    item.name,
                    item.description,
                    item.category,
                    item.image
                ]
                    .join(" ")
                    .toLowerCase();

                const matchesSearch =
                    searchableText.includes(searchTerm);

                return matchesCategory && matchesSearch;
            })
            .sort((a, b) => {
                switch (sort) {
                    case "priceLow":
                        return Number(a.price) - Number(b.price);

                    case "priceHigh":
                        return Number(b.price) - Number(a.price);

                    case "name":
                        return a.name.localeCompare(b.name);

                    default:
                        return 0;
                }
            });
    }, [items, category, query, sort]);

    return (
        <div>
            {/* Hero Section */}
            <section className="mb-8 rounded-[2rem] bg-gradient-to-br from-orange-500 to-red-600 px-6 py-10 text-white sm:px-10">
                <p className="text-sm font-bold uppercase tracking-[.2em] text-orange-100">
                    Made for your cravings
                </p>

                <h1 className="mt-2 text-4xl font-black sm:text-5xl">
                    Explore the menu.
                </h1>

                <p className="mt-3 max-w-xl text-orange-50">
                    Find your favourite bite. Free delivery on every order.
                </p>
            </section>
            

            {/* Search and Sorting */}
            <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950">
                    <Search size={19} className="text-slate-400" />

                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search burgers, fries, wraps..."
                        aria-label="Search menu items"
                        className="w-full bg-transparent py-3 outline-none"
                    />
                </label>

                <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-950">
                    <SlidersHorizontal size={18} />

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        aria-label="Sort menu items"
                        className="bg-transparent py-3 w-full sm:w-fit outline-none"
                    >
                        <option value="featured">Featured</option>

                        <option value="priceLow">
                            Price: low to high
                        </option>

                        <option value="priceHigh">
                            Price: high to low
                        </option>

                        <option value="name">Name A–Z</option>
                    </select>
                </label>
            </div>

            {/* Category Filters */}
            <div className="mb-6 flex flex-wrap gap-2">
                {categories.map((itemCategory) => (
                    <button
                        key={itemCategory}
                        type="button"
                        onClick={() => setCategory(itemCategory)}
                        aria-pressed={category === itemCategory}
                        className={`rounded-full px-4 py-2 text-sm font-bold transition ${category === itemCategory
                            ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                            : "border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                            }`}
                    >
                        {itemCategory}
                    </button>
                ))}
            </div>

            {/* Backend Error Notice */}
            {error && (
                <p
                    role="status"
                    className="mb-4 text-sm text-amber-700 dark:text-amber-300"
                >
                    {error}
                </p>
            )}

            {/* Product Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((item) => (
                    <article
                        key={item.id}
                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-soft transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950"
                    >
                        {/* Product Image / Emoji */}
                        <Link
                            to={`/menu/${item.id}`}
                            aria-label={`View ${item.name} details`}
                            className="flex items-center justify-center rounded-2xl bg-orange-50 text-7xl dark:bg-slate-900"
                        >
                            <figure className="group w-full h-60 rounded-lg overflow-hidden">
                                {
                                    item.image ?
                                        <img
                                            className="w-full h-full bg-cover object-cover group-hover:scale-110 transition-all duration-500"
                                            src={item.image || "🍔"}
                                            alt={item.category}
                                        />
                                        :
                                        "sdncsl"
                                }
                            </figure>
                        </Link>

                        {/* Product Information */}
                        <div className="mt-4 flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
                                    {item.category}
                                </p>

                                <Link
                                    to={`/menu/${item.id}`}
                                    className="mt-1 block text-lg font-black hover:text-brand-600"
                                >
                                    {item.name}
                                </Link>
                            </div>

                            <span className="text-lg font-black">
                                {money(item.price)}
                            </span>
                        </div>

                        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            {item.description}
                        </p>

                        {/* Add to Cart */}
                        <button
                            type="button"
                            onClick={() =>
                                dispatch({
                                    type: "ADD_TO_CART",
                                    payload: item,
                                })
                            }
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 font-bold text-white hover:bg-brand-600"
                        >
                            <Plus size={18} />
                            Add to cart
                        </button>
                    </article>
                ))}
            </div>

            {/* Empty Search Results */}
            {visible.length === 0 && (
                <p className="py-16 text-center text-slate-500">
                    No menu items match your search.
                </p>
            )}
        </div>
    );
}

export default Menu
