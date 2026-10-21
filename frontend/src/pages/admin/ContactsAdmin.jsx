// import { useEffect, useState } from "react";
// import { CheckCheck, Search, Trash2 } from "lucide-react";
// import { adminContacts, deleteContact, updateContactStatus } from "../../api.js";
// const date=d=>d?new Date(d).toLocaleString("en-PK",{dateStyle:"medium",timeStyle:"short"}):"—";
// export default function ContactsAdmin(){const [rows,setRows]=useState([]);const [q,setQ]=useState("");const [status,setStatus]=useState("all");const [error,setError]=useState("");const [notice,setNotice]=useState("");async function load(){try{setRows(await adminContacts({q,status:status==="all"?"":status}));setError("");}catch(e){setError(e.response?.data?.message||"Could not load messages.");}}useEffect(()=>{const t=setTimeout(load,180);return()=>clearTimeout(t);},[q,status]);async function change(row,next){try{await updateContactStatus(row._id,next);setNotice("Message status updated.");await load();}catch(e){setError(e.response?.data?.message||"Could not update message.");}}async function remove(row){if(!window.confirm(`Delete message from ${row.name}?`))return;try{await deleteContact(row._id);setNotice("Message deleted.");await load();}catch(e){setError(e.response?.data?.message||"Could not delete message.");}}return <div><div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">Customer care</p><h1 className="mt-1 text-3xl font-black">Contact inbox</h1><p className="mt-2 text-sm text-slate-500">Review enquiries, search message content and track follow-up status.</p></div><div className="mt-6 grid gap-3 sm:grid-cols-[1fr_190px]"><label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-950"><Search size={18} className="text-slate-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name, email, subject or message…" className="w-full bg-transparent py-3 outline-none"/></label><select value={status} onChange={e=>setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-950"><option value="all">All messages</option><option value="new">New</option><option value="read">Read</option><option value="resolved">Resolved</option></select></div>{notice&&<p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">{notice}</p>}{error&&<p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">{error}</p>}<div className="mt-5 grid gap-4">{rows.map(row=><article key={row._id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-black">{row.subject||"General enquiry"}</h2><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${row.status==="new"?"bg-orange-100 text-orange-800":row.status==="resolved"?"bg-emerald-100 text-emerald-800":"bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>{row.status}</span></div><p className="mt-2 text-sm font-semibold">{row.name} <span className="font-normal text-slate-500">· {row.email}</span></p><p className="mt-1 text-xs text-slate-500">Received {date(row.createdAt)}</p></div><button onClick={()=>remove(row)} title="Delete message" className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950"><Trash2 size={16}/></button></div><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-300">{row.message}</p><div className="mt-4 flex flex-wrap gap-2"><button onClick={()=>change(row,"read")} disabled={row.status==="read"} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold disabled:opacity-40 dark:border-slate-700">Mark as read</button><button onClick={()=>change(row,"resolved")} disabled={row.status==="resolved"} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-40"><CheckCheck size={14}/> Resolve</button><a href={`mailto:${encodeURIComponent(row.email)}?subject=${encodeURIComponent(`Re: ${row.subject||"Your message to Tahas Bite"}`)}`} className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-bold text-white dark:bg-white dark:text-slate-950">Reply by email</a></div></article>)}{!rows.length&&<div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-500 dark:border-slate-700">No messages match these filters.</div>}</div></div>}



import { useEffect, useState } from "react";
import { CheckCheck, Search, Trash2 } from "lucide-react";
import {
    adminContacts,
    deleteContact,
    updateContactStatus,
} from "../../api.js";

const date = (d) =>
    d
        ? new Date(d).toLocaleString("en-PK", {
              dateStyle: "medium",
              timeStyle: "short",
          })
        : "—";

export default function ContactsAdmin() {
    const [rows, setRows] = useState([]);
    const [q, setQ] = useState("");
    const [status, setStatus] = useState("all");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    async function load() {
        try {
            setRows(
                await adminContacts({
                    q,
                    status: status === "all" ? "" : status,
                }),
            );
            setError("");
        } catch (e) {
            setError(
                e.response?.data?.message || "Could not load messages.",
            );
        }
    }

    useEffect(() => {
        const t = setTimeout(load, 180);
        return () => clearTimeout(t);
    }, [q, status]);

    async function change(row, next) {
        try {
            await updateContactStatus(row._id, next);
            setNotice("Message status updated.");
            await load();
        } catch (e) {
            setError(
                e.response?.data?.message || "Could not update message.",
            );
        }
    }

    async function remove(row) {
        if (!window.confirm(`Delete message from ${row.name}?`)) return;

        try {
            await deleteContact(row._id);
            setNotice("Message deleted.");
            await load();
        } catch (e) {
            setError(
                e.response?.data?.message || "Could not delete message.",
            );
        }
    }

    return (
        <div>
            <div>
                <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-600">
                    Customer care
                </p>

                <h1 className="mt-1 text-3xl font-black">
                    Contact inbox
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Review enquiries, search message content and track
                    follow-up status.
                </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_190px]">
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-950">
                    <Search size={18} className="text-slate-400" />

                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search name, email, subject or message…"
                        className="w-full bg-transparent py-3 outline-none"
                    />
                </label>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-950"
                >
                    <option value="all">All messages</option>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>

            {notice && (
                <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                    {notice}
                </p>
            )}

            {error && (
                <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">
                    {error}
                </p>
            )}

            <div className="mt-5 grid gap-4">
                {rows.map((row) => (
                    <article
                        key={row._id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-lg font-black">
                                        {row.subject || "General enquiry"}
                                    </h2>

                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                                            row.status === "new"
                                                ? "bg-orange-100 text-orange-800"
                                                : row.status === "resolved"
                                                  ? "bg-emerald-100 text-emerald-800"
                                                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                        }`}
                                    >
                                        {row.status}
                                    </span>
                                </div>

                                <p className="mt-2 text-sm font-semibold">
                                    {row.name}{" "}
                                    <span className="font-normal text-slate-500">
                                        · {row.email}
                                    </span>
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Received {date(row.createdAt)}
                                </p>
                            </div>

                            <button
                                onClick={() => remove(row)}
                                title="Delete message"
                                className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-300">
                            {row.message}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <button
                                onClick={() => change(row, "read")}
                                disabled={row.status === "read"}
                                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold disabled:opacity-40 dark:border-slate-700"
                            >
                                Mark as read
                            </button>

                            <button
                                onClick={() => change(row, "resolved")}
                                disabled={row.status === "resolved"}
                                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-40"
                            >
                                <CheckCheck size={14} />
                                Resolve
                            </button>

                            <a
                                href={`mailto:${encodeURIComponent(row.email)}?subject=${encodeURIComponent(
                                    `Re: ${row.subject || "Your message to Tahas Bite"}`,
                                )}`}
                                className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-bold text-white dark:bg-white dark:text-slate-950"
                            >
                                Reply by email
                            </a>
                        </div>
                    </article>
                ))}

                {!rows.length && (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-500 dark:border-slate-700">
                        No messages match these filters.
                    </div>
                )}
            </div>
        </div>
    );
}
