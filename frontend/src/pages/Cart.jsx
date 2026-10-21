import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

const money = (value) => `Rs. ${Number(value).toLocaleString("en-PK")}`;

export default function Cart() {
  const { cart, cartTotal, dispatch } = useApp();
  const navigate = useNavigate();

  if (!cart.length) {
    return <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center dark:border-slate-800 dark:bg-slate-950">
      <ShoppingBag className="mx-auto text-brand-500" size={44} />
      <h1 className="mt-4 text-2xl font-black">Your cart is empty</h1>
      <p className="mt-2 text-slate-500">Add something delicious from our menu.</p>
      <Link to="/" className="mt-6 inline-block rounded-xl bg-brand-500 px-5 py-3 font-bold text-white">Browse menu</Link>
    </div>;
  }

  return <div className="mx-auto max-w-4xl">
    <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600"><ArrowLeft size={16} /> Continue shopping</Link>
    <h1 className="mb-6 mt-4 text-3xl font-black">Your cart</h1>
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-3">
        {cart.map((item) => <article key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-3xl dark:bg-slate-800">{item.emoji}</div>
          <div className="min-w-0 flex-1"><h2 className="font-bold">{item.name}</h2><p className="mt-1 text-sm text-slate-500">{money(item.price)} each</p></div>
          <div className="flex items-center gap-2">
            <button aria-label={`Decrease ${item.name}`} onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity - 1 } })} className="rounded-lg border border-slate-200 p-1.5 dark:border-slate-700"><Minus size={15} /></button>
            <span className="w-5 text-center font-bold">{item.quantity}</span>
            <button aria-label={`Increase ${item.name}`} onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity + 1 } })} className="rounded-lg border border-slate-200 p-1.5 dark:border-slate-700"><Plus size={15} /></button>
          </div>
          <button aria-label={`Remove ${item.name}`} onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })} className="p-2 text-red-500"><Trash2 size={18} /></button>
        </article>)}
      </div>
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-xl font-black">Order summary</h2>
        <div className="mt-5 flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><span className="font-bold">{money(cartTotal)}</span></div>
        <div className="mt-3 flex justify-between text-sm"><span className="text-slate-500">Delivery</span><span className="font-bold text-emerald-600">FREE</span></div>
        <div className="my-5 border-t border-slate-200 dark:border-slate-800" />
        <div className="flex justify-between text-lg font-black"><span>Total</span><span>{money(cartTotal)}</span></div>
        <button onClick={() => navigate("/checkout")} className="mt-5 w-full rounded-xl bg-brand-500 px-4 py-3 font-bold text-white hover:bg-brand-600">Proceed to checkout</button>
      </aside>
    </div>
  </div>;
}
