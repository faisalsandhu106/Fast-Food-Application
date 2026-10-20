
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function Cart() {
  const { user, cart, cartTotal, dispatch } = useApp();

  const formatPrice = (price) =>
    price.toLocaleString("en-PK");

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: item.id,
      });

      return;
    }

    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id: item.id,
        quantity: item.quantity - 1,
      },
    });
  };

  const handleIncrease = (item) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id: item.id,
        quantity: item.quantity + 1,
      },
    });
  };

  const handleRemove = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  if (!user) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center">
        <span className="mb-4 text-6xl">🛍️</span>

        <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
          Your bites are waiting.
        </h1>

        <p className="mb-6 max-w-md text-gray-600 dark:text-gray-400">
          Sign in to see and manage your personal cart.
        </p>

        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Sign in to continue
          <ArrowRight size={18} />
        </Link>
      </section>
    );
  }

  if (!cart.length) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center">
        <span className="mb-4 text-6xl">🛍️</span>

        <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
          Your cart is looking hungry.
        </h1>

        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Let&apos;s fix that with something delicious.
        </p>

        <Link
          to="/menu"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Explore the menu
          <ArrowRight size={18} />
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mb-10">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
          Your Order
        </span>

        <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          Your <span className="text-orange-500">cart.</span>
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Ordering as {user.email}
        </p>
      </div>

      {/* Cart layout */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        {/* Cart items */}
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:p-5"
            >
              {/* Product emoji */}
              <div className="flex h-24 w-full shrink-0 items-center justify-center rounded-xl bg-orange-50 text-5xl dark:bg-gray-700 sm:h-24 sm:w-24">
                {item.emoji}
              </div>

              {/* Product information */}
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Rs. {formatPrice(item.price)} each
                </p>

                {/* Quantity controls */}
                <div className="mt-4 inline-flex items-center gap-4 rounded-lg border border-gray-200 p-1 dark:border-gray-600">
                  <button
                    type="button"
                    onClick={() => handleDecrease(item)}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="rounded-md p-2 text-gray-700 transition hover:bg-orange-100 hover:text-orange-600 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="min-w-5 text-center font-semibold text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleIncrease(item)}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="rounded-md p-2 text-gray-700 transition hover:bg-orange-100 hover:text-orange-600 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Price and remove button */}
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <strong className="text-lg font-bold text-gray-900 dark:text-white">
                  Rs. {formatPrice(item.price * item.quantity)}
                </strong>

                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Order summary */}
        <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:sticky lg:top-24">
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
            Order summary
          </h2>

          <div className="flex items-center justify-between gap-4 py-3 text-sm text-gray-600 dark:text-gray-300">
            <span>Subtotal</span>

            <strong className="text-gray-900 dark:text-white">
              Rs. {formatPrice(cartTotal)}
            </strong>
          </div>

          <div className="flex items-center justify-between gap-4 py-3 text-sm text-gray-600 dark:text-gray-300">
            <span>Delivery</span>
            <span className="text-right">Calculated later</span>
          </div>

          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          <div className="flex items-center justify-between gap-4">
            <span className="font-bold text-gray-900 dark:text-white">
              Total
            </span>

            <strong className="text-xl font-extrabold text-orange-500">
              Rs. {formatPrice(cartTotal)}
            </strong>
          </div>

          <button
            type="button"
            onClick={() =>
              window.alert(
                "Demo checkout only. Connect a backend to place real orders."
              )
            }
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Continue to checkout
            <ArrowRight size={17} />
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
            Checkout is a demo and does not submit a real order.
          </p>
        </aside>
      </div>

      {/* Continue shopping */}
      <Link
        to="/menu"
        className="mt-8 inline-flex items-center gap-2 font-semibold text-gray-700 transition hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
      >
        <ShoppingBag size={17} />
        Continue shopping
      </Link>
    </section>
  );
}
