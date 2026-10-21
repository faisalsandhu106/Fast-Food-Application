// import { useEffect, useState } from "react";
// import { Boxes, ClipboardList, DollarSign, MessageSquare, RefreshCw, TrendingUp } from "lucide-react";
// import { Link } from "react-router-dom";
// import { adminStats } from "../../api.js";
// const money=n=>`Rs. ${Number(n||0).toLocaleString("en-PK")}`;
// export default function Dashboard(){const [stats,setStats]=useState(null);const [error,setError]=useState("");const [loading,setLoading]=useState(true);async function load(){setLoading(true);try{setStats(await adminStats());setError("");}catch(e){setError(e.response?.data?.message||"Could not load dashboard data.");}finally{setLoading(false);}}useEffect(()=>{load();},[]);const cards=stats?[[Boxes,"Menu products",stats.products,"/admin/products"],[ClipboardList,"Total orders",stats.orders,"/admin/orders"],[TrendingUp,"Pending orders",stats.pendingOrders,"/admin/orders"],[DollarSign,"Order value",money(stats.revenue),"/admin/orders"],[MessageSquare,"Contact messages",stats.contacts,"/admin/contacts"]]:[];return <div><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">Workspace</p><h1 className="mt-1 text-3xl font-black">Dashboard overview</h1><p className="mt-2 text-sm text-slate-500">A live snapshot of your Tahas Bite store.</p></div><button onClick={load} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold dark:border-slate-800 dark:bg-slate-950"><RefreshCw size={16}/> Refresh</button></div>{error&&<p className="mt-5 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">{error}</p>}{loading?<p className="py-12 text-center text-slate-500">Loading dashboard…</p>:<div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([Icon,title,value,to])=><Link key={title} to={to} className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-950"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-500">{title}</span><span className="rounded-xl bg-orange-100 p-3 text-orange-700 dark:bg-orange-950 dark:text-orange-300"><Icon size={20}/></span></div><p className="mt-5 text-3xl font-black">{value}</p><p className="mt-3 text-xs font-bold text-brand-600">Manage {title.toLowerCase()} →</p></Link>)}</div>}<div className="mt-7 rounded-3xl bg-slate-950 p-6 text-white sm:p-8"><p className="text-sm font-bold uppercase tracking-[.18em] text-orange-300">Quick actions</p><h2 className="mt-2 text-2xl font-black">Keep the kitchen moving.</h2><div className="mt-5 flex flex-wrap gap-3"><Link to="/admin/products" className="rounded-xl bg-brand-500 px-4 py-3 text-sm font-bold text-white">Manage menu</Link><Link to="/admin/orders" className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white">Review orders</Link><Link to="/admin/contacts" className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white">Open inbox</Link></div></div></div>}



import { useEffect, useState } from "react";
import {
    Boxes,
    ClipboardList,
    DollarSign,
    MessageSquare,
    RefreshCw,
    TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { adminStats } from "../../api.js";

const money = (n) => `Rs. ${Number(n || 0).toLocaleString("en-PK")}`;

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);

        try {
            setStats(await adminStats());
            setError("");
        } catch (e) {
            setError(
                e.response?.data?.message ||
                    "Could not load dashboard data.",
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const cards = stats
        ? [
              [Boxes, "Menu products", stats.products, "/admin/products"],
              [
                  ClipboardList,
                  "Total orders",
                  stats.orders,
                  "/admin/orders",
              ],
              [
                  TrendingUp,
                  "Pending orders",
                  stats.pendingOrders,
                  "/admin/orders",
              ],
              [
                  DollarSign,
                  "Order value",
                  money(stats.revenue),
                  "/admin/orders",
              ],
              [
                  MessageSquare,
                  "Contact messages",
                  stats.contacts,
                  "/admin/contacts",
              ],
          ]
        : [];

    return (
        <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">
                        Workspace
                    </p>

                    <h1 className="mt-1 text-3xl font-black">
                        Dashboard overview
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        A live snapshot of your Tahas Bite store.
                    </p>
                </div>

                <button
                    onClick={load}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold dark:border-slate-800 dark:bg-slate-950"
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {error && (
                <p className="mt-5 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">
                    {error}
                </p>
            )}

            {loading ? (
                <p className="py-12 text-center text-slate-500">
                    Loading dashboard…
                </p>
            ) : (
                <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {cards.map(([Icon, title, value, to]) => (
                        <Link
                            key={title}
                            to={to}
                            className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-950"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-slate-500">
                                    {title}
                                </span>

                                <span className="rounded-xl bg-orange-100 p-3 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                                    <Icon size={20} />
                                </span>
                            </div>

                            <p className="mt-5 text-3xl font-black">
                                {value}
                            </p>

                            <p className="mt-3 text-xs font-bold text-brand-600">
                                Manage {title.toLowerCase()} →
                            </p>
                        </Link>
                    ))}
                </div>
            )}

            <div className="mt-7 rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
                <p className="text-sm font-bold uppercase tracking-[.18em] text-orange-300">
                    Quick actions
                </p>

                <h2 className="mt-2 text-2xl font-black">
                    Keep the kitchen moving.
                </h2>

                <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                        to="/admin/products"
                        className="rounded-xl bg-brand-500 px-4 py-3 text-sm font-bold text-white"
                    >
                        Manage menu
                    </Link>

                    <Link
                        to="/admin/orders"
                        className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white"
                    >
                        Review orders
                    </Link>

                    <Link
                        to="/admin/contacts"
                        className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white"
                    >
                        Open inbox
                    </Link>
                </div>
            </div>
        </div>
    );
}
