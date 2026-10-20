
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-orange-50 px-6 py-16">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        {/* Illustration */}
        <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-orange-100">
          <div className="absolute inset-4 rounded-full border-2 border-dashed border-orange-300" />

          <span className="relative text-8xl drop-shadow-lg">
            🍔
          </span>

          <span className="absolute -right-2 top-5 flex h-12 w-12 rotate-12 items-center justify-center rounded-2xl bg-orange-600 text-2xl text-white shadow-lg">
            ?
          </span>
        </div>

        {/* Message */}
        <span className="mt-8 text-xs font-bold tracking-[0.25em] text-orange-600">
          404 — PAGE NOT FOUND
        </span>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Oops, wrong bite.
        </h1>

        <p className="mt-4 max-w-sm text-base leading-7 text-gray-600">
          We couldn't find that page. It may have moved
          or the link might be incorrect.
        </p>

        {/* Back Home */}
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-orange-600 px-7 py-4 font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-1 hover:bg-orange-700"
        >
          <Home size={19} />
          Back home
          <ArrowLeft size={18} />
        </Link>

        <Link
          to="/menu"
          className="mt-5 font-semibold text-gray-600 transition hover:text-orange-600"
        >
          Or explore our menu
        </Link>
      </div>
    </section>
  );
}
