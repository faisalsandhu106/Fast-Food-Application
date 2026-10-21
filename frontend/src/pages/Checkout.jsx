import { useState } from "react";
import { ArrowLeft, Banknote, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../api.js";
import { useApp } from "../context/AppContext.jsx";

const money = (value) => `Rs. ${Number(value).toLocaleString("en-PK")}`;

export default function Checkout() {
  const { cart, cartTotal, dispatch } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!cart.length) {
      setError("Your cart is empty. Add an item before checkout.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        customer: form,
        // IDs are the menu SKU strings (e.g. "smash-burger").
        // Prices are deliberately NOT sent; the backend reads prices from MongoDB.
        items: cart.map((item) => ({
          productId: String(item.id),
          quantity: Number(item.quantity),
        })),
      };

      const order = await createOrder(payload);
      dispatch({ type: "CLEAR_CART" });
      navigate(`/order-confirmation/${order.id}`, { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Could not place your order. Check that the backend is running and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!cart.length) {
    return <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-950">
      <h1 className="text-2xl font-black">Your cart is empty</h1>
      <Link to="/" className="mt-5 inline-block rounded-xl bg-brand-500 px-5 py-3 font-bold text-white">Return to menu</Link>
    </div>;
  }

  return <div className="mx-auto max-w-5xl">
    <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600"><ArrowLeft size={16} /> Back to cart</Link>
    <h1 className="mb-6 mt-4 text-3xl font-black">Checkout</h1>
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-950">
        <div><h2 className="text-xl font-black">Delivery details</h2><p className="mt-1 text-sm text-slate-500">Where should we deliver your order?</p></div>
        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">{error}</div>}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold">Full name *
            <input required maxLength={100} name="name" value={form.name} onChange={updateField} autoComplete="name" className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 outline-none focus:border-brand-500 dark:border-slate-700" placeholder="Your name" />
          </label>
          <label className="text-sm font-semibold">Phone number *
            <input required maxLength={30} name="phone" value={form.phone} onChange={updateField} autoComplete="tel" className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 outline-none focus:border-brand-500 dark:border-slate-700" placeholder="03xx xxxxxxx" />
          </label>
        </div>
        <label className="block text-sm font-semibold">Email (optional)
          <input type="email" maxLength={150} name="email" value={form.email} onChange={updateField} autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 outline-none focus:border-brand-500 dark:border-slate-700" placeholder="you@example.com" />
        </label>
        <label className="block text-sm font-semibold">Delivery address *
          <textarea required maxLength={500} rows={3} name="address" value={form.address} onChange={updateField} autoComplete="street-address" className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 outline-none focus:border-brand-500 dark:border-slate-700" placeholder="House, street, area, city" />
        </label>
        <label className="block text-sm font-semibold">Order notes (optional)
          <textarea maxLength={500} rows={2} name="notes" value={form.notes} onChange={updateField} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 outline-none focus:border-brand-500 dark:border-slate-700" placeholder="Delivery instructions or preferences" />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"><Truck /><div><p className="font-bold">Free delivery</p><p className="text-sm">Delivery fee: Rs. 0</p></div></div>
          <div className="flex gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700"><Banknote className="text-brand-500" /><div><p className="font-bold">Cash on delivery</p><p className="text-sm text-slate-500">Pay when your order arrives.</p></div></div>
        </div>
        <button disabled={loading} type="submit" className="w-full rounded-xl bg-brand-500 px-5 py-3.5 font-bold text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Placing order..." : "Place order"}</button>
      </form>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-xl font-black">Your order</h2>
        <div className="mt-4 space-y-3">{cart.map((item) => <div key={item.id} className="flex justify-between gap-3 text-sm"><span className="text-slate-600 dark:text-slate-300">{item.emoji} {item.name} × {item.quantity}</span><span className="shrink-0 font-bold">{money(item.price * item.quantity)}</span></div>)}</div>
        <div className="my-5 border-t border-slate-200 dark:border-slate-800" />
        <div className="flex justify-between text-sm"><span className="text-slate-500">Estimated subtotal</span><span>{money(cartTotal)}</span></div>
        <div className="mt-2 flex justify-between text-sm"><span className="text-slate-500">Delivery</span><span className="font-bold text-emerald-600">FREE</span></div>
        <div className="mt-4 flex justify-between text-lg font-black"><span>Total</span><span>{money(cartTotal)}</span></div>
        <p className="mt-3 text-xs leading-5 text-slate-500">Final prices are calculated securely by the server using products saved in the database.</p>
      </aside>
    </div>
  </div>;
}
