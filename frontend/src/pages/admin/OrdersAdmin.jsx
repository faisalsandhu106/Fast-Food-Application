// import { useEffect, useState } from "react";
// import { Eye, Search, Trash2, X } from "lucide-react";
// import { adminOrder, adminOrders, deleteOrder, updateOrderStatus } from "../../api.js";
// const statuses=["placed","confirmed","preparing","out_for_delivery","delivered","cancelled"];
// const labels={placed:"Placed",confirmed:"Confirmed",preparing:"Preparing",out_for_delivery:"Out for delivery",delivered:"Delivered",cancelled:"Cancelled"};
// const money=n=>`Rs. ${Number(n||0).toLocaleString("en-PK")}`;
// const date=d=>d?new Date(d).toLocaleString("en-PK",{dateStyle:"medium",timeStyle:"short"}):"—";
// export default function OrdersAdmin(){const [rows,setRows]=useState([]);const [q,setQ]=useState("");const [status,setStatus]=useState("all");const [sort,setSort]=useState("newest");const [selected,setSelected]=useState(null);const [error,setError]=useState("");const [busyId,setBusyId]=useState("");async function load(){try{setRows(await adminOrders({q,status:status==="all"?"":status,sort}));setError("");}catch(e){setError(e.response?.data?.message||"Could not load orders.");}}useEffect(()=>{const t=setTimeout(load,180);return()=>clearTimeout(t);},[q,status,sort]);async function view(row){setError("");try{setSelected(await adminOrder(row._id));}catch(e){setError(e.response?.data?.message||"Could not load order details.");}}async function changeStatus(id,next){setBusyId(id);try{await updateOrderStatus(id,next);await load();if(selected?._id===id)setSelected(await adminOrder(id));}catch(e){setError(e.response?.data?.message||"Could not update order.");}finally{setBusyId("");}}async function remove(row){if(!window.confirm(`Permanently delete order ${String(row._id).slice(-8)}?`))return;try{await deleteOrder(row._id);if(selected?._id===row._id)setSelected(null);await load();}catch(e){setError(e.response?.data?.message||"Could not delete order.");}}return <div><div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">Fulfilment</p><h1 className="mt-1 text-3xl font-black">Orders</h1><p className="mt-2 text-sm text-slate-500">Search customers, inspect individual orders and update delivery status.</p></div><div className="mt-6 grid gap-3 md:grid-cols-[1fr_180px_180px]"><label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-950"><Search size={18} className="text-slate-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Customer, phone, email or order ID" className="w-full bg-transparent py-3 outline-none"/></label><select value={status} onChange={e=>setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-950"><option value="all">All statuses</option>{statuses.map(s=><option key={s} value={s}>{labels[s]}</option>)}</select><select value={sort} onChange={e=>setSort(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-950"><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="totalDesc">Total: high–low</option><option value="totalAsc">Total: low–high</option></select></div>{error&&<p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">{error}</p>}<div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900"><tr><th className="px-4 py-3">Order</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Placed</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{rows.map(row=><tr key={row._id}><td className="px-4 py-4"><p className="font-mono font-bold">#{String(row._id).slice(-8).toUpperCase()}</p><p className="mt-1 text-xs text-slate-500">{row.items?.length||0} line items</p></td><td className="px-4 py-4"><p className="font-bold">{row.customer?.name}</p><p className="text-xs text-slate-500">{row.customer?.phone}</p></td><td className="px-4 py-4 text-xs text-slate-500">{date(row.createdAt)}</td><td className="px-4 py-4 font-black">{money(row.total)}</td><td className="px-4 py-4"><select disabled={busyId===row._id} value={row.status} onChange={e=>changeStatus(row._id,e.target.value)} className="max-w-40 rounded-lg border border-slate-200 bg-transparent px-2 py-2 text-xs font-bold dark:border-slate-700">{statuses.map(s=><option key={s} value={s}>{labels[s]}</option>)}</select></td><td className="px-4 py-4"><div className="flex justify-end gap-2"><button title="View full order" onClick={()=>view(row)} className="rounded-lg border border-slate-200 p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"><Eye size={16}/></button><button title="Delete order" onClick={()=>remove(row)} className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div>{!rows.length&&<p className="p-10 text-center text-sm text-slate-500">No orders match these filters.</p>}</div>{selected&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-6"><section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl dark:bg-slate-950 sm:p-7"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-brand-600">Order details</p><h2 className="mt-1 text-2xl font-black">#{String(selected._id).slice(-8).toUpperCase()}</h2><p className="mt-1 text-sm text-slate-500">{date(selected.createdAt)}</p></div><button onClick={()=>setSelected(null)} className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><X/></button></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900"><p className="text-xs font-bold uppercase text-slate-500">Customer</p><p className="mt-2 font-black">{selected.customer?.name}</p><p className="mt-1 text-sm">{selected.customer?.phone}</p><p className="mt-1 break-all text-sm">{selected.customer?.email||"No email supplied"}</p></div><div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900"><p className="text-xs font-bold uppercase text-slate-500">Delivery address</p><p className="mt-2 text-sm leading-6">{selected.customer?.address}</p><p className="mt-2 text-xs text-slate-500">Notes: {selected.customer?.notes||"None"}</p></div></div><h3 className="mt-6 font-black">Items ordered</h3><div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">{selected.items?.map((item,i)=><div key={`${item.productId}-${i}`} className="flex justify-between gap-4 py-3 text-sm"><div><p className="font-bold">{item.name}</p><p className="mt-1 text-slate-500">{money(item.price)} × {item.quantity}</p></div><p className="font-black">{money(item.lineTotal)}</p></div>)}</div><div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm dark:border-slate-800"><p className="flex justify-between"><span className="text-slate-500">Subtotal</span><span>{money(selected.subtotal)}</span></p><p className="flex justify-between"><span className="text-slate-500">Delivery</span><span className="font-bold text-emerald-600">FREE</span></p><p className="flex justify-between text-lg font-black"><span>Total</span><span>{money(selected.total)}</span></p><p className="text-xs text-slate-500">Payment: Cash on delivery · {selected.paymentStatus||"pending"}</p></div><label className="mt-5 block text-sm font-bold">Update order status<select value={selected.status} onChange={e=>changeStatus(selected._id,e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 dark:border-slate-700">{statuses.map(s=><option key={s} value={s}>{labels[s]}</option>)}</select></label></section></div>}</div>}



