import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Boxes, ClipboardList, LayoutDashboard, LogOut, MessageSquare, Store } from "lucide-react";
import { adminTokenKey } from "../api.js";
const links = [
  ["/admin", "Overview", LayoutDashboard],
  ["/admin/products", "Products", Boxes],
  ["/admin/orders", "Orders", ClipboardList],
  ["/admin/contacts", "Messages", MessageSquare],
];
export default function AdminShell() {
  const navigate = useNavigate();
  function logout() { localStorage.removeItem(adminTokenKey); navigate("/admin/login", { replace: true }); }
  return <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[230px_1fr]">
    <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-950 lg:sticky lg:top-24">
      <div className="mb-5 flex items-center gap-3 px-2 py-3"><span className="rounded-xl bg-brand-500 p-2 text-white"><Store size={20}/></span><div><p className="font-black">Tahas Bite</p><p className="text-xs text-slate-500">Admin workspace</p></div></div>
      <nav className="grid gap-1">{links.map(([to, label, Icon]) => <NavLink end={to === "/admin"} key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive ? "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"}`}><Icon size={18}/>{label}</NavLink>)}</nav>
      <button onClick={logout} className="mt-5 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"><LogOut size={18}/> Sign out</button>
    </aside>
    <section className="min-w-0"><Outlet/></section>
  </div>;
}
