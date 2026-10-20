
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  Flame,
  Leaf,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

import { menuItems } from "../data/menu.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="overflow-hidden bg-orange-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-12 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-bold tracking-widest text-orange-700">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              FRESH OFF THE GRILL
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              Your cravings.
              <br />
              Our{" "}
              <span className="text-orange-600">
                kind of magic.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
              Big, bold flavour made fresh. From crave-worthy
              burgers to golden, crispy sides — your next
              favourite bite is right here.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                to="/menu"
                className="inline-flex items-center gap-3 rounded-full bg-orange-600 px-7 py-4 font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-1 hover:bg-orange-700"
              >
                Explore the menu
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-semibold text-gray-800 transition hover:text-orange-600"
              >
                Meet Tahas Bite
                <ArrowDownRight size={17} />
              </Link>
            </div>

            {/* Customer Proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-orange-50 bg-orange-200 text-xl">
                  🍔
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-orange-50 bg-yellow-200 text-xl">
                  🍟
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-orange-50 bg-red-200 text-xl">
                  🥤
                </span>
              </div>

              <div className="flex flex-col">
                <strong className="text-sm text-gray-900">
                  Made for real cravings
                </strong>
                <small className="mt-1 text-xs text-gray-500">
                  Freshly prepared. Always satisfying.
                </small>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto flex aspect-square w-full max-w-lg items-center justify-center"
          >
            <div className="absolute inset-8 rounded-full bg-orange-200" />

            <div className="absolute inset-14 rounded-full border-2 border-dashed border-orange-400/60" />

            <span className="relative z-10 select-none text-[150px] drop-shadow-xl sm:text-[200px]">
              🍔
            </span>

            {/* Top Floating Card */}
            <div className="absolute left-0 top-12 z-20 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl sm:left-2">
              <span className="text-3xl">🔥</span>

              <div>
                <b className="block text-sm text-gray-900">
                  Full-on flavour
                </b>
                <small className="text-xs text-gray-500">
                  Zero boring bites
                </small>
              </div>
            </div>

            {/* Bottom Floating Card */}
            <div className="absolute bottom-12 right-0 z-20 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl sm:right-2">
              <span className="text-3xl text-yellow-500">
                ★
              </span>

              <div>
                <b className="block text-sm text-gray-900">
                  Your new favourite
                </b>
                <small className="text-xs text-gray-500">
                  One bite says it all
                </small>
              </div>
            </div>

            {/* Fresh Stamp */}
            <div className="absolute bottom-3 left-8 z-20 flex h-24 w-24 rotate-12 flex-col items-center justify-center rounded-full border-4 border-white bg-orange-600 text-center text-xs font-bold tracking-wider text-white shadow-lg">
              FRESH
              <b className="text-sm">& TASTY</b>
              <span className="text-lg">✳</span>
            </div>
          </motion.div>
        </div>

        {/* Feature Strip */}
        <div className="bg-orange-600 text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-5 md:justify-between md:px-12">
            <span className="flex items-center gap-2 text-xs font-bold tracking-wider">
              <Flame size={17} />
              BOLD FLAVOURS
            </span>

            <span className="flex items-center gap-2 text-xs font-bold tracking-wider">
              <Leaf size={17} />
              FRESH INGREDIENTS
            </span>

            <span className="flex items-center gap-2 text-xs font-bold tracking-wider">
              <Truck size={17} />
              MADE WHEN YOU ORDER
            </span>

            <span className="text-xs font-bold tracking-wider">
              GOOD FOOD. GOOD MOOD. ✳
            </span>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section
        className="mx-auto max-w-7xl px-6 py-20 md:px-12"
        id="popular"
      >
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold tracking-widest text-orange-600">
              THE CROWD PLEASERS
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-5xl">
              Good bites.{" "}
              <span className="text-orange-600">
                Great nights.
              </span>
            </h2>

            <p className="mt-4 text-gray-600">
              Meet the menu favourites worth coming back for.
            </p>
          </div>

          <Link
            className="inline-flex items-center gap-2 font-semibold text-orange-600 transition hover:text-orange-700"
            to="/menu"
          >
            View full menu
            <ArrowRight size={17} />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {menuItems.slice(0, 3).map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 25,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{ duration: 0.45 }}
            >
              <ProductCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Final Call To Action */}
      <section className="overflow-hidden bg-orange-100">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-12 lg:py-20">
          <div>
            <span className="text-xs font-bold tracking-widest text-orange-700">
              YOUR TABLE IS WAITING
            </span>

            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl">
              Come hungry.
              <br />
              <span className="text-orange-600">
                Leave happy.
              </span>
            </h2>

            <p className="mt-5 max-w-lg leading-7 text-gray-600">
              Find your go-to comfort food and make every
              bite count.
            </p>

            <Link
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gray-900 px-7 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-gray-800"
              to="/menu"
            >
              Find your flavour
              <ArrowRight size={18} />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex min-h-64 items-center justify-center"
          >
            <div className="absolute h-64 w-64 rounded-full bg-orange-200 md:h-80 md:w-80" />

            <span className="relative z-10 text-[150px] drop-shadow-lg md:text-[200px]">
              🍟
            </span>

            <span className="absolute right-8 top-5 text-5xl text-orange-500">
              ✳
            </span>
          </motion.div>
        </div>
      </section>
    </>
  );
}
