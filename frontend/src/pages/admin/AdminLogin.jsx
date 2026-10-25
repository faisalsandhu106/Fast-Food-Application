import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Utensils } from "lucide-react";

import { adminLogin, adminTokenKey } from "../../api.js";
import { motion } from "framer-motion";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();

        setBusy(true);
        setError("");

        try {
            const result = await adminLogin({
                email,
                password,
            });

            if (!result?.token) {
                throw new Error("The server did not return an authentication token.");
            }

            localStorage.setItem(adminTokenKey, result.token);

            navigate("/admin", { replace: true });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to sign in. Check your credentials and backend connection."
            );
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center gap-10 py-8 lg:gap-16">
            {/* Side content */}
            <div className="hidden max-w-md flex-1 lg:block">
                <div className="mb-6 inline-flex rounded-2xl bg-brand-500 p-4 text-white">
                    <Utensils size={36} />
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-600">
                    Tahas Bite
                </p>

                <h1 className="mt-4 text-4xl font-black leading-tight xl:text-5xl">
                    Your restaurant.
                    <span className="block text-brand-500">
                        Your control.
                    </span>
                </h1>

                <p className="mt-5 leading-7 text-slate-500 dark:text-slate-400">
                    Welcome to your admin workspace. Manage your menu,
                    track customer orders, and keep your restaurant
                    running smoothly from one place.
                </p>

                <div className="mt-8 space-y-4">
                    {[
                        "Manage products and menu prices",
                        "View and update customer orders",
                        "Manage customer messages",
                    ].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                ✓
                            </span>

                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Your existing form — keep it unchanged */}
            <motion.form
                initial={{x: 10 }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={submit}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-9 shadow-lg dark:border-slate-800 dark:bg-slate-950"
            >
                <span className="inline-flex rounded-2xl bg-brand-500 p-3 text-white">
                    <Utensils size={24} />
                </span>

                <h1 className="mt-5 text-3xl font-black">
                    Admin sign in
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Sign in to manage products, orders and messages.
                </p>

                <label className="mt-6 block text-sm font-bold">
                    Admin email <span className="text-red-500">*</span>
                    <input
                        required
                        type="email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                        className="mt-2 w-full lowercase rounded-xl border border-slate-300 bg-transparent px-3 py-3 font-normal outline-none focus:border-brand-500 dark:border-slate-700"
                    />
                </label>

                <label className="mt-4 block text-sm font-bold">
                    Password <span className="text-red-500">*</span>

                    <input
                        required
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 font-normal outline-none focus:border-brand-500 dark:border-slate-700 placeholder:lowercase"
                    />
                </label>

                {error && (
                    <p
                        role="alert"
                        className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200"
                    >
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={busy}
                    className="mt-6 w-full rounded-xl bg-brand-500 px-4 py-3 font-bold text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <LockKeyhole
                        size={17}
                        className="mr-2 inline"
                    />

                    {busy ? "Signing in…" : "Sign in securely"}
                </button>

                <p className="mt-4 text-xs leading-5 text-slate-500">
                    Credentials are configured privately in the backend
                    .env file.
                </p>
            </motion.form>
        </div>
    );
}