import { useEffect, useState } from "react";
import { Eye, Search, Trash2, X } from "lucide-react";
import {
    adminOrder,
    adminOrders,
    deleteOrder,
    updateOrderStatus,
} from "../../api.js";

const statuses = [
    "placed",
    "confirmed",
    "preparing",
    "out_for_delivery",
    "delivered",
    "cancelled",
];

const labels = {
    placed: "Placed",
    confirmed: "Confirmed",
    preparing: "Preparing",
    out_for_delivery: "Out for delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

const money = (n) => `Rs. ${Number(n || 0).toLocaleString("en-PK")}`;

const date = (d) =>
    d
        ? new Date(d).toLocaleString("en-PK", {
              dateStyle: "medium",
              timeStyle: "short",
          })
        : "—";

export default function OrdersAdmin() {
    const [rows, setRows] = useState([]);
    const [q, setQ] = useState("");
    const [status, setStatus] = useState("all");
    const [sort, setSort] = useState("newest");
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState("");
    const [busyId, setBusyId] = useState("");

    async function load() {
        try {
            setRows(
                await adminOrders({
                    q,
                    status: status === "all" ? "" : status,
                    sort,
                }),
            );
            setError("");
        } catch (e) {
            setError(
                e.response?.data?.message || "Could not load orders.",
            );
        }
    }

    useEffect(() => {
        const t = setTimeout(load, 180);
        return () => clearTimeout(t);
    }, [q, status, sort]);

    async function view(row) {
        setError("");

        try {
            setSelected(await adminOrder(row._id));
        } catch (e) {
            setError(
                e.response?.data?.message ||
                    "Could not load order details.",
            );
        }
    }

    async function changeStatus(id, next) {
        setBusyId(id);

        try {
            await updateOrderStatus(id, next);
            await load();

            if (selected?._id === id) {
                setSelected(await adminOrder(id));
            }
        } catch (e) {
            setError(
                e.response?.data?.message || "Could not update order.",
            );
        } finally {
            setBusyId("");
        }
    }

    async function remove(row) {
        if (
            !window.confirm(
                `Permanently delete order ${String(row._id).slice(-8)}?`,
            )
        ) {
            return;
        }

        try {
            await deleteOrder(row._id);

            if (selected?._id === row._id) {
                setSelected(null);
            }

            await load();
        } catch (e) {
            setError(
                e.response?.data?.message || "Could not delete order.",
            );
        }
    }

    return (
        <div>
            <div>
                <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">
                    Fulfilment
                </p>

                <h1 className="mt-1 text-3xl font-black">Orders</h1>

                <p className="mt-2 text-sm text-slate-500">
                    Search customers, inspect individual orders and update
                    delivery status.
                </p>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-[1fr_180px_180px]">
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-950">
                    <Search size={18} className="text-slate-400" />

                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Customer, phone, email or order ID"
                        className="w-full bg-transparent py-3 outline-none"
                    />
                </label>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-950"
                >
                    <option value="all">All statuses</option>

                    {statuses.map((s) => (
                        <option key={s} value={s}>
                            {labels[s]}
                        </option>
                    ))}
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-950"
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="totalDesc">Total: high–low</option>
                    <option value="totalAsc">Total: low–high</option>
                </select>
            </div>

            {error && (
                <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">
                    {error}
                </p>
            )}

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900">
                            <tr>
                                <th className="px-4 py-3">Order</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Placed</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {rows.map((row) => (
                                <tr key={row._id}>
                                    <td className="px-4 py-4">
                                        <p className="font-mono font-bold">
                                            #
                                            {String(row._id)
                                                .slice(-8)
                                                .toUpperCase()}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            {row.items?.length || 0} line items
                                        </p>
                                    </td>

                                    <td className="px-4 py-4">
                                        <p className="font-bold">
                                            {row.customer?.name}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            {row.customer?.phone}
                                        </p>
                                    </td>

                                    <td className="px-4 py-4 text-xs text-slate-500">
                                        {date(row.createdAt)}
                                    </td>

                                    <td className="px-4 py-4 font-black">
                                        {money(row.total)}
                                    </td>

                                    <td className="px-4 py-4">
                                        <select
                                            disabled={busyId === row._id}
                                            value={row.status}
                                            onChange={(e) =>
                                                changeStatus(
                                                    row._id,
                                                    e.target.value,
                                                )
                                            }
                                            className="max-w-40 rounded-lg border border-slate-200 bg-transparent px-2 py-2 text-xs font-bold dark:border-slate-700"
                                        >
                                            {statuses.map((s) => (
                                                <option key={s} value={s}>
                                                    {labels[s]}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                title="View full order"
                                                onClick={() => view(row)}
                                                className="rounded-lg border border-slate-200 p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                                            >
                                                <Eye size={16} />
                                            </button>

                                            <button
                                                title="Delete order"
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

                {!rows.length && (
                    <p className="p-10 text-center text-sm text-slate-500">
                        No orders match these filters.
                    </p>
                )}
            </div>

            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-6">
                    <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl dark:bg-slate-950 sm:p-7">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
                                    Order details
                                </p>

                                <h2 className="mt-1 text-2xl font-black">
                                    #
                                    {String(selected._id)
                                        .slice(-8)
                                        .toUpperCase()}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {date(selected.createdAt)}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelected(null)}
                                className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                                <p className="text-xs font-bold uppercase text-slate-500">
                                    Customer
                                </p>

                                <p className="mt-2 font-black">
                                    {selected.customer?.name}
                                </p>

                                <p className="mt-1 text-sm">
                                    {selected.customer?.phone}
                                </p>

                                <p className="mt-1 break-all text-sm">
                                    {selected.customer?.email ||
                                        "No email supplied"}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                                <p className="text-xs font-bold uppercase text-slate-500">
                                    Delivery address
                                </p>

                                <p className="mt-2 text-sm leading-6">
                                    {selected.customer?.address}
                                </p>

                                <p className="mt-2 text-xs text-slate-500">
                                    Notes: {selected.customer?.notes || "None"}
                                </p>
                            </div>
                        </div>

                        <h3 className="mt-6 font-black">Items ordered</h3>

                        <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
                            {selected.items?.map((item, i) => (
                                <div
                                    key={`${item.productId}-${i}`}
                                    className="flex justify-between gap-4 py-3 text-sm"
                                >
                                    <div>
                                        <p className="font-bold">
                                            {item.name}
                                        </p>

                                        <p className="mt-1 text-slate-500">
                                            {money(item.price)} ×{" "}
                                            {item.quantity}
                                        </p>
                                    </div>

                                    <p className="font-black">
                                        {money(item.lineTotal)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm dark:border-slate-800">
                            <p className="flex justify-between">
                                <span className="text-slate-500">
                                    Subtotal
                                </span>

                                <span>{money(selected.subtotal)}</span>
                            </p>

                            <p className="flex justify-between">
                                <span className="text-slate-500">
                                    Delivery
                                </span>

                                <span className="font-bold text-emerald-600">
                                    FREE
                                </span>
                            </p>

                            <p className="flex justify-between text-lg font-black">
                                <span>Total</span>
                                <span>{money(selected.total)}</span>
                            </p>

                            <p className="text-xs text-slate-500">
                                Payment: Cash on delivery ·{" "}
                                {selected.paymentStatus || "pending"}
                            </p>
                        </div>

                        <label className="mt-5 block text-sm font-bold">
                            Update order status

                            <select
                                value={selected.status}
                                onChange={(e) =>
                                    changeStatus(
                                        selected._id,
                                        e.target.value,
                                    )
                                }
                                className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 dark:border-slate-700"
                            >
                                {statuses.map((s) => (
                                    <option key={s} value={s}>
                                        {labels[s]}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </section>
                </div>
            )}
        </div>
    );
}
