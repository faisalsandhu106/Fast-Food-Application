
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, ShoppingBag } from "lucide-react";

import { menuItems } from "../data/menu.js";
import { useApp } from "../context/AppContext.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, dispatch } = useApp();

  const item = menuItems.find(
    (product) => String(product.id) === id
  );

  // Handle an invalid product ID
  if (!item) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-orange-50 px-6 text-center">
        <span className="text-6xl">🍔</span>

        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          Item not found
        </h1>

        <p className="mt-3 text-gray-600">
          Sorry, we couldn't find the product you're looking for.
        </p>

        <Link
          to="/menu"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          <ArrowLeft size={18} />
          Back to menu
        </Link>
      </section>
    );
  }

  // Add product to cart
  function addToCart() {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });

    navigate("/cart");
  }

  return (
    <section className="min-h-screen bg-orange-50/50 px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Back Link */}
        <Link
          to="/menu"
          className="mb-10 inline-flex items-center gap-2 font-semibold text-gray-600 transition hover:text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to menu
        </Link>

        {/* Product Details */}
        <div className="grid items-center gap-10 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2 md:gap-14 md:p-12">
          {/* Product Artwork */}
          <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-3xl bg-orange-100 p-8 sm:min-h-96">
            <div className="absolute h-56 w-56 rounded-full bg-orange-200 sm:h-72 sm:w-72" />

            <span className="relative z-10 select-none text-[140px] drop-shadow-xl transition duration-300 hover:scale-110 sm:text-[190px]">
              {item.emoji}
            </span>

            {item.tag && (
              <span className="absolute left-5 top-5 z-20 rounded-full bg-orange-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                {item.tag}
              </span>
            )}
          </div>

          {/* Product Information */}
          <div className="py-4">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                {item.category}
              </span>

              {item.tag && (
                <>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span className="text-sm text-gray-500">
                    {item.tag}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
              {item.name}
            </h1>

            <p className="mt-5 text-base leading-7 text-gray-600">
              {item.description}
            </p>

            {/* Price */}
            <div className="mt-7">
              <span className="text-sm font-medium text-gray-500">
                Price
              </span>

              <p className="mt-1 text-3xl font-extrabold text-orange-600">
                Rs.{" "}
                {Number(item.price).toLocaleString("en-PK")}
              </p>
            </div>

            {/* Preparation Note */}
            <div className="mt-7 rounded-2xl bg-orange-50 p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">👨‍🍳</span>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Freshly prepared
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Prepared fresh when you order. Please
                    contact us about ingredient or allergen
                    questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={addToCart}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-orange-600 px-7 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-700 active:translate-y-0 sm:w-auto"
            >
              <Plus size={20} />
              Add to cart
              <ShoppingBag size={18} />
            </button>

            <p className="mt-4 text-xs leading-5 text-gray-500">
              Sign in is required to add items to your cart.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
