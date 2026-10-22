import { useEffect, useState } from "react";
import { ArrowLeft, Plus, ShoppingBag } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { fetchProduct } from "../api.js";
import { menuItems } from "../data/menuItems.js";
import { useApp } from "../context/AppContext.jsx";

const money = (n) =>
    `Rs. ${Number(n || 0).toLocaleString("en-PK")}`;

export default function ProductDetail() {
    const { id } = useParams();
    const { dispatch } = useApp();

    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        let alive = true;

        async function loadProduct() {
            try {
                const p = await fetchProduct(id);

                if (!alive) return;

                setProduct({
                    id: p.sku || p._id || id,
                    name: p.name,
                    price: p.price,
                    category: p.category || "Popular",
                    description:
                        p.description ||
                        "Freshly prepared and full of flavour.",
                    image: p.image || "",
                    emoji: p.emoji || "🍔",
                });
            } catch {
                const fallback = menuItems.find(
                    (item) => item.id === id
                );

                if (!alive) return;

                if (fallback) {
                    setProduct({
                        ...fallback,
                        image: fallback.image || "",
                        emoji: fallback.emoji || "🍔",
                    });
                } else {
                    setError("This menu item could not be found.");
                }
            }
        }

        loadProduct();

        return () => {
            alive = false;
        };
    }, [id]);

    if (error) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-2xl font-black">{error}</h1>

                <Link
                    to="/menu"
                    className="mt-4 inline-block text-brand-600"
                >
                    Back to menu
                </Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 mt-5 rounded-2xl px-6 py-20">
                <div className="relative flex h-14 w-14 items-center justify-center">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500 dark:border-slate-700 dark:border-t-orange-400" />
                    <span className="text-xl">🍔</span>
                </div>

                <div className="space-y-1 text-center">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">
                        Loading Detail Product
                    </p>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Please wait while we fetch your latest data…
                    </p>
                </div>

                <div className="h-1.5 w-36 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-orange-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mt-5 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:grid-cols-2">
                <div className="flex min-h-72 items-center justify-center overflow-hidden bg-orange-50 dark:bg-slate-900">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full min-h-72 w-full object-cover"
                            onError={(event) => {
                                event.currentTarget.style.display =
                                    "none";
                                event.currentTarget.parentElement
                                    .querySelector(".image-fallback")
                                    ?.classList.remove("hidden");
                            }}
                        />
                    ) : null}

                    <span
                        className={`image-fallback p-8 text-9xl ${product.image ? "hidden" : ""
                            }`}
                    >
                        {product.emoji}
                    </span>
                </div>

                <div className="p-7 sm:p-10">
                    <p className="text-sm font-bold uppercase tracking-wider text-brand-600">
                        {product.category}
                    </p>

                    <h1 className="mt-3 text-3xl font-black">
                        {product.name}
                    </h1>

                    <p className="mt-4 leading-7 text-slate-500 dark:text-slate-400">
                        {product.description}
                    </p>

                    <p className="mt-7 text-3xl font-black">
                        {money(product.price)}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-emerald-600">
                        Free delivery · Cash on delivery
                    </p>

                    <button
                        onClick={() =>
                            dispatch({
                                type: "ADD_TO_CART",
                                payload: product,
                            })
                        }
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3.5 font-bold text-white hover:bg-brand-600"
                    >
                        <Plus size={18} />
                        Add to cart
                    </button>

                    <Link
                        to="/cart"
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-bold dark:border-slate-700"
                    >
                        <ShoppingBag size={18} />
                        View cart
                    </Link>
                </div>
            </div>
        </div>
    );
}