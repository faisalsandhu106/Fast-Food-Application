import { useEffect, useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getOrder } from "../api.js";

const money = (value) => `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getOrder(orderId)
      .then((result) => { if (active) setOrder(result); })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || "Could not load order details.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [orderId]);

  if (loading) return <div className="flex items-center justify-center gap-3 py-24 text-slate-500"><LoaderCircle className="animate-spin" /> Loading your order...</div>;
  if (error || !order) return <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-slate-950"><h1 className="text-xl font-black">Order details unavailable</h1><p className="mt-2 text-sm text-slate-500">{error}</p><Link to="/" className="mt-5 inline-block text-brand-600">Return to menu</Link></div>;

  return <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-10 dark:border-slate-800 dark:bg-slate-950">
    <div className="text-center"><CheckCircle2 size={54} className="mx-auto text-emerald-500" /><p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">Order received</p><h1 className="mt-2 text-3xl font-black">Thank you!</h1><p className="mt-2 text-slate-500">Your Tahas Bite order has been placed.</p><p className="mt-3 break-all text-xs text-slate-400">Order ID: {order.id}</p></div>
    <div className="mt-8 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900"><div className="flex justify-between gap-4"><span className="text-slate-500">Status</span><span className="font-bold capitalize">{String(order.status).replaceAll("_", " ")}</span></div><div className="mt-3 flex justify-between gap-4"><span className="text-slate-500">Payment</span><span className="font-bold">Cash on delivery</span></div></div>
    <h2 className="mt-7 font-black">Items</h2>
    <div className="mt-3 space-y-3">{order.items.map((item, index) => <div key={`${item.productId}-${index}`} className="flex justify-between gap-4 text-sm"><span>{item.name} × {item.quantity}</span><span className="font-bold">{money(item.lineTotal)}</span></div>)}</div>
    <div className="my-5 border-t border-slate-200 dark:border-slate-800" />
    <div className="flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><span>{money(order.subtotal)}</span></div>
    <div className="mt-2 flex justify-between text-sm"><span className="text-slate-500">Delivery</span><span className="font-bold text-emerald-600">FREE</span></div>
    <div className="mt-4 flex justify-between text-xl font-black"><span>Total due</span><span>{money(order.total)}</span></div>
    <Link to="/" className="mt-7 block rounded-xl bg-brand-500 px-5 py-3 text-center font-bold text-white hover:bg-brand-600">Back to menu</Link>
  </div>;
}
