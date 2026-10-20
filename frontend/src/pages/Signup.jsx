
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, UserRound } from "lucide-react";

import { useApp } from "../context/AppContext.jsx";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = useApp();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Please enter a name with at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Your password must contain at least 6 characters.");
      return;
    }

    // Demo authentication through the application context.
    dispatch({
      type: "LOGIN",
      payload: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
      },
    });

    navigate("/menu");
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-orange-50 px-6 py-14">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-7 shadow-xl shadow-orange-100/50 sm:p-10">
        {/* Signup Header */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
          <UserRound size={27} />
        </div>

        <span className="text-xs font-bold tracking-[0.2em] text-orange-600">
          JOIN THE TABLE
        </span>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
          Good food starts{" "}
          <span className="text-orange-600">here.</span>
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Create an account and find your new favourite.
        </p>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label
              htmlFor="signup-name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Your name
            </label>

            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              minLength={2}
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="signup-email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email address
            </label>

            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="signup-password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
              minLength={6}
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-orange-600 px-6 py-4 font-bold text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-700 active:translate-y-0"
          >
            Create account
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Demo Disclaimer */}
        <div className="mt-6 rounded-xl bg-orange-50 p-4 text-xs leading-5 text-gray-600">
          <strong className="text-gray-800">Demo mode:</strong>{" "}
          This form updates your application context only.
          It does not securely register an account or verify
          credentials with a server.
        </div>

        {/* Sign In Link */}
        <p className="mt-7 text-center text-sm text-gray-600">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-bold text-orange-600 transition hover:text-orange-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
